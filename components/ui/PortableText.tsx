import { PortableText as BasePortableText } from "next-sanity";
import { coreStyles } from "@/styles";

export type PortableTextProps = {
  value: React.ComponentProps<typeof BasePortableText>["value"];
  className?: string;
};

const components = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className={coreStyles.typography.h2}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className={coreStyles.typography.h3}>{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className={coreStyles.typography.h4}>{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className={coreStyles.typography.body}>{children}</p>
    ),
  },
};

export default function PortableText({ value, className }: PortableTextProps) {
  if (!value) return null;

  return (
    <div className={className ?? coreStyles.typography.prose}>
      <BasePortableText value={value} components={components} />
    </div>
  );
}
