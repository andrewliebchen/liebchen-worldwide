import theme from "./theme";
import { ThemeUIProvider, Box, Text, Heading, Grid, Flex } from "theme-ui";
import IdeasSection from "./IdeasSection";
import YouTube from "react-youtube";
import Badge from "./Badge";

function App() {
  return (
    <ThemeUIProvider theme={theme}>
      <Box p={6}>
        <Heading as="h1" sx={{ fontSize: 130, textTransform: "uppercase" }}>
          Full-scale Impact, For a Fraction of the Time.
        </Heading>
      </Box>

      <Box p={6} sx={{ bg: "muted" }}>
        <Heading as="h2" mb={4} sx={{ textTransform: "uppercase" }}>
          Say hello to your first designer
        </Heading>
        <Box sx={{ width: "60%" }}>
          <Text>
            The early stages of a start-up are exciting and challenging. With an
            abundance of ideas and a paucity of resources, you need team members
            who can wear multiple hats, deliver high-quality results, and add
            value beyond their immediate role.
          </Text>
        </Box>
      </Box>

      <IdeasSection />

      <Flex p={6} sx={{ gap: 4, flexDirection: "column" }}>
        <Text>
          With over a decade of experience in crafting consumer, enterprise, and
          data-driven product experiences, from pre-money start-ups to giants
          like Meta, I bring the insight and expertise of a full-time product
          designer to your project - on a contractor basis.
        </Text>
        <Grid columns="1fr 1fr">
          <Heading as="h3" sx={{ textTransform: "uppercase" }}>
            Equity for Excellence
          </Heading>
          <Text sx={{ fontSize: 4 }}>
            I am committed to your start-up's success. As part of my unique
            approach, I accept equity in lieu of full-time salary. This ensures
            our goals are aligned, and I am as invested in your success as you
            are.
          </Text>
        </Grid>
        <Grid columns="1fr 1fr">
          <Heading as="h3" sx={{ textTransform: "uppercase" }}>
            Working with me
          </Heading>
          <Text sx={{ fontSize: 4 }}>
            I love solving hard problems and relish the chance to roll up my
            sleeves with good people. As a full-stack product designer, I am
            pragmatic, detail-oriented, and bring an open heart and mind to
            everything I do.
          </Text>
        </Grid>
      </Flex>

      <Box p={6} sx={{ bg: "primary", color: "secondary" }}>
        <Box pb={5}>
          <Heading as="h2" mb={4} sx={{ textTransform: "uppercase" }}>
            Case studies
          </Heading>
          <Text>
            Ready to make your start-up's product vision a reality? Reach out
            and let's make great things happen, together.
          </Text>
        </Box>
        <Grid columns="1fr 1fr" gap={5}>
          <Box>
            <Box pb={4}>
              <Heading as="h3" sx={{ textTransform: "uppercase" }}>
                Meta Quest App
              </Heading>
              <Text sx={{ fontSize: 4 }}>
                Within the dynamic environment of Meta, I spearheaded the
                redesign of the Quest VR headset's companion app. The focus?
                Simplifying the complex and addressing the core issues faced by
                users.
              </Text>
            </Box>
            <YouTube videoId="W3MjL7-RHSw" />
          </Box>
          <Box>
            <Box pb={4}>
              <Heading as="h3" sx={{ textTransform: "uppercase" }}>
                Watch Duty
              </Heading>
              <Text sx={{ fontSize: 4 }}>
                As the pioneer product designer for Watch Duty, a
                community-driven wildfire app, I had the exciting task of
                establishing the app's design and brand from scratch, embodying
                the spirit of unity and volunteerism.
              </Text>
            </Box>
            <YouTube videoId="GoAHRfv6ToY" />
          </Box>
        </Grid>
      </Box>

      <Box p={6} sx={{ bg: "muted" }}>
        <Heading as="h2" mb={4}>
          Ready to get started?
        </Heading>
        <Text>
          Hit me up on the email:
          <br />
          <a href="mailto:andrew@liebchen.world">andrew@liebchen.world</a>
        </Text>
      </Box>
      <Badge />
    </ThemeUIProvider>
  );
}

export default App;
