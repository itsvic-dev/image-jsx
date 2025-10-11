import { render, type DirectRenderer } from "@lib";
import { Text } from "@lib/2d";
import { Canvas } from "skia-canvas";
import { describe, expect, it } from "vitest";

describe("Text", () => {
  it("renders correctly", () => {
    const text = (
      <Text fill="white" fontFamily="Arial" fontSize={48}>
        hello
      </Text>
    );

    const canvas = render(256, 256, text);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });

  it("renders with custom position correctly", () => {
    const text = (
      <Text fill="white" fontFamily="Arial" fontSize={48} x={32} y={32}>
        hello
      </Text>
    );

    const canvas = render(256, 256, text);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });

  it("calculates bounding box correctly", () => {
    const text = (
      <Text fill="white" fontFamily="Arial" fontSize={48}>
        hello
      </Text>
    );
    const bbox = (text as DirectRenderer).getBoundingBox(
      new Canvas().getContext("2d")
    );
    expect(bbox).toMatchSnapshot();
  });
});
