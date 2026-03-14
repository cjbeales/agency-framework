import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Projects",
  description: "Explore our portfolio of work.",
};

export default function ProjectsPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          heading="Projects"
          subtext="A selection of our recent work."
        />
      </Container>
    </Section>
  );
}
