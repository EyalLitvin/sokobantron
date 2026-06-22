import { observe } from "../loader";

observe({
  canvasId: "arena-builder",
  init: (wasm) => wasm.init_arena_builder,
});
