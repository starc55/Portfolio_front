import { useEffect } from "react";

const TidioChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/kwm0daurpotwz4karef998dkvbxvttzg.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TidioChat;
