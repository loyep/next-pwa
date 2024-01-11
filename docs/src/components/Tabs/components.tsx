"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useId, useState } from "react";

import { clsx } from "@/utils/clsx.js";

const TABS_ID_PREFIX = "npwa-docs-tabs";

export interface TabsValue {
  value: string | undefined;
  keyPrefix: string | undefined;
  setValue(newValue: string | undefined): void;
}

const TabsContext = createContext<TabsValue>({
  value: undefined,
  keyPrefix: undefined,
  setValue() {
    // do nothing
  },
});

const useTabsContext = () => {
  const result = useContext(TabsContext);
  if (!result) {
    throw new Error("Please wrap the component inside TabsContext.Provider.");
  }
  return result;
};

export const TabsRoot = ({
  children,
  initialValue,
}: {
  children: ReactNode;
  initialValue: Omit<TabsValue, "setValue" | "keyPrefix">;
}) => {
  const [value, setValue] = useState<TabsValue["value"]>(initialValue.value);
  const keyPrefix = useId();
  return (
    <TabsContext.Provider
      value={{
        value,
        keyPrefix,
        setValue(newValue) {
          setValue(newValue ?? initialValue.value);
        },
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export const TabsContent = ({
  children,
  value,
}: {
  children: ReactNode;
  value: string | undefined;
}) => {
  const { value: contextValue, keyPrefix } = useTabsContext();
  const isSelected = contextValue !== value;
  return (
    <div
      id={`${TABS_ID_PREFIX}-${keyPrefix}-content-${value}`}
      className={clsx(isSelected && "hidden")}
      role="tabpanel"
      aria-labelledby={`${TABS_ID_PREFIX}-${keyPrefix}-trigger-${value}`}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({
  value,
  children,
}: {
  value: string | undefined;
  children: ReactNode;
}) => {
  const { keyPrefix, value: contextValue, setValue: setContextValue } = useTabsContext();
  const isSelected = contextValue === value;
  return (
    <button
      type="button"
      id={`${TABS_ID_PREFIX}-${keyPrefix}-trigger-${value}`}
      onClick={() => setContextValue(value)}
      data-tab-state={isSelected}
      aria-controls={`${TABS_ID_PREFIX}-${keyPrefix}-content-${value}`}
    >
      {children}
    </button>
  );
};

export const TabsList = ({
  titles,
  children,
}: {
  titles: (string | undefined)[];
  children: ReactNode[];
}) => {
  return (
    <>
      {titles.map((title, i) => (
        <TabsTrigger key={title} value={title}>
          {children[i]}
        </TabsTrigger>
      ))}
    </>
  );
};
