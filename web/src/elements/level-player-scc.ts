import { observe } from "../loader";

observe({
  canvasId: "player-scc",
  init: (wasm) => wasm.init_player_scc,
  args: [/* level data */],
});
