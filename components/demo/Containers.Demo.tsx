import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import SectionHeading from "@/components/ui/SectionHeading";
import Text from "@/components/ui/Text";
import Container from "@/components/layout/Container";
import type { ContainerProps } from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import Stack from "@/components/layout/Stack";

// ─── Container size demos ─────────────────────────────────────────────────────

const CONTAINER_SIZES: {
  variant: ContainerProps["variant"];
  label: string;
  maxWidth: string;
}[] = [
  { variant: "narrow",  label: "narrow",  maxWidth: "760px"  },
  { variant: "default", label: "default", maxWidth: "1200px" },
  { variant: "wide",    label: "wide",    maxWidth: "1400px" },
];

function ContentSplit() {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
      <div className="relative aspect-[4/3] overflow-hidden rounded-image">
        <Image
          src="https://picsum.photos/seed/split/800/600"
          alt="Content section image"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <Stack variant="md">
        <Text variant="eyebrow">Eyebrow label</Text>
        <Heading variant="h3">Section heading sits here</Heading>
        <Text variant="body">
          Supporting body copy that gives context and draws the reader toward
          the call to action. This paragraph stays consistent across all sizes
          so you can judge readability at each width.
        </Text>
        <div>
          <Button variant="primary" size="md">Call to action</Button>
        </div>
      </Stack>
    </div>
  );
}

// ─── Card demos ───────────────────────────────────────────────────────────────

const CARD_VARIANTS: {
  variant: "base" | "interactive" | "soft" | "dark";
  label: string;
  description: string;
}[] = [
  { variant: "base",        label: "base",        description: "Default bordered card." },
  { variant: "interactive", label: "interactive",  description: "Lifts on hover — for clickable cards." },
  { variant: "soft",        label: "soft",         description: "No border, muted background." },
  { variant: "dark",        label: "dark",         description: "Inverse surface for contrast blocks." },
];

function CardSample({
  variant,
  label,
  description,
}: {
  variant: "base" | "interactive" | "soft" | "dark";
  label: string;
  description: string;
}) {
  const isDark = variant === "dark";
  return (
    <Card variant={variant}>
      <Stack variant="sm">
        <Text variant="caption" className={isDark ? "text-text-inverse opacity-60" : undefined}>
          {label}
        </Text>
        <Heading variant="h4" className={isDark ? "text-text-inverse" : undefined}>
          Card title
        </Heading>
        <Text variant="bodySm" className={isDark ? "text-text-inverse opacity-75" : undefined}>
          {description}
        </Text>
      </Stack>
    </Card>
  );
}

// ─── Badge demos ──────────────────────────────────────────────────────────────

const BADGE_VARIANTS: { variant: "base" | "brand"; label: string; sample: string }[] = [
  { variant: "base",  label: "base",  sample: "Tag" },
  { variant: "brand", label: "brand", sample: "Featured" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContainersDemo() {
  return (
    <>
      {/* ── Container widths ── */}
      <Section variant="sm">
        <Container>
          <SectionHeading
            eyebrow="Demo"
            heading="Containers"
            subtext="The same 50/50 split section at each container width. Resize the window to see how each behaves."
          />
        </Container>
      </Section>

      {CONTAINER_SIZES.map(({ variant, label, maxWidth }, i) => (
        <div key={label}>
          {i > 0 && <Divider />}

          {/* Width label */}
          <div className="border-b border-dashed border-border bg-surface-muted py-2">
            <Container>
              <Text variant="caption">
                Container variant=&quot;{label}&quot; — max-width: {maxWidth}
              </Text>
            </Container>
          </div>

          <Section variant="sm">
            <Container variant={variant}>
              <ContentSplit />
            </Container>
          </Section>
        </div>
      ))}

      <Divider />

      {/* ── Cards ── */}
      <Section variant="sm">
        <Container>
          <Stack variant="lg">
            <Stack variant="sm">
              <Text variant="caption">Cards</Text>
              <Grid cols={1} colsMd={2} colsLg={4}>
                {CARD_VARIANTS.map(({ variant, label, description }) => (
                  <CardSample
                    key={variant}
                    variant={variant}
                    label={label}
                    description={description}
                  />
                ))}
              </Grid>
            </Stack>

            <Divider />

            {/* ── Badges ── */}
            <Stack variant="sm">
              <Text variant="caption">Badges</Text>
              <div className="flex flex-wrap gap-6">
                {BADGE_VARIANTS.map(({ variant, label, sample }) => (
                  <Stack key={variant} variant="sm" className="items-start">
                    <Text variant="caption" className="text-text-soft">{label}</Text>
                    <Badge variant={variant}>{sample}</Badge>
                  </Stack>
                ))}
              </div>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
