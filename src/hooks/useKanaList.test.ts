import { renderHook } from "@testing-library/react";
import useKanaList from "../hooks/useKanaList";
import { hiragana } from "../data/hiragana";
import { katakana } from "../data/katakana";
import { radicals } from "../data/radicals";
import { describe, expect, it } from "vitest";

describe("useKanaList()", () => {
  it("returns hiragana when selection is Hiragana", () => {
    const { result } = renderHook(() => useKanaList("Hiragana"));
    expect(result.current).toEqual(hiragana);
  });

  it("returns katakana when selection is Katakana", () => {
    const { result } = renderHook(() => useKanaList("Katakana"));
    expect(result.current).toEqual(katakana);
  });

  it("returns radicals when selection is 214 Classic Radicals", () => {
    const { result } = renderHook(() => useKanaList("214 Classic Radicals"));
    expect(result.current).toEqual(radicals);
  });

  it("returns all lists when selection is something else", () => {
    const { result } = renderHook(() => useKanaList("All"));
    expect(result.current).toEqual([...hiragana, ...katakana, ...radicals]);
  });
});
