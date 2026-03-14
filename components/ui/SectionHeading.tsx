import classNames from "classnames";
import Heading from "./Heading";
import Text from "./Text";

type HeadingVariant = "h1" | "h2" | "h3" | "h4";

export type SectionHeadingProps = {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  headingVariant?: HeadingVariant;
  alignment?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  heading,
  subtext,
  headingVariant = "h2",
  alignment = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={classNames(
        "flex flex-col gap-3",
        alignment === "center" && "text-center items-center",
        className
      )}
    >
      {eyebrow && (
        <Text variant="eyebrow" as="span">
          {eyebrow}
        </Text>
      )}
      <Heading variant={headingVariant}>{heading}</Heading>
      {subtext && (
        <Text
          variant="bodyLg"
          as="p"
          className={alignment === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"}
        >
          {subtext}
        </Text>
      )}
    </div>
  );
}
