import theme from "./theme";
import { ThemeUIProvider, Box, Text, Heading, Flex } from "theme-ui";
import YouTube from "react-youtube";
import Badge from "./Badge";

function App() {
  return (
    <ThemeUIProvider theme={theme}>
      <Flex sx={{ maxWidth: "50vw", m: 6, flexDirection: "column", gap: 5 }}>
        <Box>
          <Heading as="h1" sx={{ mb: 3, fontSize: 120 }}>
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
          <Heading as="h2" mb={3}>
            That’s where I come in...
          </Heading>
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
        <Flex sx={{ flexDirection: "column", gap: 4 }}>
          <Heading as="h2">What I bring to the table</Heading>
          <Box>
            <Text as="h3" sx={{ fontWeight: "bold" }}>
              I'm a full-stack product designer
            </Text>
            <Text>
              With a background in architecture and front-end development, I
              don't just design; I bring ideas to life. From concept to code,
              consider it done.
            </Text>
          </Box>
          <Box>
            <Text as="h3" sx={{ fontWeight: "bold" }}>
              Collaboration is core to how I work
            </Text>
            <Text>
              I don't work in a silo. I team up with your engineers, product
              managers, and stakeholders. Solving hard problems is hard, so I
              bring an open heart and open mind to every meeting and mockup.
            </Text>
          </Box>
          <Box>
            <Text as="h3" sx={{ fontWeight: "bold" }}>
              I care about people
            </Text>
            <Text>
              I'm motivated by great people on great teams doing great work. I
              love to solve product problems that will have real impact on real
              people's lives.
            </Text>
          </Box>
        </Flex>
        <Flex sx={{ flexDirection: "column", gap: 4 }}>
          <Heading as="h2">Case studies</Heading>
          <Box>
            <Text as="h3" sx={{ fontWeight: "bold" }}>
              Meta Quest: Your bridge to the Metaverse
            </Text>
            <YouTube videoId="W3MjL7-RHSw" />
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
            <Text as="h3" sx={{ fontWeight: "bold" }}>
              Watch Duty: The trusted companion for wildfire awareness
            </Text>
            <YouTube videoId="GoAHRfv6ToY" />
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
        </Flex>
        <Badge />
      </Flex>
    </ThemeUIProvider>
  );
}

export default App;
