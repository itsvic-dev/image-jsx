import { render, type DirectRenderer } from "@lib";
import { Rect, Text } from "@lib/2d";
import { Canvas } from "skia-canvas";
import { describe, expect, it } from "vitest";

describe("Text", () => {
  it("renders correctly", () => {
    const text = (
      <Text fill="white" fontFamily="Inter" fontSize={48}>
        hello
      </Text>
    );

    const canvas = render(256, 256, text);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot({
      failureThresholdType: "pixel",
      failureThreshold: 50,
    });
  });

  it("renders with custom position correctly", () => {
    const text = (
      <Text fill="white" fontFamily="Inter" fontSize={48} x={32} y={32}>
        hello
      </Text>
    );

    const canvas = render(256, 256, text);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot({
      failureThresholdType: "pixel",
      failureThreshold: 50,
    });
  });

  it("changes position at runtime correctly", () => {
    const text = (
      <Text fill="white" fontFamily="Inter" fontSize={48}>
        hello
      </Text>
    ) as DirectRenderer;

    text.pos = { x: 32, y: 32 };
    expect(text.pos).toStrictEqual({ x: 32, y: 32 });
  });

  it("handles multiple children correctly", () => {
    const text = (
      <Text fill="white" fontFamily="Inter" fontSize={48}>
        {"hello"}
        {"world!"}
      </Text>
    );

    const canvas = render(256, 256, text);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot({
      failureThresholdType: "pixel",
      failureThreshold: 50,
    });
  });

  it("handles multiline correctly", () => {
    const text = (
      <Rect fill="red">
        <Text fill="white" fontFamily="Inter" fontSize={48}>
          {"hello\nworld!"}
        </Text>
      </Rect>
    );

    const canvas = render(256, 256, text);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot({
      failureThresholdType: "pixel",
      failureThreshold: 50,
    });
  });

  it("calculates bounding box correctly", () => {
    const text = (
      <Text fill="white" fontFamily="Inter" fontSize={48}>
        hello
      </Text>
    );
    const bbox = (text as DirectRenderer).getBoundingBox(
      new Canvas().getContext("2d")
    );
    // these differ between mac and linux, so hardcode ranges instead
    expect(bbox.width).toBeGreaterThan(108);
    expect(bbox.width).toBeLessThan(109);
    expect(bbox.height).toBeGreaterThan(47);
    expect(bbox.height).toBeLessThan(49);
  });

  it("calculates bounding box of multiline text correctly", () => {
    const text = (
      <Text fill="white" fontFamily="Inter" fontSize={48}>
        {"hello\nworld"}
      </Text>
    );
    const bbox = (text as DirectRenderer).getBoundingBox(
      new Canvas().getContext("2d")
    );
    expect(bbox.width).toBeGreaterThan(127);
    expect(bbox.width).toBeLessThan(128);
    expect(bbox.height).toBeGreaterThan(105);
    expect(bbox.height).toBeLessThan(107);
  });

  it("handles null child correctly", () => {
    const text = <Text fill="white" fontFamily="Inter" fontSize={48}></Text>;

    const canvas = render(256, 256, text);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot({
      failureThresholdType: "pixel",
      failureThreshold: 50,
    });
  });

  it("handles null children correctly", () => {
    const text = (
      <Text fill="white" fontFamily="Inter" fontSize={48}>
        hello {null}
      </Text>
    );

    const canvas = render(256, 256, text);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot({
      failureThresholdType: "pixel",
      failureThreshold: 50,
    });
  });
});
