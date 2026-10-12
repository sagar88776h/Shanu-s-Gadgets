import React from "react";
import type { PhoneCondition } from "../data/storeData";
import { CONDITION_GUIDE, USED_PHONE_CHECKS } from "../data/storeData";
import { GRADE_STYLE } from "../lib/tierStyles";
import { cn } from "../lib/utils";
import { Check } from "lucide-react";

const batteryColor = (pct: number) =>
  pct >= 90 ? "bg-emerald-500" : pct >= 80 ? "bg-lime-500" : "bg-amber-500";

export const ConditionReport: React.FC<{ condition: PhoneCondition }> = ({ condition }) => (
  <section
    aria-label="Condition report"
    className="rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.03] p-4 sm:p-5 space-y-4"
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <h4 className="text-sm font-bold text-apple-text dark:text-white">Condition report</h4>
        <p className="text-xs text-apple-gray mt-0.5">{CONDITION_GUIDE[condition.grade]}</p>
      </div>
      <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0", GRADE_STYLE[condition.grade])}>
        {condition.grade}
      </span>
    </div>

    <div>
      <div className="flex items-baseline justify-between text-xs mb-1.5">
        <span className="text-apple-gray">Battery health</span>
        <span className="font-bold text-apple-text dark:text-white">{condition.battery}%</span>
      </div>
      <div className="h-2 rounded-full bg-black/[0.07] dark:bg-white/[0.1] overflow-hidden">
        <div className={cn("h-full rounded-full", batteryColor(condition.battery))} style={{ width: `${condition.battery}%` }} />
      </div>
    </div>

    <dl className="grid grid-cols-3 gap-2 text-xs">
      {[
        ["Storage", condition.storage],
        ["RAM", condition.ram],
        ["Box & bill", condition.boxAndBill ? "Included" : "Store invoice"],
      ].map(([k, v]) => (
        <div key={k} className="rounded-xl bg-white/70 dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.06] px-3 py-2">
          <dt className="text-apple-gray text-[11px]">{k}</dt>
          <dd className="font-semibold text-apple-text dark:text-white mt-0.5">{v}</dd>
        </div>
      ))}
    </dl>

    <div>
      <p className="text-xs font-semibold text-apple-text dark:text-white mb-2">Tested before listing</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-apple-text/80 dark:text-apple-lightgray">
        {USED_PHONE_CHECKS.map((c) => (
          <li key={c} className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 stroke-[3]" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
