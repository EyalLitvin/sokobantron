import { observe } from "../loader";

observe({
  canvasId: "player-graph",
  init: (wasm) => wasm.init_player_graph,
  args: [/* level data */],
});
