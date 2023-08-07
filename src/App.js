import theme from "./theme";
import { ThemeUIProvider, Box, Text, Heading } from "theme-ui";
import IdeasSection from "./IdeasSection";

function App() {
  return (
    <ThemeUIProvider theme={theme}>
      <Box p={6}>
        <Heading as="h1">
          Full-scale Impact, For A Fraction of the Time.
        </Heading>
      </Box>

      <Box p={6}>
        <Heading as="h2">Say hello to your first designer</Heading>
        <Text>
          The early stages of a start-up are exciting and challenging. With an
          abundance of ideas and a paucity of resources, you need team members
          who can wear multiple hats, deliver high-quality results, and add
          value beyond their immediate role.
        </Text>
      </Box>

      <IdeasSection />

      <Box p={6}>
        <Text>
          With over a decade of experience in crafting consumer, enterprise, and
          data-driven product experiences, from pre-money start-ups to giants
          like Meta, I bring the insight and expertise of a full-time product
          designer to your project - on a contractor basis.
        </Text>
        <Heading as="h3">Equity for Excellence</Heading>
        <Text>
          I am committed to your start-up's success. As part of my unique
          approach, I accept equity in lieu of full-time salary. This ensures
          our goals are aligned, and I am as invested in your success as you
          are.
        </Text>
        <Heading as="h3">Working with me</Heading>
        <Text>
          I love solving hard problems and relish the chance to roll up my
          sleeves with good people. As a full-stack product designer, I am
          pragmatic, detail-oriented, and bring an open heart and mind to
          everything I do.
        </Text>
      </Box>

      <Box p={6}>
        <Heading as="h2">Case studies</Heading>
        <Text>
          Ready to make your start-up's product vision a reality? Reach out and
          let's make great things happen, together.
        </Text>
        <Box>
          <Box>
            <Heading as="h3">Meta Quest App</Heading>
            <Text>
              Within the dynamic environment of Meta, I spearheaded the redesign
              of the Quest VR headset's companion app. The focus? Simplifying
              the complex and addressing the core issues faced by users.
            </Text>
          </Box>
          <Box>
            <Heading as="h3">Watch Duty</Heading>
            <Text>
              Within the dynamic environment of Meta, I spearheaded the redesign
              of the Quest VR headset's companion app. The focus? Simplifying
              the complex and addressing the core issues faced by users.
            </Text>
            >
          </Box>
        </Box>
      </Box>

      <Box p={6}>
        <Heading as="h2">Ready to get started?</Heading>
        <Text>
          Hit me up on email:
          <br />
          <a href="mailto:andrew@liebchen.world">andrew@liebchen.world</a>
        </Text>
      </Box>
    </ThemeUIProvider>
  );
}

export default App;
