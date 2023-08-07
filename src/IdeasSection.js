import { Box, Text, Heading, Flex, Grid } from "theme-ui";
import { useState } from "react";

const slides = [
  {
    heading: "Concept development",
    text: "I'll work closely with your product team to crystallize your ideas into achievable visions and actionable plans.",
  },
  {
    heading: "End-to-End Design",
    text: "From wireframes to final interfaces, I cover the gamut of product design. Whether it's UX or UI, I ensure your product not only works smoothly but looks and feels engaging too.",
  },
  {
    heading: "Engineering Collaboration",
    text: "I believe in tight-knit cooperation between design and development. As an experienced front-end developer, I speak the same language as your engineers, bridging the gap to bring your product to life.",
  },
];

function IdeasSection() {
  const [counter, setCounter] = useState(0);

  const handleNextClick = () => {
    if (slides.length - 1 === counter) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  };

  return (
    <Flex p={6} sx={{ gap: 3, flexDirection: "column" }}>
      <Heading as="h2">I bring ideas to life</Heading>
      <Text>
        As your fractional product designer, I plug seamlessly into your team to
        drive the product development journey.
      </Text>
      <Grid columns="1fr 1fr" gap={3}>
        <Box p={3}>
          <Heading as="h4">{slides[counter].heading}</Heading>
          <Text>{slides[counter].text}</Text>
        </Box>
      </Grid>
      <a onClick={() => handleNextClick()}>Next</a>
    </Flex>
  );
}

export default IdeasSection;
