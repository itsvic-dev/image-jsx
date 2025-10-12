import type { CanvasRenderingContext2D } from "skia-canvas";
import type { BoundingBox, DirectRenderer, JSXChildren } from "../types.js";
import { childrenOnlyDirectRenderers } from "./utils.js";

type LayoutClassProps = {
  gap?: number;
  x?: number;
  y?: number;
  direction: "vertical" | "horizontal";
  arrangement: "start" | "middle" | "end";
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

  // calculates the offset of the child based on the direction and arrangement properties
  private getChildOffset(ourBbox: BoundingBox, childBbox: BoundingBox): number {
    let ourAxisSize = 0;
    let childAxisSize = 0;

    switch (this.props.direction) {
      case "horizontal":
        ourAxisSize = ourBbox.height;
        childAxisSize = childBbox.height;
        break;
      case "vertical":
        ourAxisSize = ourBbox.width;
        childAxisSize = childBbox.width;
        break;
    }

    switch (this.props.arrangement) {
      case "start":
        return 0;
      case "end":
        return ourAxisSize - childAxisSize;
      case "middle":
        return (ourAxisSize - childAxisSize) / 2;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    let cursor = 0;
    const ourBbox = this.getBoundingBox(ctx);

    for (const child of this.children) {
      const bbox = child.getBoundingBox(ctx);
      if (this.props.direction === "horizontal") {
        child.pos = {
          x: this.pos.x + cursor,
          y: this.pos.y + this.getChildOffset(ourBbox, bbox),
        };
        cursor += bbox.width + (this.props.gap ?? 0);
      } else {
        child.pos = {
          x: this.pos.x + this.getChildOffset(ourBbox, bbox),
          y: this.pos.y + cursor,
        };
        cursor += bbox.height + (this.props.gap ?? 0);
      }
      child.render(ctx);
    }
  }

  getBoundingBox(context: CanvasRenderingContext2D): BoundingBox {
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

type LayoutProps = Partial<LayoutClassProps>;

/** Automatically arranges children into a layout, similar to a flexbox. */
const Layout = ({
  children,
  ...props
}: { children?: JSXChildren } & LayoutProps) => {
  return new LayoutRenderer(
    {
      ...props,
      direction: props.direction ?? "vertical",
      arrangement: props.arrangement ?? "start",
    },
    childrenOnlyDirectRenderers(children)
  );
};

export default Layout;
