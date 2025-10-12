import type { CanvasRenderingContext2D, Image } from "skia-canvas";
import type { BoundingBox, DirectRenderer } from "../types.js";

type ImgProps = {
  image: Image;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
};

class ImgRenderer implements DirectRenderer {
  private props: ImgProps;

  constructor(props: ImgProps) {
    this.props = props;
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
    context.drawImage(
      this.props.image,
      this.props.x ?? 0,
      this.props.y ?? 0,
      bbox.width,
      bbox.height
    );
  }

  getBoundingBox(context: CanvasRenderingContext2D): BoundingBox {
    return {
      width: this.props.w ?? this.props.image.width,
      height: this.props.h ?? this.props.image.height,
    };
  }
}

const Img = (props: ImgProps) => {
  return new ImgRenderer(props);
};

export default Img;
