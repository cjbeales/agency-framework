import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import SectionHeading from "@/components/ui/SectionHeading";
import Text from "@/components/ui/Text";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import Stack from "@/components/layout/Stack";

export const metadata = {
  title: "About Us",
  description: "Learn more about our team and mission.",
};

const team = [
  { id: 1, name: "Alex Carter",   role: "Creative Director", img: "https://picsum.photos/seed/team1/400/400" },
  { id: 2, name: "Jamie Okafor",  role: "Lead Developer",    img: "https://picsum.photos/seed/team2/400/400" },
  { id: 3, name: "Morgan Ellis",  role: "Strategy Lead",     img: "https://picsum.photos/seed/team3/400/400" },
];

const projects = [
  { id: 1, title: "Brand Refresh",    category: "Branding",   img: "https://picsum.photos/seed/proj1/800/500" },
  { id: 2, title: "E-Commerce Site",  category: "Web Design", img: "https://picsum.photos/seed/proj2/800/500" },
  { id: 3, title: "Campaign Visuals", category: "Marketing",  img: "https://picsum.photos/seed/proj3/800/500" },
];

export default function AboutUsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <Stack variant="lg">
            <SectionHeading
              eyebrow="About"
              heading="We build things that work."
              subtext="A small, focused studio crafting digital products for ambitious clients."
            />
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Start a project</Button>
              <Button variant="secondary">See our work</Button>
            </div>
          </Stack>
        </Container>
      </Section>

      <Divider />

      {/* ── Stats — tests card variants ──────────────────────────────────── */}
      <Section variant="sm">
        <Container>
          <Grid cols={2} colsMd={4}>
            <Card variant="soft">
              <Stack variant="sm">
                <Heading variant="h2">12+</Heading>
                <Text variant="bodySm">Years of experience</Text>
              </Stack>
            </Card>
            <Card variant="soft">
              <Stack variant="sm">
                <Heading variant="h2">80+</Heading>
                <Text variant="bodySm">Projects delivered</Text>
              </Stack>
            </Card>
            <Card variant="soft">
              <Stack variant="sm">
                <Heading variant="h2">98%</Heading>
                <Text variant="bodySm">Client satisfaction</Text>
              </Stack>
            </Card>
            <Card variant="dark">
              <Stack variant="sm">
                <Heading variant="h2" className="text-text-inverse">5★</Heading>
                <Text variant="bodySm" className="text-text-inverse opacity-80">Average review</Text>
              </Stack>
            </Card>
          </Grid>
        </Container>
      </Section>

      <Divider />

      {/* ── Team — tests rounded-card + next/image ───────────────────────── */}
      <Section>
        <Container>
          <Stack variant="lg">
            <SectionHeading
              eyebrow="Our team"
              heading="The people behind the work"
            />
            <Grid cols={1} colsMd={2} colsLg={3}>
              {team.map((member) => (
                <Card key={member.id} variant="base" className="overflow-hidden !p-0">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <Stack variant="sm">
                      <Heading variant="h4">{member.name}</Heading>
                      <Text variant="bodySm">{member.role}</Text>
                    </Stack>
                  </div>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      <Divider />

      {/* ── Projects — tests rounded-image via Card variant="project" ───── */}
      <Section>
        <Container>
          <Stack variant="lg">
            <SectionHeading
              eyebrow="Recent work"
              heading="Selected projects"
            />
            <Grid cols={1} colsMd={2} colsLg={3}>
              {projects.map((project) => (
                <Card key={project.id} variant="project">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <Stack variant="sm">
                      <Badge variant="brand">{project.category}</Badge>
                      <Heading variant="h4">{project.title}</Heading>
                      <Button variant="link">View case study →</Button>
                    </Stack>
                  </div>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      <Divider />

      {/* ── Button reference — tests all variants + sizes ────────────────── */}
      <Section variant="sm">
        <Container>
          <Stack variant="lg">
            <SectionHeading
              eyebrow="Style reference"
              heading="Buttons"
              subtext="All variants and sizes rendered against the current theme."
            />
            {(["primary", "secondary", "ghost"] as const).map((variant) => (
              <Stack key={variant} variant="sm">
                <Text variant="caption">{variant}</Text>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant={variant} size="sm">Small</Button>
                  <Button variant={variant} size="md">Medium</Button>
                  <Button variant={variant} size="lg">Large</Button>
                </div>
              </Stack>
            ))}
            <Stack variant="sm">
              <Text variant="caption">link</Text>
              <Button variant="link">Link button →</Button>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
