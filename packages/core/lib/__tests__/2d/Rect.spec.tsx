import { render } from "@lib";
import { Rect } from "@lib/2d";
import { describe, expect, it } from "vitest";

describe("Rect", () => {
  it("handles custom widths", () => {
    const rect = <Rect fill={"red"} w={256} h={256} />;

    const canvas = render(256, 256, rect);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });

  it("handles custom positions", () => {
    const rect = <Rect fill={"red"} w={128} h={128} x={64} y={64} />;

    const canvas = render(256, 256, rect);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });

  it("resizes to children", () => {
    const rect = (
      <Rect fill={"red"}>
        <Rect fill={"#00ff0080"} w={128} h={256}></Rect>
        <Rect fill={"#0000ff80"} w={256} h={128}></Rect>
      </Rect>
    );

    const canvas = render(256, 256, rect);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });

  it("repositions children", () => {
    const rect = (
      <Rect fill={"red"} w={128} h={128} x={64} y={64}>
        <Rect fill={"aqua"} w={128} h={64}></Rect>
      </Rect>
    );

    const canvas = render(256, 256, rect);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });

  it("handles custom positions of children correctly", () => {
    const rect = (
      <Rect fill={"red"} x={16} y={16}>
        <Rect fill={"#0000ff80"} w={32} h={32} x={32} y={32} />
      </Rect>
    );

    const canvas = render(256, 256, rect);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });
});
