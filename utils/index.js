
import React from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: 1200, 
    height: 800,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  React.useEffect(() => {

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}
