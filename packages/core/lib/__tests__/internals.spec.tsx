import { describe, expect, it } from "vitest";
import { linearGradient } from "../internals.js";
import { Rect } from "@lib/2d";
import { render } from "@lib";

describe("Internals", () => {
  it("linear gradient to bottom renders correctly", () => {
    const gradient = linearGradient(["red", "darkred"], "to bottom");
    const rect = <Rect fill={gradient} w={256} h={256} />;
    const canvas = render(256, 256, rect);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });

  it("linear gradient with many stops to bottom renders correctly", () => {
    const gradient = linearGradient(["red", "purple", "blue"], "to bottom");
    const rect = <Rect fill={gradient} w={256} h={256} />;
    const canvas = render(256, 256, rect);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });
});
