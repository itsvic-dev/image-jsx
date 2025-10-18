import { Canvas } from "skia-canvas";
import type { DirectRenderer, JSXChild } from "./types.js";

/**
 * Renders a JSX child to an existing Canvas.
 *
 * @param canvas the canvas to render to
 * @param root the JSX child to render
 */
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

/**
 * Renders a JSX child to a new canvas of provided proportions, and returns the new canvas.
 *
 * @param width the width of the canvas
 * @param height the height of the canvas
 * @param root the JSX child to render
 */
export function render(width: number, height: number, root: JSXChild): Canvas {
  const canvas = new Canvas(width, height);
  renderToCanvas(canvas, root);
  return canvas;
}

/**
 * Renders a JSX child to a new canvas of provided proportions, and saves the rendered result to a file.
 *
 * @param width the width of the canvas
 * @param height the height of the canvas
 * @param filename target file to save render results to
 * @param root the JSX child to render
 */
export function renderToFile(
  width: number,
  height: number,
  filename: string,
  root: JSXChild
) {
  const canvas = render(width, height, root);
  canvas.toFile(filename);
}
