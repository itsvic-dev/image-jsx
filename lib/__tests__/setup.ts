import { toMatchImageSnapshot } from "jest-image-snapshot";
import { FontLibrary } from "skia-canvas";
import { expect } from "vitest";

expect.extend({ toMatchImageSnapshot });
FontLibrary.use("Inter", [
  new URL("fonts/InterVariable.ttf", import.meta.url).pathname,
]);
