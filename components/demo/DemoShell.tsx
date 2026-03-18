"use client";

import { useState } from "react";
import classNames from "classnames";
import Divider from "@/components/ui/Divider";
import ButtonsDemo from "./Buttons.Demo";
import ContainersDemo from "./Containers.Demo";
import TypographyDemo from "./Typography.Demo";

type FilterId = "all" | "typography" | "containers" | "buttons";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all",         label: "All" },
  { id: "typography",  label: "Typography" },
  { id: "containers",  label: "Containers" },
  { id: "buttons",     label: "Buttons" },
];

const DEMOS: { id: FilterId; Component: React.ComponentType }[] = [
  { id: "typography",  Component: TypographyDemo  },
  { id: "containers",  Component: ContainersDemo  },
  { id: "buttons",     Component: ButtonsDemo     },
];

export default function DemoShell() {
  const [active, setActive] = useState<FilterId>("all");

  const visible = DEMOS.filter((d) => active === "all" || d.id === active);

  return (
    <div>
      {/* ── Filter bar ── */}
      <div className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-page items-center gap-2 overflow-x-auto px-5 py-3 md:px-6 lg:px-8">
          <span className="mr-2 shrink-0 text-xs font-semibold uppercase tracking-caption text-text-soft">
            Show
          </span>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={classNames(
                "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition cursor-pointer",
                f.id === active
                  ? "bg-brand-600 text-white"
                  : "bg-surface-muted text-text-soft hover:bg-surface-soft hover:text-text"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Demo panels ── */}
      {visible.map(({ id, Component }, i) => (
        <div key={id}>
          {i > 0 && <Divider />}
          <Component />
        </div>
      ))}
    </div>
  );
}
