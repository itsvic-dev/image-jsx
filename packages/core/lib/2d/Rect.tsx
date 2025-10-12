import type { CanvasRenderingContext2D } from "skia-canvas";
import type { DirectRenderer, JSXChildren } from "../types.js";
import { childrenOnlyDirectRenderers } from "./utils.js";

type RectProps = {
  fill: string;
  w?: number;
  h?: number;
  x?: number;
  y?: number;
  radius?:
    | number
    | [number, number]
    | [number, number, number]
    | [number, number, number, number];
};

class RectRenderer implements DirectRenderer {
  private props: RectProps;
  private children: DirectRenderer[];
  constructor(props: RectProps, children: DirectRenderer[]) {
    this.props = props;
    this.children = children;
  }

  get pos(): { x: number; y: number } {
    return { x: this.props.x || 0, y: this.props.y || 0 };
  }
  set pos(pos: { x: number; y: number }) {
    this.props.x = pos.x;
    this.props.y = pos.y;
  }

  render(context: CanvasRenderingContext2D): void {
    const bbox = this.getBoundingBox(context);
    context.fillStyle = this.props.fill;
    context.beginPath();
    context.roundRect(
      this.pos.x,
      this.pos.y,
      bbox.width,
      bbox.height,
      this.props.radius ?? 0
    );
    context.closePath();
    context.fill();
    context.beginPath();

    // render children
    for (const child of this.children) {
      // reposition children
      child.pos = {
        x: child.pos.x + this.pos.x,
        y: child.pos.y + this.pos.y,
      };
      child.render(context);
    }
  }

  getBoundingBox(context: CanvasRenderingContext2D): {
    width: number;
    height: number;
  } {
    if (this.props.w !== undefined && this.props.h !== undefined) {
      return { width: this.props.w, height: this.props.h };
    }

    // measure the bounding box
    let width: number = 0;
    let height: number = 0;

    for (const child of this.children) {
      const childBbox = child.getBoundingBox(context);
      width = Math.max(width, child.pos.x + childBbox.width);
      height = Math.max(height, child.pos.y + childBbox.height);
    }

    return { width: this.props.w ?? width, height: this.props.h ?? height };
  }
}

/**
 * `Rect` renders a rectangle that contains its children.
 *
 * It's important to note that **`Rect` does not handle layouts.** It merely
 * renders a background. Your children will be rendered on top of one another.
 */
const Rect = ({
  children,
  ...props
}: { children?: JSXChildren } & RectProps) => {
  return new RectRenderer(props, childrenOnlyDirectRenderers(children));
};

export default Rect;
