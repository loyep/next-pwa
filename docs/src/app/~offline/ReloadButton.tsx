"use client";
import { Heading } from "@/components/Heading";

export const ReloadButton = () => {
  return (
    <button
      onClick={() => window.location.reload()}
      className="ml-2 [&>span]:!my-0"
    >
      <Heading type="subtitle">Try reloading?</Heading>
    </button>
  );
};
