// Renders one route in its own thread for scripts/prerender.js.
import { parentPort, workerData } from 'node:worker_threads';

const { render } = await import(workerData.entry);
parentPort.postMessage(await render(workerData.url, workerData.data));
