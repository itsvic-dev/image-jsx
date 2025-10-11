import type { CanvasRenderingContext2D } from "skia-canvas";
import type { DirectRenderer, JSXChildren } from "../types.js";

type RectProps = {
  fill: string;
  w?: number;
  h?: number;
  x?: number;
  y?: number;
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
    context.fillRect(this.pos.x, this.pos.y, bbox.width, bbox.height);

    // render children
    for (const child of this.children) {
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
      width = Math.max(width, childBbox.width);
      height = Math.max(height, childBbox.height);
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
  if (children?.constructor === Array) {
    for (const child of children) {
      if (!(child !== null && typeof child === "object" && "render" in child)) {
        throw new Error("children of Rect should only be DirectRenderers");
      }
    }

    return new RectRenderer(props, children as DirectRenderer[]);
  } else {
    if (
      !(
        children !== null &&
        typeof children === "object" &&
        "render" in children
      )
    ) {
      throw new Error("children of Rect should only be DirectRenderers");
    }

    return new RectRenderer(props, [children as DirectRenderer]);
  }
};

export default Rect;
