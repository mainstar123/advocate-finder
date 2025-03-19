import { renderHook, act } from "@testing-library/react";
import useDebounce from "./use-debounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should debounce value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 300 },
      },
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated", delay: 300 });

    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("updated");
  });

  it("should cancel previous debounce when value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 300 },
      },
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated", delay: 300 });

    expect(result.current).toBe("initial");

    rerender({ value: "final", delay: 300 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("final");
  });
});
