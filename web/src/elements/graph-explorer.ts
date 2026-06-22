import { observe } from "../loader";

observe({
  canvasId: "graph-explorer",
  init: (wasm) => wasm.init_graph_explorer,
  args: [/* serialized graph */],
});
