import type { ComponentProps, FunctionComponent, JSXChild } from "./types.js";

// simply a wrapper that allows the use of JSX for function components
export function jsx(type: FunctionComponent, props: ComponentProps): JSXChild {
  return type(props);
}
