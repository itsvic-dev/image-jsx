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

  for (const direction of ["vertical", "horizontal"] as const) {
    for (const arrangement of ["start", "middle", "end"] as const) {
      it(`renders correctly (${direction}, arrangement ${arrangement})`, () => {
        const layout = (
          <Layout direction={direction} arrangement={arrangement}>
            <Rect w={128} h={64} fill={"red"}></Rect>
            <Rect w={64} h={32} fill={"aqua"}></Rect>
            <Rect w={32} h={128} fill={"purple"}></Rect>
          </Layout>
        );
        const canvas = render(256, 256, layout);
        expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
      });

      it(`renders with gaps correctly (${direction}, ${arrangement})`, () => {
        const layout = (
          <Layout gap={8} direction={direction} arrangement={arrangement}>
            <Rect w={128} h={64} fill={"red"}></Rect>
            <Rect w={64} h={32} fill={"aqua"}></Rect>
            <Rect w={32} h={128} fill={"purple"}></Rect>
          </Layout>
        );
        const canvas = render(256, 256, layout);
        expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
      });
    }

    for (const alignment of ["start", "middle", "end"] as const) {
      it(`renders correctly (${direction}, alignment ${alignment})`, () => {
        const layout = (
          <Rect fill="white">
            <Layout
              direction={direction}
              alignment={alignment}
              w={direction === "horizontal" ? 256 : undefined}
              h={direction === "vertical" ? 256 : undefined}
            >
              <Rect fill={"red"} w={32} h={32} />
              <Rect fill={"green"} w={32} h={32} />
              <Rect fill={"blue"} w={32} h={32} />
            </Layout>
          </Rect>
        );
        const canvas = render(256, 256, layout);
        expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
      });

      it(`renders with gaps correctly (${direction}, alignment ${alignment})`, () => {
        const layout = (
          <Rect fill="white">
            <Layout
              direction={direction}
              alignment={alignment}
              gap={8}
              w={direction === "horizontal" ? 256 : undefined}
              h={direction === "vertical" ? 256 : undefined}
            >
              <Rect fill={"red"} w={32} h={32} />
              <Rect fill={"green"} w={32} h={32} />
              <Rect fill={"blue"} w={32} h={32} />
            </Layout>
          </Rect>
        );
        const canvas = render(256, 256, layout);
        expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
      });
    }
  }

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

  it("calculates bounding boxes for children horizontally correctly", () => {
    const layout = (
      <Layout direction="horizontal">
        <Rect w={128} h={64} fill={"red"}></Rect>
        <Rect w={64} h={32} fill={"aqua"}></Rect>
        <Rect w={32} h={128} fill={"purple"}></Rect>
      </Layout>
    ) as DirectRenderer;

    const bounds = layout.getBoundingBox(new Canvas().getContext("2d"));
    expect(bounds).toStrictEqual({ width: 128 + 64 + 32, height: 128 });
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

  it("calculates bounding boxes for children with gaps horizontally correctly", () => {
    const layout = (
      <Layout gap={8} direction="horizontal">
        <Rect w={128} h={64} fill={"red"}></Rect>
        <Rect w={64} h={32} fill={"aqua"}></Rect>
        <Rect w={32} h={128} fill={"purple"}></Rect>
      </Layout>
    ) as DirectRenderer;

    const bounds = layout.getBoundingBox(new Canvas().getContext("2d"));
    expect(bounds).toStrictEqual({ width: 128 + 64 + 32 + 8 * 2, height: 128 });
  });
});
