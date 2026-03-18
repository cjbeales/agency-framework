import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import SectionHeading from "@/components/ui/SectionHeading";
import Text from "@/components/ui/Text";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Stack from "@/components/layout/Stack";

const VARIANTS = ["primary", "secondary", "ghost"] as const;
const SIZES    = ["sm", "md", "lg"] as const;

export default function ButtonsDemo() {
  return (
    <Section variant="sm">
      <Container>
        <Stack variant="lg">
          <SectionHeading
            eyebrow="Demo"
            heading="Buttons"
            subtext="All variants and sizes rendered against the current theme."
          />

          {VARIANTS.map((variant) => (
            <Stack key={variant} variant="sm">
              <Text variant="caption">{variant}</Text>
              <div className="flex flex-wrap items-center gap-3">
                {SIZES.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {size.toUpperCase()}
                  </Button>
                ))}
              </div>
            </Stack>
          ))}

          <Divider />

          <Stack variant="sm">
            <Text variant="caption">link</Text>
            <Button variant="link">Link button →</Button>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
