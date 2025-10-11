import { Layout, Rect } from "@lib/2d";
import { Canvas } from "skia-canvas";
import { describe, it, expect } from "vitest";
import type { DirectRenderer } from "../../types.js";
import { render } from "../../renderer.js";

describe("Layout", () => {
  it("handles zero children correctly", () => {
    const layout = (<Layout></Layout>) as DirectRenderer;

    const bounds = layout.getBoundingBox(new Canvas().getContext("2d"));
    expect(bounds).toStrictEqual({ width: 0, height: 0 });
  });

  it("handles zero children with a gap correctly", () => {
    const layout = (<Layout gap={8}></Layout>) as DirectRenderer;

    const bounds = layout.getBoundingBox(new Canvas().getContext("2d"));
    expect(bounds).toStrictEqual({ width: 0, height: 0 });
  });

  it("renders correctly", () => {
    const layout = (
      <Layout>
        <Rect w={128} h={64} fill={"red"}></Rect>
        <Rect w={64} h={32} fill={"aqua"}></Rect>
        <Rect w={32} h={128} fill={"purple"}></Rect>
      </Layout>
    );
    const canvas = render(256, 256, layout);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });

  it("renders with gaps correctly", () => {
    const layout = (
      <Layout gap={8}>
        <Rect w={128} h={64} fill={"red"}></Rect>
        <Rect w={64} h={32} fill={"aqua"}></Rect>
        <Rect w={32} h={128} fill={"purple"}></Rect>
      </Layout>
    );
    const canvas = render(256, 256, layout);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });

  it("calculates bounding boxes for children correctly", () => {
    const layout = (
      <Layout>
        <Rect w={128} h={64} fill={"red"}></Rect>
        <Rect w={64} h={32} fill={"aqua"}></Rect>
        <Rect w={32} h={128} fill={"purple"}></Rect>
      </Layout>
    ) as DirectRenderer;

    const bounds = layout.getBoundingBox(new Canvas().getContext("2d"));
    expect(bounds).toStrictEqual({ width: 128, height: 64 + 32 + 128 });
  });

  it("calculates bounding boxes for children with gaps correctly", () => {
    const layout = (
      <Layout gap={8}>
        <Rect w={128} h={64} fill={"red"}></Rect>
        <Rect w={64} h={32} fill={"aqua"}></Rect>
        <Rect w={32} h={128} fill={"purple"}></Rect>
      </Layout>
    ) as DirectRenderer;

    const bounds = layout.getBoundingBox(new Canvas().getContext("2d"));
    expect(bounds).toStrictEqual({ width: 128, height: 64 + 32 + 128 + 8 * 2 });
  });
});
