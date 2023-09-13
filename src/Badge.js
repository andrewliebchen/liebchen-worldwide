import { Heading, Box, Flex, Text, Image } from "theme-ui";
import Topper from "./images/BadgeTopper.svg";
import { useEffect, useState } from "react";
import Headshot from "./images/Headshot.png";
import LogoMask from "./images/LogoMask.svg";

const settings = {
  height: "15rem",
  width: "10.5rem",
  photoSize: "7.5rem",
  top: "4rem",
  right: "4rem",
  hologramSize: "2.5rem",
  transition: "500ms",
};

const checkScrollSpeed = (function (settings) {
  settings = settings || {};

  let lastPos,
    newPos,
    timer,
    delta,
    delay = 200; // in "ms" (higher means lower fidelity )

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
    return { delta: delta, newPos: newPos };
  };
})();

function Badge() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // listen to "scroll" event
    window.onscroll = function () {
      // Calcuate rotate and store
      const scrollSpeed = checkScrollSpeed();

      if (scrollSpeed.newPos < 1) {
        setRotation(-5);
      } else {
        setRotation(scrollSpeed.delta * -1);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        right: settings.right,
        top: settings.top,
        transform: `rotate(${rotation}deg)`,
        transition: settings.transition,
        transformOrigin: "50% -20%",
        zIndex: 999,
      }}
    >
      <Flex
        sx={{
          width: settings.width,
          height: settings.height,
          p: 3,
          pt: 5,
          pb: 5,
          bg: "background",
          borderRadius: 20,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          border: "10px solid rgba(0, 0, 0, 0.1)",
          boxShadow: `0px 8px 19px 0px rgba(0, 0, 0, 0.20), 
                      0px 34px 34px 0px rgba(0, 0, 0, 0.17), 
                      0px 76px 46px 0px rgba(0, 0, 0, 0.10), 
                      0px 135px 54px 0px rgba(0, 0, 0, 0.03), 
                      0px 211px 59px 0px rgba(0, 0, 0, 0.00), 
                      0px 1px 4px 0px rgba(0, 0, 0, 0.1),
                      0px -10px 20px 0px rgba(255, 255, 255, 1) inset`,
        }}
      >
        <Flex sx={{ flexDirection: "column", gap: 2 }}>
          <Heading as="h2" align="center" sx={{ fontSize: 5, fontWeight: 500 }}>
            Andrew Liebchen
          </Heading>
          <Text align="center" sx={{ fontSize: 2 }}>
            Fractional Product Designer
          </Text>
        </Flex>
        <Image
          src={Headshot}
          sx={{
            size: settings.photoSize,
            borderRadius: settings.photoSize,
            flex: "0 0 auto",
          }}
        />
        <Box
          sx={{
            mask: `url(${LogoMask})`,
            position: "absolute",
            bottom: "1.25rem",
            right: "1.25rem",
            size: settings.hologramSize,
            borderRadius: settings.hologramSize,
            transform: "rotate(5deg)",
          }}
        >
          <Box
            sx={{
              background:
                "conic-gradient(from 180deg at 50% 50%, rgba(255, 255, 255, 0.72) 16.875deg, #000 88.12500178813934deg, rgba(255, 255, 255, 0.72) 151.875deg, #000 225deg, rgba(255, 255, 255, 0.72) 288.7499928474426deg, #000 360deg), conic-gradient(from 180deg at 50% 50%, #FFF 30.00000089406967deg, #000 95.625deg, #FFF 168.75deg, #000 228.75000715255737deg, #FFF 285.0000071525574deg, #000 360deg), radial-gradient(92.48% 91.85% at 10.11% 28.24%, #FB876E 7.61%, #42FFD2 35.14%, #42D2FF 63.45%, #42A4FF 100%), url(https://grainy-gradients.vercel.app/noise.svg)",
              backgroundBlendMode: "screen, difference, normal",
              transform: `rotate(${rotation * -3}deg)`,
              transition: settings.transition,
              size: settings.hologramSize,
            }}
          />
        </Box>
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
