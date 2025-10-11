import type { DirectRenderer, JSXChild, JSXChildren } from "../types.js";

const childIsDirectRenderer = (child: JSXChild) =>
  typeof child === "object" && child !== null && "render" in child;

export function childrenOnlyDirectRenderers(
  children?: JSXChildren
): DirectRenderer[] {
  if (children === undefined) return [];

  if (children?.constructor === Array) {
    for (const child of children) {
      if (!childIsDirectRenderer(child)) {
        throw new Error("children must be `DirectRenderer`s");
      }
    }

    return children as DirectRenderer[];
  } else {
    if (!childIsDirectRenderer(children as JSXChild)) {
      throw new Error("children must be `DirectRenderer`s");
    }

    return [children as DirectRenderer];
  }
}
