import type { CanvasGradient, CanvasRenderingContext2D } from "skia-canvas";
import type {
  Position,
  BoundingBox,
  Style,
  GradientDirection,
} from "./types.js";

type CanvasStyle = string | CanvasGradient;

function splitDirection(
  direction: GradientDirection
): ["top" | "bottom" | undefined, "left" | "right" | undefined] {
  switch (direction) {
    case "to bottom":
      return ["bottom", undefined];
    case "to top":
      return ["top", undefined];
    case "to left":
      return [undefined, "left"];
    case "to right":
      return [undefined, "right"];
    case "to top left":
      return ["top", "left"];
    case "to top right":
      return ["top", "right"];
    case "to bottom left":
      return ["bottom", "left"];
    case "to bottom right":
      return ["bottom", "right"];
  }
}

export function resolveStyle(
  ctx: CanvasRenderingContext2D,
  style: Style,
  pos: Position,
  bbox: BoundingBox
): CanvasStyle {
  if (typeof style === "string") return style;

  if (
    typeof style === "object" &&
    "gradient" in style &&
    style.gradient === "linear"
  ) {
    let startX = pos.x;
    let startY = pos.y;
    let endX = pos.x;
    let endY = pos.y;

    if (!style.direction) {
      if (style.positions === undefined) {
        throw new Error(
          "linear gradients must have a direction or start/end points"
        );
      }
    } else {
      const directions = splitDirection(style.direction);

      switch (directions[0]) {
        case "top":
          startY = pos.y + bbox.height;
          endY = pos.y;
          break;
        case "bottom":
          startY = pos.y;
          endY = pos.y + bbox.height;
          break;
      }

      switch (directions[1]) {
        case "left":
          startX = pos.x;
          endX = pos.x + bbox.width;
          break;
        case "right":
          startX = pos.x + bbox.width;
          endX = pos.x;
          break;
      }
    }

    const gradient = ctx.createLinearGradient(
      style.positions?.start.x ?? startX,
      style.positions?.start.y ?? startY,
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
