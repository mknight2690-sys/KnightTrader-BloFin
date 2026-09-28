// Hermes agent chat tab — streams from dashboard session chat API.

const CHAT_SESSION_KEY = 'kt-chat-session-id';

const chatEl = {
  status: document.getElementById('chat-status'),
  liveDot: document.getElementById('chat-live-dot'),
  messages: document.getElementById('chat-messages'),
  empty: document.getElementById('chat-empty'),
  toolBanner: document.getElementById('chat-tool-banner'),
  input: document.getElementById('chat-input'),
  send: document.getElementById('btn-chat-send'),
  newChat: document.getElementById('btn-chat-new'),
  openHermes: document.getElementById('btn-chat-open-hermes'),
};

let chatSessionId = null;
let chatBusy = false;
let chatInitPromise = null;
let chatRequestId = 0;
let chatAssistantNode = null;
let chatAssistantText = '';

function setChatStatus(text, state = '') {
  if (!chatEl.status) return;
  chatEl.status.textContent = text;
  if (chatEl.liveDot) {
    chatEl.liveDot.classList.toggle('offline', state === 'error' || state === 'pending');
  }
}

function normalizeMessageContent(content) {
  if (content == null) return '';
  if (typeof content === 'string') return content.trim();
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') return part;
        if (part && typeof part.text === 'string') return part.text;
        if (part && typeof part.content === 'string') return part.content;
        return '';
      })
      .filter(Boolean)
      .join('\n')
      .trim();
  }
  if (typeof content === 'object' && typeof content.text === 'string') return content.text.trim();
  return String(content).trim();
}

function renderChatMessages(messages = []) {
  if (!chatEl.messages) return;
  chatEl.messages.innerHTML = '';
  for (const msg of messages) {
    appendChatBubble(msg.role || msg.type || 'assistant', normalizeMessageContent(msg.content || msg.text || msg.message));
  }
  syncChatEmptyState();
  scrollChatToBottom();
}

function appendChatBubble(role, text) {
  if (!chatEl.messages || !text) return null;
  const normalizedRole = String(role || '').toLowerCase();
  const isUser = normalizedRole === 'user' || normalizedRole === 'human';
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-assistant'}`;
  bubble.textContent = text;
  chatEl.messages.appendChild(bubble);
  syncChatEmptyState();
  return bubble;
}

function syncChatEmptyState() {
  if (!chatEl.empty || !chatEl.messages) return;
  const hasMessages = chatEl.messages.childElementCount > 0;
  chatEl.empty.classList.toggle('hidden', hasMessages);
}

function scrollChatToBottom() {
  if (!chatEl.messages) return;
  chatEl.messages.scrollTop = chatEl.messages.scrollHeight;
}

function setChatBusy(busy) {
  chatBusy = !!busy;
  if (chatEl.send) chatEl.send.disabled = busy;
  if (chatEl.input) chatEl.input.disabled = busy;
  if (chatEl.newChat) chatEl.newChat.disabled = busy;
}

function showToolBanner(text) {
  if (!chatEl.toolBanner) return;
  if (!text) {
    chatEl.toolBanner.classList.add('hidden');
    chatEl.toolBanner.textContent = '';
    return;
  }
  chatEl.toolBanner.textContent = text;
  chatEl.toolBanner.classList.remove('hidden');
}

async function loadStoredChatSession() {
  try {
    chatSessionId = localStorage.getItem(CHAT_SESSION_KEY) || null;
  } catch {
    chatSessionId = null;
  }
  if (!chatSessionId) return false;
  const res = await window.kt.hermesChatGetMessages(chatSessionId);
  if (!res?.ok) {
    chatSessionId = null;
    try { localStorage.removeItem(CHAT_SESSION_KEY); } catch (_) {}
    return false;
  }
  renderChatMessages(res.messages || []);
  return true;
}

async function createChatSession() {
  const res = await window.kt.hermesChatCreateSession('KnightTrader Chat');
  if (!res?.ok || !res.sessionId) {
    throw new Error(res?.error || 'Could not create a Hermes chat session.');
  }
  chatSessionId = res.sessionId;
  try { localStorage.setItem(CHAT_SESSION_KEY, chatSessionId); } catch (_) {}
  if (chatEl.messages) chatEl.messages.innerHTML = '';
  syncChatEmptyState();
  return res;
}

async function ensureChatReady(forceNew = false) {
  setChatStatus('Connecting to Hermes…', 'pending');
  const ready = await window.kt.hermesChatEnsure();
  if (!ready?.ok) {
    setChatStatus(ready?.error || 'Hermes is not ready', 'error');
    throw new Error(ready?.error || 'Hermes is not ready');
  }
  if (forceNew) {
    await createChatSession();
    setChatStatus('Connected — new chat', 'ok');
    return;
  }
  const restored = await loadStoredChatSession();
  if (!restored) {
    await createChatSession();
  }
  setChatStatus('Connected to Hermes agent', 'ok');
}

function handleHermesChatEvent(data) {
  if (!data || data.requestId !== chatRequestId) return;
  const eventName = String(data.eventName || '');
  const payload = data.payload || {};

  if (eventName === 'assistant.delta') {
    const delta = payload.delta || payload.text || payload.content || '';
    if (!delta) return;
    if (!chatAssistantNode) {
      chatAssistantText = '';
      chatAssistantNode = appendChatBubble('assistant', '');
    }
    chatAssistantText += delta;
    chatAssistantNode.textContent = chatAssistantText;
    scrollChatToBottom();
    return;
  }

  if (eventName === 'tool.started') {
    const tool = payload.tool || payload.tool_name || payload.name || 'tool';
    showToolBanner(`Running ${tool}…`);
    return;
  }

  if (eventName === 'tool.completed' || eventName === 'tool.failed') {
    showToolBanner('');
    return;
  }

  if (eventName === 'run.failed' || eventName === 'run.cancelled') {
    showToolBanner('');
    const err = payload.error || payload.message || payload.detail || 'Hermes run failed';
    appendChatBubble('assistant', `⚠ ${String(err)}`);
    setChatBusy(false);
    chatAssistantNode = null;
    chatAssistantText = '';
    return;
  }

  if (eventName === 'run.completed') {
    showToolBanner('');
    setChatBusy(false);
    chatAssistantNode = null;
    chatAssistantText = '';
  }
}

async function sendChatMessage() {
  if (!chatEl.input || chatBusy) return;
  const text = String(chatEl.input.value || '').trim();
  if (!text) return;

  try {
    if (!chatSessionId) await ensureChatReady(false);
    appendChatBubble('user', text);
    chatEl.input.value = '';
    setChatBusy(true);
    chatAssistantNode = null;
    chatAssistantText = '';
    showToolBanner('Thinking…');

    chatRequestId = Date.now();
    const res = await window.kt.hermesChatSend({
      sessionId: chatSessionId,
      text,
      requestId: chatRequestId,
    });
    showToolBanner('');
    if (!res?.ok) {
      appendChatBubble('assistant', `⚠ ${res.error || 'Message failed'}`);
    }
  } catch (err) {
    showToolBanner('');
    appendChatBubble('assistant', `⚠ ${err.message || 'Message failed'}`);
  } finally {
    setChatBusy(false);
    chatAssistantNode = null;
    chatAssistantText = '';
    scrollChatToBottom();
  }
}

function bindChatUi() {
  if (!chatEl.send || chatEl.send.dataset.bound === '1') return;
  chatEl.send.dataset.bound = '1';

  chatEl.send.addEventListener('click', () => { sendChatMessage().catch(() => {}); });

  if (chatEl.input) {
    chatEl.input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendChatMessage().catch(() => {});
      }
    });
  }

  if (chatEl.newChat) {
    chatEl.newChat.addEventListener('click', async () => {
      try {
        setChatBusy(true);
        await window.kt.hermesChatCancel();
        await ensureChatReady(true);
      } catch (err) {
        setChatStatus(err.message || 'Could not start a new chat', 'error');
      } finally {
        setChatBusy(false);
      }
    });
  }

  if (chatEl.openHermes) {
    chatEl.openHermes.addEventListener('click', async () => {
      try {
        const status = await window.kt.getDashboardStatus();
        const base = status?.url || 'http://127.0.0.1:9119';
        const url = chatSessionId ? `${base}/chat?resume=${encodeURIComponent(chatSessionId)}` : `${base}/chat`;
        await window.kt.openExternal(url);
      } catch (_) {}
    });
  }

  if (window.kt?.onHermesChatEvent) {
    window.kt.onHermesChatEvent(handleHermesChatEvent);
  }
}

async function initChatTab(force = false) {
  bindChatUi();
  if (chatInitPromise && !force) return chatInitPromise;
  chatInitPromise = ensureChatReady(false).catch((err) => {
    setChatStatus(err.message || 'Hermes chat unavailable', 'error');
  });
  return chatInitPromise;
}

window.initChatTab = initChatTab;
