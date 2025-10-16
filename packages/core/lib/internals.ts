import type { CanvasGradient, CanvasRenderingContext2D } from "skia-canvas";
import type {
  Position,
  BoundingBox,
  Style,
  GradientDirection,
} from "./types.js";

type CanvasStyle = string | CanvasGradient;

export function resolveStyle(
  ctx: CanvasRenderingContext2D,
  style: Style,
  pos: Position,
  bbox: BoundingBox
): CanvasStyle {
  if (typeof style === "string") return style;

  if ("gradient" in style && style.gradient === "linear") {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    switch (style.direction) {
      case "to bottom":
        startX = pos.x;
        startY = pos.y;
        endX = pos.x;
        endY = pos.y + bbox.height;
        break;

      case "to top":
        startX = pos.x;
        startY = pos.y + bbox.height;
        endX = pos.x;
        endY = pos.y;
        break;

      case undefined:
        if (style.positions === undefined) {
          throw new Error(
            "linear gradients must have a direction or start/end points"
          );
        }
    }

    const gradient = ctx.createLinearGradient(
      style.positions?.start.x ?? pos.x,
      style.positions?.start.y ?? pos.y,
      style.positions?.end.x ?? endX,
      style.positions?.end.y ?? endY
    );
    for (const stop of style.stops) {
      gradient.addColorStop(stop.at, stop.color);
    }

    return gradient;
  }

  throw new Error(`unknown style passed: ${style}`);
}

// helper function to create linear gradients in the expected format
export function linearGradient(
  stops: string[],
  direction: GradientDirection
): Style {
  return {
    gradient: "linear",
    direction,
    stops: stops.map((color, i) => ({
      at: i / (stops.length - 1),
      color,
    })),
  } satisfies Style;
}
