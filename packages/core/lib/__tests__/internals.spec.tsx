import { describe, expect, it } from "vitest";
import { linearGradient } from "../internals.js";
import { Rect } from "@lib/2d";
import { render, type Style } from "@lib";

describe("Internals", () => {
  for (const direction of [
    "to bottom",
    "to top",
    "to left",
    "to right",
    "to top left",
    "to top right",
    "to bottom left",
    "to bottom right",
  ] as const) {
    it(`linear gradient ${direction} renders correctly`, () => {
      const gradient = linearGradient(["white", "black"], direction);
      const rect = <Rect fill={gradient} w={256} h={256} />;
      const canvas = render(256, 256, rect);
      expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
    });

    it(`linear gradient with many stops ${direction} renders correctly`, () => {
      const gradient = linearGradient(["red", "purple", "blue"], direction);
      const rect = <Rect fill={gradient} w={256} h={256} />;
      const canvas = render(256, 256, rect);
      expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
    });
  }

  it("fails on invalid styles", () => {
    const rect = <Rect fill={123 as unknown as Style} w={256} h={256} />;
    expect(() => render(256, 256, rect)).toThrowErrorMatchingSnapshot();
  });

  it("fails on ambiguous gradients", () => {
    const gradient = { gradient: "linear", stops: [] } satisfies Style;
    const rect = <Rect fill={gradient} w={256} h={256} />;
    expect(() => render(256, 256, rect)).toThrowErrorMatchingSnapshot();
  });

  it("linear gradient with custom positions renders correctly", () => {
    const gradient = {
      gradient: "linear",
      stops: [
        { at: 0, color: "white" },
        { at: 1, color: "black" },
      ],
      positions: {
        start: { x: 0, y: 64 },
        end: { x: 32, y: 128 + 64 },
      },
    } satisfies Style;
    const rect = <Rect fill={gradient} w={256} h={256} />;
    const canvas = render(256, 256, rect);
    expect(canvas.toBufferSync("png")).toMatchImageSnapshot();
  });
});
