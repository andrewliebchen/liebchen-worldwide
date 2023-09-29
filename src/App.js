import theme from "./theme";
import { ThemeUIProvider, Box, Text, Heading, Grid, Flex } from "theme-ui";
import IdeasSection from "./IdeasSection";
import YouTube from "react-youtube";
import Badge from "./Badge";

function App() {
  return (
    <ThemeUIProvider theme={theme}>
      <Flex sx={{ maxWidth: "50vw", m: 6, flexDirection: "column", gap: 5 }}>
        <Box>
          <Heading as="h1" mb={3}>
            Hi there, startup founder!
          </Heading>
          <Text>
            I get it, running a startup is exhilarating but tough. You've got a
            world-changing idea, a core team of believers, but you're still
            missing one thing: a reliable, experienced product designer who can
            get stuff done without draining your limited resources.
          </Text>
        </Box>
        <Box>
          <Heading as="h2">That’s where I come in!</Heading>
          <Text>
            I've spent more than a decade designing stellar products for
            companies ranging from bootstrapped startups to giants like Meta.
            I'm here to offer you all that expertise on a fractional basis.
          </Text>
          <Text>
            What does that mean? I give you the full spectrum of product design
            services you need, without the full-time commitment. Plus, a slice
            of equity makes us partners—your success is my success.
          </Text>
        </Box>
        <Flex sx={{ flexDirection: "column", gap: 3 }}>
          <Heading as="h2">What I bring to the table</Heading>
          <Box>
            <Heading as="h3">Full-stack product design</Heading>
            <Text>
              With a background in architecture and front-end development, I
              don't just design; I bring ideas to life. From concept to code,
              consider it done.
            </Text>
          </Box>
          <Box>
            <Heading as="h3">Collaboration at its finest</Heading>
            <Text>
              I don't work in a silo. I team up with your product managers,
              engineers, and stakeholders. I love solving hard problems with
              good people, and I bring an open heart and open mind to everything
              I do.
            </Text>
          </Box>
          <Box>
            <Heading as="h3">Attention to detail</Heading>
            <Text>
              I sweat the small stuff so you don’t have to. With me, your
              product won't just work; it will delight.
            </Text>
          </Box>
        </Flex>
        <Box>
          <Heading as="h2">Case studies</Heading>
          <Box>
            <Heading as="h3">Meta Quest: Your bridge to the Metaverse</Heading>
            <Text>
              I led the design for the Meta Quest app during Facebook's
              metamorphosis into Meta. The challenge? Make this app a must-have
              for Oculus users while ramping up in-app revenue. The result? A
              revamped landing page that solved real user pain points, fostering
              social connections and preventing battery-induced FOMO. All this
              while moving the needle on key metrics like retention and user
              engagement. That's the power of design driven by real human needs.
            </Text>
          </Box>
          <Box>
            <Heading as="h3">
              Watch Duty The trusted companion for wildfire awareness
            </Heading>
            <Text>
              When wildfires blaze through California, having accurate, timely
              information can be a lifesaver—literally. That's where Watch Duty
              comes in. I worked closely with a technical founder and a team of
              volunteers to create an app that's become a go-to resource for
              homeowners and first responders alike. From the map interface to
              containment icons, I poured my design skills into making this app
              as intuitive and helpful as possible. Because when you're in a
              high-stress situation, the last thing you should worry about is
              navigating an app.
            </Text>
          </Box>
        </Box>
        <Badge />
      </Flex>
    </ThemeUIProvider>
  );
}

export default App;
