"use client";

import React, { useMemo, useState } from "react";
import { calculateScore, examples, InitiativePanel } from "./InitiativePanel";

export const RicedCalculator = () => {
  const [initiativeA, setInitiativeA] = useState(examples.prosemirror);
  const [initiativeB, setInitiativeB] = useState(examples.aiWriting);

  const scoreA = calculateScore(initiativeA);
  const scoreB = calculateScore(initiativeB);

  const recommendation = useMemo(() => {
    const winner = scoreA > scoreB ? "A" : scoreB > scoreA ? "B" : "tie";
    if (winner === "tie")
      return "Both initiatives score similarly - consider capacity and strategic alignment.";

    const scoreDiff = Math.abs(scoreA - scoreB);
    const winnerName = winner === "A" ? initiativeA.name : initiativeB.name;

    if (scoreDiff > 5) {
      return `Clear priority: ${winnerName} scores significantly higher and should likely be prioritized.`;
    } else if (scoreDiff > 2) {
      return `${winnerName} has a moderate priority advantage - consider other factors like team capacity and strategic timing.`;
    } else {
      return `Close call - both initiatives have similar priority scores. Consider strategic fit and available resources.`;
    }
  }, [initiativeA, initiativeB]);

  return (
    <div className="mx-auto max-w-6xl rounded-lg p-6">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold">RICE+D Calculator</h2>
        <p>
          Compare initiatives using reach, impact, confidence, effort, and cost
          of delay
        </p>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <InitiativePanel
          initiative={initiativeA}
          score={scoreA}
          onUpdate={(field, value) =>
            setInitiativeA((prev) => ({ ...prev, [field]: value }))
          }
          onLoadExample={(key) => setInitiativeA(examples[key])}
        />

        <InitiativePanel
          initiative={initiativeB}
          score={scoreB}
          onUpdate={(field, value) =>
            setInitiativeB((prev) => ({ ...prev, [field]: value }))
          }
          onLoadExample={(key) => setInitiativeB(examples[key])}
        />
      </div>

      <div className="rounded-lg border bg-white p-4">
        <h3 className="mb-2 font-semibold">Recommendation</h3>
        <p className="text-sm">{recommendation}</p>

        <div className="mt-2 text-xs">
          Score difference: {Math.abs(scoreA - scoreB).toFixed(1)} points
        </div>
      </div>
    </div>
  );
};
