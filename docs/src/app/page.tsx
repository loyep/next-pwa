import { Heading } from "@/components/Heading.js";
import { LinkUnderline } from "@/components/Link/LinkUnderline.js";

const Page = () => (
  <div className="w-full self-stretch flex items-center justify-center p-4">
    <Heading type="title">
      Welcome to Next PWA! This documentation is a WIP. To see the
      documentation,{" "}
      <LinkUnderline href="/docs/home">click here!</LinkUnderline>
    </Heading>
  </div>
);

export default Page;
