import type { CanvasRenderingContext2D } from "skia-canvas";
import type { DirectRenderer, JSXChildren } from "../types.js";

type SharedTextProps = {
  fontFamily: string;
  fontSize: number;
  fontWeight?: number;
  fill: string;

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
    this.props.x = this.pos.x;
    this.props.y = this.pos.y;
  }

  private setupCtx(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.props.fill;
    ctx.font = `${this.props.fontWeight || 400} ${this.props.fontSize}px ${
      this.props.fontFamily
    }`;
    ctx.textBaseline = "top";
  }

  getBoundingBox(ctx: CanvasRenderingContext2D): {
    width: number;
    height: number;
  } {
    this.setupCtx(ctx);
    const metrics = ctx.measureText(this.text);
    return {
      width: metrics.width,
      height: metrics.actualBoundingBoxDescent,
    };
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.setupCtx(ctx);
    ctx.fillText(this.text, this.pos.x, this.pos.y);
  }
}

const Text = ({
  children,
  ...props
}: { children?: JSXChildren } & SharedTextProps) => {
  if (children?.constructor === Array) {
    return new TextRenderer(
      children.map((a) => a?.toString() || "null").join(" "),
      props
    );
  } else {
    return new TextRenderer(children?.toString() || "null", props);
  }
};

export default Text;
