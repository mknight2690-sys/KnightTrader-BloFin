'use strict';

const { parentPort, workerData } = require('worker_threads');
const { writeCountryConfig } = require('./proton-auto');

writeCountryConfig(workerData)
  .then((result) => {
    parentPort.postMessage({ ok: true, result });
  })
  .catch((err) => {
    parentPort.postMessage({ ok: false, error: err && err.message ? err.message : String(err) });
  });
