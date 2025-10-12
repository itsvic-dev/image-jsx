import { render, type DirectRenderer } from "@lib";
import { Img } from "@lib/2d";
import { Image, loadImage } from "skia-canvas";
import { describe, it, expect } from "vitest";

describe("Img", () => {
  it("renders an image correctly", async () => {
    // https://commons.wikimedia.org/wiki/File:Orange_juice_1_edit1.jpg
    const image = await loadImage(
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Orange_juice_1_edit1.jpg"
    );

    const root = <Img image={image} w={128} h={128} />;
    const canvas = render(256, 256, root);
    expect(await canvas.toBuffer("png")).toMatchImageSnapshot({
      failureThresholdType: "pixel",
      failureThreshold: 5,
    });
  });

  it("renders automatically sized image correctly", async () => {
    // https://commons.wikimedia.org/wiki/File:Orange_juice_1_edit1.jpg
    const image = await loadImage(
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Orange_juice_1_edit1.jpg"
    );

    const root = <Img image={image} x={-512} y={-512} />;
    const canvas = render(512, 512, root);
    expect(await canvas.toBuffer("png")).toMatchImageSnapshot();
  });

  it("changes position at runtime correctly", () => {
    const root = (<Img image={new Image()} />) as DirectRenderer;

    expect(root.pos).toStrictEqual({ x: 0, y: 0 });
    root.pos = { x: 32, y: 32 };
    expect(root.pos).toStrictEqual({ x: 32, y: 32 });
  });
});
