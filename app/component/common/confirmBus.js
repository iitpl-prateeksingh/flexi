"use client";

export function requestConfirmation(options = {}) {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    window.dispatchEvent(
      new CustomEvent("admin:confirm", {
        detail: {
          ...options,
          resolve,
        },
      }),
    );
  });
}
