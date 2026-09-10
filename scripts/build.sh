#!/usr/bin/env bash
# Build the Cambridge Pseudocode IDE for static hosting.
#   1. regenerate web/examples.js from examples/
#   2. compile the Rust interpreter to WebAssembly into web/pkg/
set -euo pipefail

echo "▶ generating examples module"
node scripts/gen-examples.mjs

echo "▶ installing Rust toolchain"
export RUSTUP_HOME="${RUSTUP_HOME:-$PWD/.rust/rustup}"
export CARGO_HOME="${CARGO_HOME:-$PWD/.rust/cargo}"
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \
  | sh -s -- -y --profile minimal --default-toolchain stable --target wasm32-unknown-unknown >/dev/null
export PATH="$CARGO_HOME/bin:$PATH"
rustc --version

echo "▶ installing wasm-pack"
WP_VER="v0.13.1"
WP_DIR="wasm-pack-${WP_VER}-x86_64-unknown-linux-musl"
curl -sSL "https://github.com/rustwasm/wasm-pack/releases/download/${WP_VER}/${WP_DIR}.tar.gz" -o /tmp/wp.tar.gz
tar xzf /tmp/wp.tar.gz -C /tmp
export PATH="/tmp/${WP_DIR}:$PATH"
wasm-pack --version

echo "▶ compiling interpreter to WebAssembly"
# getrandom >=0.3 needs an explicit backend on wasm32-unknown-unknown
export RUSTFLAGS='--cfg getrandom_backend="wasm_js"'
wasm-pack build --target web --out-dir web/pkg --release --no-typescript

echo "▶ build complete"
ls -la web/pkg
