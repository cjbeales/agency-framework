import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import SectionHeading from "@/components/ui/SectionHeading";
import Text from "@/components/ui/Text";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Stack from "@/components/layout/Stack";

const HEADINGS = [
  { variant: "display", label: "Display",  sample: "Display Heading"  },
  { variant: "h1",      label: "Heading 1", sample: "Page Title"       },
  { variant: "h2",      label: "Heading 2", sample: "Section Title"    },
  { variant: "h3",      label: "Heading 3", sample: "Subsection Title" },
  { variant: "h4",      label: "Heading 4", sample: "Card Title"       },
] as const;

const BODY = [
  { variant: "bodyLg",  label: "Body Large",  sample: "Larger body copy for intros and lead paragraphs. Reads well at scale." },
  { variant: "body",    label: "Body",         sample: "Default body copy for paragraphs, descriptions, and general content." },
  { variant: "bodySm",  label: "Body Small",   sample: "Smaller body copy for captions, meta, and supporting text." },
] as const;

const LABELS = [
  { variant: "eyebrow", label: "Eyebrow",  sample: "Section label" },
  { variant: "caption", label: "Caption",  sample: "Caption / label text" },
] as const;

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
      <span className="w-28 shrink-0 font-mono text-xs text-text-soft">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function TypographyDemo() {
  return (
    <Section variant="sm">
      <Container>
        <Stack variant="lg">
          <SectionHeading
            eyebrow="Demo"
            heading="Typography"
            subtext="Every type style in the system, labelled with its variant name."
          />

          {/* Headings */}
          <Stack variant="sm">
            <Text variant="caption">Headings</Text>
            <Stack variant="md">
              {HEADINGS.map(({ variant, label, sample }) => (
                <Row key={variant} label={label}>
                  <Heading variant={variant}>{sample}</Heading>
                </Row>
              ))}
            </Stack>
          </Stack>

          <Divider />

          {/* Body */}
          <Stack variant="sm">
            <Text variant="caption">Body</Text>
            <Stack variant="md">
              {BODY.map(({ variant, label, sample }) => (
                <Row key={variant} label={label}>
                  <Text variant={variant}>{sample}</Text>
                </Row>
              ))}
            </Stack>
          </Stack>

          <Divider />

          {/* Labels */}
          <Stack variant="sm">
            <Text variant="caption">Labels</Text>
            <Stack variant="md">
              {LABELS.map(({ variant, label, sample }) => (
                <Row key={variant} label={label}>
                  <Text variant={variant}>{sample}</Text>
                </Row>
              ))}
            </Stack>
          </Stack>

        </Stack>
      </Container>
    </Section>
  );
}
