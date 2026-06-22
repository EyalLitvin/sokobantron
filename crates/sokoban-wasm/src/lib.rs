use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn init_arena_builder(_canvas_id: &str) {}

#[wasm_bindgen]
pub fn init_player_graph(_canvas_id: &str, _level: &str) {}

#[wasm_bindgen]
pub fn init_player_scc(_canvas_id: &str, _level: &str) {}

#[wasm_bindgen]
pub fn init_example_states(_canvas_id: &str, _states: &str) {}

#[wasm_bindgen]
pub fn init_graph_explorer(_canvas_id: &str, _graph: &str) {}
