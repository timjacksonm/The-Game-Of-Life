import { useEffect, useState } from "react";
import Game from "./_game";

export default function GameHome() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) return <div>loading...</div>;

    return <main><Game /></main>;
  }
  