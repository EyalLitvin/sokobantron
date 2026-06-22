import { observe } from "../loader";

observe({
  canvasId: "example-states",
  init: (wasm) => wasm.init_example_states,
  args: [/* serialized states */],
});
