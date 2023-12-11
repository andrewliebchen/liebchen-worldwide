import theme from "./theme";
import { ThemeUIProvider, Box, Text, Heading, Flex, Link } from "theme-ui";
import Badge from "./Badge";
import CaseStudy from "./CaseStudy";

function App() {
  return (
    <ThemeUIProvider theme={theme}>
      <Flex sx={{ maxWidth: "50vw", m: 6, flexDirection: "column", gap: 6 }}>
        <Box>
          <Heading as="h1" sx={{ mb: 3, fontSize: 120 }}>
            Hi there, startup founder!
          </Heading>
          <Text>
            I get it, running a startup is exhilarating but tough. You've got a
            world-changing idea and a core team of believers. You're still
            missing one thing &#8212; a reliable, experienced product designer
            who can get stuff done without draining your limited resources.
          </Text>
        </Box>
        <Box>
          <Box mb={5}>
            <Heading as="h2" sx={{ fontSize: 7, mb: 3 }}>
              That’s where I come in...
            </Heading>
            <Text>
              I've spent more than a decade designing stellar products for
              companies ranging from bootstrapped startups to giants like Meta.
              I'm here to offer you all that expertise on a fractional basis.
            </Text>
          </Box>
          <Box>
            <Heading as="h3" mb={3}>
              What does that mean?
            </Heading>
            <Text>
              I give you the full spectrum of product design services you need,
              without the full-time commitment. Plus, a slice of equity makes us
              partners—your success is my success.
            </Text>
          </Box>
        </Box>
        <Flex sx={{ flexDirection: "column", gap: 4 }}>
          <Heading as="h2" sx={{ fontSize: 7, mb: 3 }}>
            What I bring to the table?
          </Heading>
          <Box>
            <Heading as="h3" mb={3}>
              I'm a full-stack product designer
            </Heading>
            <Text>
              With a background in architecture and front-end development, I
              don't just design; I bring ideas to life. From concept to code,
              consider it done.
            </Text>
          </Box>
          <Box>
            <Heading as="h3" mb={3}>
              Collaboration is core to how I work
            </Heading>
            <Text>
              I don't work in a silo. I team up with your engineers, product
              managers, and stakeholders. Solving hard problems is hard, so I
              bring an open heart and open mind to every meeting and mockup.
            </Text>
          </Box>
          <Box>
            <Heading as="h3" mb={3}>
              I care about people
            </Heading>
            <Text>
              I'm motivated by great people on great teams doing great work. I
              love to solve product problems that will have real impact on real
              people's lives.
            </Text>
          </Box>
        </Flex>
        <Flex sx={{ flexDirection: "column", gap: 4 }}>
          <Heading as="h2" sx={{ fontSize: 7, mb: 3 }}>
            Case studies
          </Heading>
          <Flex sx={{ flexDirection: "column", gap: 5 }}>
            <CaseStudy
              title="Meta Quest"
              subtitle="Your bridge to the Metaverse"
              text="I led the design for the Meta Quest app during Facebook's
              metamorphosis into Meta. The challenge? Make this app a must-have
              for Oculus users while ramping up in-app revenue. The result? A
              revamped landing page that solved real user pain points, fostering
              social connections and preventing battery-induced FOMO. All this
              while moving the needle on key metrics like retention and user
              engagement. That's the power of design driven by real human needs."
              videoId="W3MjL7-RHSw"
            />
            <CaseStudy
              title="Watch Duty"
              subtitle="The trusted companion for wildfire awareness"
              text="When wildfires blaze through California, having accurate, timely
              information can be a lifesaver—literally. That's where Watch Duty
              comes in. I worked closely with a technical founder and a team of
              volunteers to create an app that's become a go-to resource for
              homeowners and first responders alike. From the map interface to
              containment icons, I poured my design skills into making this app
              as intuitive and helpful as possible. Because when you're in a
              high-stress situation, the last thing you should worry about is
              navigating an app."
              videoId="GoAHRfv6ToY"
            />
          </Flex>
        </Flex>
        <Flex sx={{ flexDirection: "column" }}>
          <Heading as="h2" sx={{ fontSize: 7, mb: 3 }}>
            Ready to get started?
          </Heading>
          <Text>
            Let's chat! Shoot me an{" "}
            <Link href="mailto:andrewliebchen@gmail.com&subject=Let's work together">
              email
            </Link>{" "}
            or{" "}
            <Link
              href="https://calendly.com/andrewliebchen/25min"
              target="_blank"
            >
              schedule
            </Link>{" "}
            some time.
          </Text>
        </Flex>
        <Badge />
      </Flex>
    </ThemeUIProvider>
  );
}

export default App;
