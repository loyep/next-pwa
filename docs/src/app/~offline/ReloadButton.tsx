"use client";
import { Heading } from "@/components/Heading";

export const ReloadButton = () => {
  return (
    <button onClick={() => window.location.reload()} className="ml-2 [&>span]:!my-0" type="button">
      <Heading type="subtitle">Try reloading?</Heading>
    </button>
  );
};
