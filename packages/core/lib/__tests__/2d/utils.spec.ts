import { describe, it, expect } from "vitest";
import type { BoundingBox, DirectRenderer, JSXChildren } from "../../types.js";
import type { CanvasRenderingContext2D } from "skia-canvas";
import { childrenOnlyDirectRenderers } from "../../2d/utils.js";

class TestRenderer implements DirectRenderer {
  get pos(): { x: number; y: number } {
    throw new Error("Method not implemented.");
  }
  set pos(pos: { x: number; y: number }) {
    throw new Error("Method not implemented.");
  }
  render(context: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
  getBoundingBox(context: CanvasRenderingContext2D): BoundingBox {
    throw new Error("Method not implemented.");
  }
}

describe("2D Utilities", () => {
  it("returns DirectRenderer children", () => {
    const children: JSXChildren = new TestRenderer();

    expect(childrenOnlyDirectRenderers(children)).toStrictEqual([children]);
  });

  it("throws when child is not a DirectRenderer", () => {
    expect(() => childrenOnlyDirectRenderers("fail")).toThrow();
  });

  it("throws when one or more children are not DirectRenderers", () => {
    expect(() =>
      childrenOnlyDirectRenderers([new TestRenderer(), "fail"])
    ).toThrow();
  });
});
