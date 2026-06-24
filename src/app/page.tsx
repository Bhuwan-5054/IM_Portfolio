"use client";

import { useState } from "react";
import IntroSequence from "@/components/intro/IntroSequence";
import GateScreen from "@/components/gate/GateScreen";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <main>
      {!introDone ? (
        <IntroSequence onComplete={() => setIntroDone(true)} />
      ) : (
        <GateScreen />
      )}
    </main>
  );
}
