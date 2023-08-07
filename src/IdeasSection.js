import { Box, Text, Heading } from "theme-ui";

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
  return (
    <Box p={6}>
      <Heading as="h2">I bring ideas to life</Heading>
      <Text>
        As your fractional product designer, I plug seamlessly into your team to
        drive the product development journey.
      </Text>
      <Box>
        {slides.map((slide, i) => (
          <Box index={i}>
            <Heading as="h4">{slide.heading}</Heading>
            <Text>{slide.text}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default IdeasSection;
