import { render, type DirectRenderer } from "@lib";
import { Rect, Text } from "@lib/2d";
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

  it("handles multiple children correctly", () => {
    const text = (
      <Text fill="white" fontFamily="Arial" fontSize={48}>
        {"hello"}
        {"world!"}
      </Text>
    );

    const canvas = render(256, 256, text);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });

  it("handles multiline correctly", () => {
    const text = (
      <Rect fill="red">
        <Text fill="white" fontFamily="Arial" fontSize={48}>
          {"hello\nworld!"}
        </Text>
      </Rect>
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

  it("calculates bounding box of multiline text correctly", () => {
    const text = (
      <Text fill="white" fontFamily="Arial" fontSize={48}>
        {"hello\nworld"}
      </Text>
    );
    const bbox = (text as DirectRenderer).getBoundingBox(
      new Canvas().getContext("2d")
    );
    expect(bbox).toMatchSnapshot();
  });

  it("handles null children correctly", () => {
    const text = <Text fill="white" fontFamily="Arial" fontSize={48}></Text>;

    const canvas = render(256, 256, text);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });
});
