import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Stack from "@/components/layout/Stack";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "About Us",
  description: "Learn more about our team and mission.",
};

export default function AboutUsPage() {
  return (
    <Section>
      <Container>
        <Stack variant="lg">
          <SectionHeading
            eyebrow="About"
            heading="About Us"
            subtext="Get to know our team and what drives us."
          />

          <Divider />

          <Stack variant="sm">
            <p className="text-sm font-semibold uppercase tracking-widest text-text-soft">
              Primary
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
            </div>
          </Stack>

          <Divider />

          <Stack variant="sm">
            <p className="text-sm font-semibold uppercase tracking-widest text-text-soft">
              Secondary
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Secondary</Button>
            </div>
          </Stack>

          <Divider />

          <Stack variant="sm">
            <p className="text-sm font-semibold uppercase tracking-widest text-text-soft">
              Ghost
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="ghost"><div>Icon here</div>Ghost!!</Button>
            </div>
          </Stack>

          <Divider />

          <Stack variant="sm">
            <p className="text-sm font-semibold uppercase tracking-widest text-text-soft">
              Link
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="link">Link</Button>
            </div>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
