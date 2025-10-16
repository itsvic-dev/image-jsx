import type { CanvasRenderingContext2D } from "skia-canvas";
import type { DirectRenderer, JSXChildren, Style } from "../types.js";
import { resolveStyle } from "../internals.js";

type SharedTextProps = {
  fontFamily: string;
  fontSize: number;
  fontWeight?: number;
  fill?: Style;

  x?: number;
  y?: number;
};

class TextRenderer implements DirectRenderer {
  private text: string;
  private props: SharedTextProps;

  constructor(text: string, props: SharedTextProps) {
    this.text = text;
    this.props = props;
  }

  get pos(): { x: number; y: number } {
    return { x: this.props.x || 0, y: this.props.y || 0 };
  }
  set pos(pos: { x: number; y: number }) {
    this.props.x = pos.x;
    this.props.y = pos.y;
  }

  private setupCtx(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.props.fontWeight || 400} ${this.props.fontSize}px "${
      this.props.fontFamily
    }"`;
    ctx.textBaseline = "top";
  }

  getBoundingBox(ctx: CanvasRenderingContext2D): {
    width: number;
    height: number;
  } {
    this.setupCtx(ctx);
    let width = 0;
    let height = 0;
    let curY = 0;
    for (const line of this.text.split("\n")) {
      const metrics = ctx.measureText(line);
      width = Math.max(width, metrics.width);
      height = Math.max(height, curY + metrics.actualBoundingBoxDescent);
      curY += metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    }
    return { width, height };
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.setupCtx(ctx);
    if (this.props.fill) {
      ctx.fillStyle = resolveStyle(
        ctx,
        this.props.fill,
        this.pos,
        this.getBoundingBox(ctx)
      );
    }

    let curY = this.pos.y;
    for (const line of this.text.split("\n")) {
      const metrics = ctx.measureText(line);
      ctx.fillText(line, this.pos.x, curY);
      curY += metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    }
  }
}

const Text = ({
  children,
  ...props
}: { children?: JSXChildren } & SharedTextProps) => {
  if (children?.constructor === Array) {
    return new TextRenderer(
      children.map((a) => a?.toString() || "null").join(""),
      props
    );
  } else {
    return new TextRenderer(children?.toString() || "null", props);
  }
};

export default Text;
