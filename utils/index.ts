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


export function isResponseContentJson(response: Response): boolean {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1)
    return true;
  return false;
}

// Handle HTTP errors since fetch won't.
export async function handleErrors(
  response: Response,
  acceptStatus?: number
): Promise<Response> {
  if (response.status === acceptStatus) {
    return response;
  }

  if (!response.ok) {
    if (isResponseContentJson(response)) {
      throw await response.json();
    } else {
      throw Error(`Error ${response.status}: ${response.statusText}`);
    }
  }

  return response;
}