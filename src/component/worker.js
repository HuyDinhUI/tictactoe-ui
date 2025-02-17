// worker.js (dùng cho Webpack hoặc Vite)
export default function createWorker() {
    return new Worker(new URL('./MCTS', import.meta.url), { type: 'module' });
  }
  