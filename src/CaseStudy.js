import { Flex, Box, Heading, Text } from "theme-ui";
import YouTube from "react-youtube";

function CaseStudy(props) {
  return (
    <Flex sx={{ flexDirection: "column", gap: 3 }}>
      <Flex
        sx={{
          justifyContent: "center",
          alignItems: "center",
          bg: "rgba(0, 0, 0, 0.6)",
          p: 3,
          borderRadius: 40,
          mb: 3,
        }}
      >
        <YouTube
          videoId={props.videoId}
          style={{ display: "flex", borderRadius: 10, overflow: "hidden" }}
        />
      </Flex>
      <Box>
        <Heading as="h3" mb={1}>
          {props.title}
        </Heading>
        <Text sx={{ mb: 3 }}>{props.subtitle}</Text>
      </Box>
      <Text sx={{ fontSize: 4 }}>{props.text}</Text>
    </Flex>
  );
}

export default CaseStudy;
