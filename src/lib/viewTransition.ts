import { flushSync } from "react-dom";

/**
 * Pazionart View Transitions Helper
 * Safely executes DOM/state updates wrapped in the native View Transitions API.
 * Uses flushSync to ensure React 19 commits DOM updates before the snapshot is taken.
 * Gracefully falls back to direct execution if unsupported or in SSR.
 */
export function startSafeViewTransition(
  updateFn: () => void,
  options?: {
    onFinished?: () => void;
  }
) {
  if (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    typeof (document as any).startViewTransition === "function"
  ) {
    try {
      const transition = (document as any).startViewTransition(() => {
        try {
          flushSync(() => {
            updateFn();
          });
        } catch {
          updateFn();
        }
      });

      if (transition && typeof transition.finished?.then === "function") {
        transition.finished
          .then(() => {
            options?.onFinished?.();
          })
          .catch(() => {
            options?.onFinished?.();
          });
      }
      return transition;
    } catch {
      // In case of rapid concurrent transition requests
      updateFn();
      options?.onFinished?.();
    }
  } else {
    updateFn();
    options?.onFinished?.();
  }
}
