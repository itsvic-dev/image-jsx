import type { CanvasRenderingContext2D } from "skia-canvas";
import type { DirectRenderer, JSXChildren } from "../types.js";
import { childrenOnlyDirectRenderers } from "./utils.js";

type LayoutClassProps = {
  gap?: number;
  x?: number;
  y?: number;
  direction: "vertical" | "horizontal";
};

class LayoutRenderer implements DirectRenderer {
  private props: LayoutClassProps;
  private children: DirectRenderer[];

  constructor(props: LayoutClassProps, children: DirectRenderer[]) {
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

  render(ctx: CanvasRenderingContext2D): void {
    let cursor = 0;

    for (const child of this.children) {
      const bbox = child.getBoundingBox(ctx);
      if (this.props.direction === "horizontal") {
        child.pos = { x: this.pos.x + cursor, y: this.pos.y };
        cursor += bbox.width + (this.props.gap ?? 0);
      } else {
        child.pos = { x: this.pos.x, y: this.pos.y + cursor };
        cursor += bbox.height + (this.props.gap ?? 0);
      }
      child.render(ctx);
    }
  }

  getBoundingBox(context: CanvasRenderingContext2D): {
    width: number;
    height: number;
  } {
    // calculate gaps for children
    const gaps = Math.max(0, this.children.length - 1) * (this.props.gap || 0);

    let width = 0;
    let height = 0;

    for (const child of this.children) {
      const bbox = child.getBoundingBox(context);
      if (this.props.direction === "horizontal") {
        width += bbox.width;
        height = Math.max(height, bbox.height);
      } else {
        width = Math.max(width, bbox.width);
        height += bbox.height;
      }
    }

    if (this.props.direction === "horizontal") {
      return { width: width + gaps, height };
    } else {
      return { width, height: height + gaps };
    }
  }
}

type LayoutProps = Omit<LayoutClassProps, "direction"> & {
  direction?: "vertical" | "horizontal";
};

/** Automatically arranges children into a layout, similar to a flexbox. */
const Layout = ({
  children,
  ...props
}: { children?: JSXChildren } & LayoutProps) => {
  return new LayoutRenderer(
    { ...props, direction: props.direction ?? "vertical" },
    childrenOnlyDirectRenderers(children)
  );
};

export default Layout;
