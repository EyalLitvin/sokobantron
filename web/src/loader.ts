// Lazy-loads the WASM module and initializes a Bevy element when its canvas
// scrolls into view. Tears down the app when it scrolls out.

type InitFn = (canvasId: string, ...args: string[]) => void;

interface ElementConfig {
  canvasId: string;
  init: (wasm: typeof import("../pkg/sokoban_wasm")) => InitFn;
  args?: string[];
}

async function loadWasm() {
  const wasm = await import("../pkg/sokoban_wasm");
  await wasm.default();
  return wasm;
}

let wasmPromise: ReturnType<typeof loadWasm> | null = null;

function getWasm() {
  if (!wasmPromise) wasmPromise = loadWasm();
  return wasmPromise;
}

export function observe(config: ElementConfig) {
  const canvas = document.getElementById(config.canvasId) as HTMLCanvasElement;
  if (!canvas) return;

  const observer = new IntersectionObserver(
    async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const wasm = await getWasm();
          config.init(wasm)(config.canvasId, ...(config.args ?? []));
        }
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(canvas);
}
