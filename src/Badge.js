import { Heading, Box, Flex, Text, Image } from "theme-ui";
import Topper from "./images/BadgeTopper.svg";
import { useEffect, useState } from "react";

const photoSize = "6.5rem";

function Badge() {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    var checkScrollSpeed = (function (settings) {
      settings = settings || {};

      var lastPos,
        newPos,
        timer,
        delta,
        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

      function clear() {
        lastPos = null;
        delta = 0;
      }

      clear();

      return function () {
        newPos = window.scrollY;
        if (lastPos != null) {
          delta = newPos - lastPos;
        }
        lastPos = newPos;
        clearTimeout(timer);
        timer = setTimeout(clear, delay);
        return delta;
      };
    })();

    // listen to "scroll" event
    window.onscroll = function () {
      setSpeed(checkScrollSpeed());
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        right: "4rem",
        top: "4rem",
        transform: `rotate(${speed * 0.5 + 5}deg)`,
        transition: "250ms",
        transformOrigin: "top center",
        zIndex: 999,
      }}
    >
      <Flex
        py={5}
        px={3}
        sx={{
          width: "10rem",
          height: "15rem",
          bg: "background",
          borderRadius: 20,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          border: "10px solid #CCCDFF",
        }}
      >
        <Heading
          as="h2"
          align="center"
          sx={{ fontSize: 5, textTransform: "uppercase", fontWeight: 500 }}
        >
          Andrew Liebchen
        </Heading>
        <Text align="center" mt={1} sx={{ fontSize: 2 }}>
          Fractional Product Designer
        </Text>
        <Box
          sx={{
            mt: 3,
            width: photoSize,
            height: photoSize,
            bg: "primary",
            borderRadius: photoSize,
            flex: "0 0 auto",
          }}
        ></Box>
      </Flex>
      <Image
        src={Topper}
        sx={{
          position: "absolute",
          top: "1.5rem",
          left: "50%",
          transform: "translate3d(-50%, -100%, 0)",
        }}
      />
    </Box>
  );
}

export default Badge;
