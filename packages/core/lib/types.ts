import type { CanvasRenderingContext2D } from "skia-canvas";

export type Position = { x: number; y: number };

export type Style = string | LinearGradient;

export type GradientDirection =
  | "to bottom"
  | "to top"
  | "to left"
  | "to right"
  | "to top left"
  | "to top right"
  | "to bottom left"
  | "to bottom right";

export type GradientStop = {
  at: number;
  color: string;
};

export type LinearGradient = {
  gradient: "linear";
  positions?: {
    start: Position;
    end: Position;
  };
  stops: GradientStop[];
  direction?: GradientDirection;
};

/**
 * `DirectRenderer`s render stuff directly to the underlying Canvas.
 */
export interface DirectRenderer {
  get pos(): Position;
  set pos(pos: Position);

  /** Renders to a canvas context. */
  render(context: CanvasRenderingContext2D): void;

  /** Returns the bounding box of the renderer's output, without rendering to the canvas context. */
  getBoundingBox(context: CanvasRenderingContext2D): BoundingBox;
}

export type ComponentProps = {
  [x: string]: unknown;
  children?: JSXChildren;
};

type _FunctionComponentNoProps = () => JSXChild;
type _FunctionComponentWithProps = (props: ComponentProps) => JSXChild;

export type FunctionComponent =
  | _FunctionComponentNoProps
  | _FunctionComponentWithProps;

export type JSXChild =
  | DirectRenderer
  | FunctionComponent
  | string
  | number
  | null;

export type JSXChildren = JSXChild | JSXChild[];

export type BoundingBox = {
  width: number;
  height: number;
};
