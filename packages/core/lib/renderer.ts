import { Canvas } from "skia-canvas";
import type { DirectRenderer, JSXChild } from "./types.js";

// renders
export function renderToCanvas(canvas: Canvas, root: JSXChild) {
  if (!(root !== null && typeof root === "object" && "render" in root)) {
    throw Error(
      `expected root to be a DirectRenderer, got ${typeof root} instead`
    );
  }

  const renderer = root as DirectRenderer;
  const context = canvas.getContext("2d");

  // fill the background
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  renderer.render(context);
}

export function render(width: number, height: number, root: JSXChild): Canvas {
  const canvas = new Canvas(width, height);
  renderToCanvas(canvas, root);
  return canvas;
}

export function renderToFile(
  width: number,
  height: number,
  filename: string,
  root: JSXChild
) {
  const canvas = render(width, height, root);
  canvas.toFile(filename);
}
