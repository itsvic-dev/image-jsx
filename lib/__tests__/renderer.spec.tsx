import { describe, expect, it, vi } from "vitest";
import type { DirectRenderer } from "../types.js";
import { Canvas, type CanvasRenderingContext2D } from "skia-canvas";
import { render, renderToFile } from "../renderer.js";

class ExampleRenderer implements DirectRenderer {
  get pos(): { x: number; y: number } {
    throw new Error("Method not implemented.");
  }
  set pos(pos: { x: number; y: number }) {
    throw new Error("Method not implemented.");
  }
  render(context: CanvasRenderingContext2D): void {
    context.fillStyle = "red";
    context.fillRect(0, 0, 256, 256);
  }
  getBoundingBox(context: CanvasRenderingContext2D): {
    width: number;
    height: number;
  } {
    throw new Error("Method not implemented.");
  }
}

describe("Renderer", () => {
  it("renders DirectRenderer correctly", () => {
    const canvas = render(256, 256, new ExampleRenderer());
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });

  it("rejects all other types", () => {
    expect(() => render(256, 256, "fail")).toThrowError();
  });

  it("outputs a file correctly", () => {
    const spy = vi.spyOn(Canvas.prototype, "toFile");
    spy.mockImplementation(async () => {}); // replace this with a stub function so we don't actually make a file

    renderToFile(256, 256, "test.png", new ExampleRenderer());
    expect(spy).toHaveBeenCalledOnce();
  });
});
