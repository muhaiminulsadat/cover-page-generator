"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import type {
  CreateTypes as ConfettiInstance,
  GlobalOptions as ConfettiGlobalOptions,
  Options as ConfettiOptions,
} from "canvas-confetti";
import confetti from "canvas-confetti";

export interface ConfettiApi {
  fire: (options?: ConfettiOptions) => void;
}

export interface ConfettiProps extends React.ComponentPropsWithRef<"canvas"> {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
}

export type ConfettiRef = ConfettiApi | null;

export const Confetti = forwardRef<ConfettiApi, ConfettiProps>(
  function Confetti(props, ref) {
    const {
      options,
      globalOptions = {resize: true, useWorker: true},
      manualstart = false,
      ...rest
    } = props;
    const instanceRef = useRef<ConfettiInstance | null>(null);

    const canvasRef = useCallback(
      (node: HTMLCanvasElement | null) => {
        if (!node) {
          instanceRef.current?.reset();
          instanceRef.current = null;
          return;
        }

        if (instanceRef.current) return;

        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true,
        });
      },
      [globalOptions],
    );

    const fire = useCallback(
      async (opts: ConfettiOptions = {}) => {
        try {
          await instanceRef.current?.({...options, ...opts});
        } catch (error) {
          console.error("Confetti error:", error);
        }
      },
      [options],
    );

    const api = useMemo(
      () => ({
        fire,
      }),
      [fire],
    );

    useImperativeHandle(ref, () => api, [api]);

    useEffect(() => {
      if (manualstart) return;

      void fire();
    }, [manualstart, fire]);

    return <canvas ref={canvasRef} {...rest} />;
  },
);

Confetti.displayName = "Confetti";
