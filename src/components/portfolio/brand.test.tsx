import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { Brand } from "./brand";

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("Mobile name display", () => {
  it("reverts exactly three seconds after a tap", () => {
    vi.useFakeTimers();
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    render(<Brand />);
    const brand = screen.getByRole("button", { name: "Gyampo Ayeh Ebenezer Derrick" });
    fireEvent.click(brand);
    act(() => vi.advanceTimersByTime(2999));
    expect(brand.getAttribute("aria-expanded")).toBe("true");
    act(() => vi.advanceTimersByTime(1));
    expect(brand.getAttribute("aria-expanded")).toBe("false");
  });
});