import DemoShell from "@/components/demo/DemoShell";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Stack from "@/components/layout/Stack";

export const metadata = {
  title: "UI Demo",
  description: "Live reference for all design system components.",
};

export default function DemoPage() {
  return (
    <>
      <Section variant="sm">
        <Container>
          <Stack variant="sm">
            <Heading variant="h1">UI Demo</Heading>
            <Text variant="bodyLg">
              Live reference for all design system components. Use the filters
              to isolate a category, or view everything at once.
            </Text>
          </Stack>
        </Container>
      </Section>

      <DemoShell />
    </>
  );
}
