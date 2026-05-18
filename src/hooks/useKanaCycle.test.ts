import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useKanaCycle from "./useKanaCycle";
import { Moji } from "@/types/Moji";

vi.useFakeTimers();

const kanaList: Moji[] = [
  { char: "あ", romaji: "a" },
  { char: "い", romaji: "i" },
];

const _originalMathFloor = Math.floor;

describe("useKanaCycle()", () => {
  afterEach(() => {
    vi.clearAllTimers();

    // Restore original implementation.
    Math.floor = _originalMathFloor;
  });

  it("should initialize state correctly", () => {
    // Force predictable random record.
    Math.floor = vi.fn(() => 0);

    const { result } = renderHook(() => useKanaCycle(kanaList, 1000));

    expect(result.current.showCharacter).toBe(true);
    expect(result.current.currentKana).toEqual({ char: "あ", romaji: "a" });
    expect(result.current.elapsedMs).toBe(0);
  });

  it("should set currentKana to a value from the list", () => {
    const { result } = renderHook(() => useKanaCycle(kanaList, 1000));

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(kanaList.map((k) => k.char)).toContain(
      result.current.currentKana.char,
    );
  });

  it("should start with showCharacter true", () => {
    const { result } = renderHook(() => useKanaCycle(kanaList, 1000));

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.showCharacter).toBe(true);
  });

  it("should toggle showCharacter to false after speedMs", () => {
    const { result } = renderHook(() => useKanaCycle(kanaList, 100));
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.showCharacter).toBe(false);
  });

  it("should update elapsedMs over time", () => {
    const { result } = renderHook(() => useKanaCycle(kanaList, 1000));
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current.elapsedMs).toBeGreaterThanOrEqual(50);
  });

  it("should clear timers on unmount", () => {
    const { unmount } = renderHook(() => useKanaCycle(kanaList, 1000));
    const spyClearTimeout = vi.spyOn(global, "clearTimeout");
    const spyClearInterval = vi.spyOn(global, "clearInterval");

    unmount();

    expect(spyClearTimeout).toHaveBeenCalled();
    expect(spyClearInterval).toHaveBeenCalled();
    spyClearTimeout.mockRestore();
    spyClearInterval.mockRestore();
  });

  it("should not crash if kanaList is empty", () => {
    const { result } = renderHook(() => useKanaCycle([], 1000));

    expect(result.current.currentKana).toEqual({ char: "", romaji: "" });
    expect(result.current.showCharacter).toBe(true);
  });

  it("should keep cycling indefinitely", () => {
    const { result } = renderHook(() => useKanaCycle(kanaList, 100));
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(kanaList.map((k) => k.char)).toContain(
      result.current.currentKana.char,
    );
  });

  it("should reset elapsedMs when new cycle starts", () => {
    const { result } = renderHook(() => useKanaCycle(kanaList, 100));
    act(() => {
      vi.advanceTimersByTime(50);
    });

    const elapsedBefore = result.current.elapsedMs;
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current.elapsedMs).toBeLessThan(elapsedBefore + 50);
  });
});
