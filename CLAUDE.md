This project has a couple of goals:
1. implement an algorithm for finding good sokoban puzzles
2. creating interactive web elements based on this work to put in an article I am writing about this.

you are not supposed to
1. invent the algorithm yourself
2. add any features you weren't asked to add

the remaining tasks are
1. write the code for the entire thing
2. help me with integrating the results into my website

several tips:
1. you should consult user for any ambiguity, using AskUserQuestion
2. try to compartmentalise, create abstractions and good code models for everything
3. write clean, idiomatic rust code for everything
4. avoid verbose and useless comments, try to make the code document itself

---

## Project Structure

Rust workspace with 5 crates under `crates/`, plus a local dev harness in `web/`.

```
sokobantron/
├── Cargo.toml              # workspace manifest
├── crates/
│   ├── sokoban-core/       # types & game logic (lib) — no algorithm, no rendering
│   ├── sokoban-solver/     # puzzle-finding algorithm (lib)
│   ├── sokoban-cli/        # CLI binary for dev/benchmarking
│   ├── sokoban-bevy/       # Bevy plugins for all rendering & interaction (lib)
│   └── sokoban-wasm/       # WASM entry point, cdylib, one init fn per element
└── web/                    # local dev harness only (bun + vite + ts)
```

Dependency order: `sokoban-core` → `sokoban-solver` → `sokoban-bevy` → `sokoban-wasm`

## Interactive Elements

Six embeddable elements, each exposed as a `#[wasm_bindgen]` init function in `sokoban-wasm`:

| Element | Init fn | sokoban-bevy plugins used |
|---|---|---|
| Arena builder + algorithm runner + player | `init_arena_builder` | board, arena-builder, algorithm-runner |
| Level player + config graph | `init_player_graph` | board, config-graph |
| Level player + SCC graph | `init_player_scc` | board, config-graph, scc-graph |
| Arena builder (advanced, with params) | variant of `init_arena_builder` | same + param controls |
| Example states | `init_example_states` | board |
| Graph explorer | `init_graph_explorer` | config-graph |

## Key Decisions

- **Bevy for rendering**: all interactive elements are Bevy apps compiled to WASM. Elements are lazy-loaded via `IntersectionObserver` in the TypeScript harness — only one active at a time, so Bevy's per-instance overhead is not a problem.
- **One WASM binary**: all elements share one `sokoban-wasm` cdylib. Bevy engine is loaded and cached once. TypeScript calls the appropriate init function per element.
- **External website**: the article's website is a separate project. This repo only produces the WASM artifact and TypeScript loader patterns. `web/` is a local dev harness, not the final site.
- **sokoban-bevy is lib-only**: all Bevy plugin code lives in `sokoban-bevy` (usable/testable natively); `sokoban-wasm` is a thin wiring layer.

## Build Commands

```bash
cargo build                                          # build all crates
cargo run -p sokoban-cli                             # run CLI
wasm-pack build crates/sokoban-wasm --target web     # build WASM
cd web && bun install && bun dev                     # local dev server
```
