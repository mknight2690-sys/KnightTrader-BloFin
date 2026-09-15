const fs = require('fs');
const { execSync } = require('child_process');

// Run git status from repo root
const repoRoot = 'C:\\Users\\mknig\\blofin-trading-engine';

// Add only KnightTrader directory changes
try {
    execSync('git add KnightTrader/', { cwd: repoRoot, encoding: 'utf8', stdio: 'inherit' });
    console.log('Added KnightTrader/');
} catch (e) {
    console.log('Git add failed:', e.message);
}

// Show what would be committed
try {
    const status = execSync('git status --short KnightTrader/', { cwd: repoRoot, encoding: 'utf8' });
    console.log('Staged changes in KnightTrader:');
    console.log(status);
} catch (e) {
    console.log('Status check failed');
}

// Commit
try {
    execSync('git commit -m "feat: v1.1.22 - KnightTrader Blofin + 6 System Trading System integration"', { cwd: repoRoot, encoding: 'utf8', stdio: 'inherit' });
    console.log('Committed');
} catch (e) {
    console.log('Commit failed:', e.message);
}

// Push
try {
    execSync('git push origin master', { cwd: repoRoot, encoding: 'utf8', stdio: 'inherit' });
    console.log('Pushed to GitHub');
} catch (e) {
    console.log('Push failed:', e.message);
}
