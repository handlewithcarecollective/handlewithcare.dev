import { Dropdown } from "./Dropdown";

// Calculate RICE+D score
export const calculateScore = (initiative: Initiative) => {
  const { reach, impact, confidence, effort, costOfDelay } = initiative;
  const score = (reach * impact * (confidence / 100) * costOfDelay) / effort;
  return Math.round(score * 10) / 10; // Round to 1 decimal place
};

// Scale definitions
const scales = {
  reach: [
    { value: 2, label: "Low" },
    { value: 4, label: "Medium" },
    { value: 6, label: "High" },
    { value: 8, label: "Very High" },
  ],
  impact: [
    { value: 0.25, label: "Minimal" },
    { value: 0.5, label: "Low" },
    { value: 1, label: "Medium" },
    { value: 2, label: "High" },
    { value: 3, label: "Massive" },
  ],
  confidence: [
    { value: 20, label: "Who knows?" },
    { value: 50, label: "Low" },
    { value: 80, label: "Medium" },
    { value: 100, label: "High" },
  ],
  effort: [
    { value: 1, label: "Small" },
    { value: 2, label: "Medium" },
    { value: 3, label: "Large" },
    { value: 4, label: "Extra-Large" },
  ],
  costOfDelay: [
    { value: 0.5, label: "None" },
    { value: 1, label: "Low" },
    { value: 2, label: "Medium" },
    { value: 3, label: "High" },
    { value: 4, label: "Massive" },
  ],
};

const tooltips = {
  reach: "How many people or systems are affected?",
  impact: "How much will this move business goals forward?",
  confidence: "How certain are you about the estimates?",
  effort: "Engineering/development time required",
  costOfDelay: "What gets worse if you wait? How urgent is this?",
};

export const examples = {
  prosemirror: {
    name: "Standardize ProseMirror Editor",
    reach: 6,
    impact: 2,
    confidence: 80,
    effort: 3,
    costOfDelay: 3,
  },
  dashboard: {
    name: "Fix Dashboard Performance",
    reach: 4,
    impact: 1,
    confidence: 80,
    effort: 3,
    costOfDelay: 1,
  },
  aiWriting: {
    name: "AI Writing Assistant",
    reach: 6,
    impact: 0.5,
    confidence: 50,
    effort: 2,
    costOfDelay: 2,
  },
  collaboration: {
    name: "Real-time Collaboration",
    reach: 6,
    impact: 2,
    confidence: 50,
    effort: 4,
    costOfDelay: 2,
  },
};

export interface Initiative {
  name: string;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  costOfDelay: number;
}

interface Props {
  initiative: Initiative;
  score: number;
  onUpdate: <F extends keyof Initiative>(
    field: F,
    value: Initiative[F],
  ) => void;
  onLoadExample: (key: keyof typeof examples) => void;
}

export const InitiativePanel = ({
  initiative,
  score,
  onUpdate,
  onLoadExample,
}: Props) => {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="mb-4">
        <select
          className="mb-2 w-full rounded border border-gray-300 p-2 text-sm"
          onChange={(e) =>
            onLoadExample(e.target.value as keyof typeof examples)
          }
          value=""
        >
          <option value="">Load Example...</option>
          <option value="prosemirror">ProseMirror Editor</option>
          <option value="dashboard">Dashboard Performance</option>
          <option value="aiWriting">AI Writing Assistant</option>
          <option value="collaboration">Real-time Collaboration</option>
        </select>

        <input
          type="text"
          value={initiative.name}
          onChange={(e) => onUpdate("name", e.target.value)}
          className="w-full rounded border border-gray-300 p-2 text-sm font-medium"
          placeholder="Initiative name..."
        />
      </div>

      <Dropdown
        label="Reach"
        value={initiative.reach}
        onChange={(value) => onUpdate("reach", value)}
        options={scales.reach}
        tooltip={tooltips.reach}
      />

      <Dropdown
        label="Impact"
        value={initiative.impact}
        onChange={(value) => onUpdate("impact", value)}
        options={scales.impact}
        tooltip={tooltips.impact}
      />

      <Dropdown
        label="Confidence"
        value={initiative.confidence}
        onChange={(value) => onUpdate("confidence", value)}
        options={scales.confidence}
        tooltip={tooltips.confidence}
      />

      <Dropdown
        label="Effort"
        value={initiative.effort}
        onChange={(value) => onUpdate("effort", value)}
        options={scales.effort}
        tooltip={tooltips.effort}
      />

      <Dropdown
        label="Cost of Delay"
        value={initiative.costOfDelay}
        onChange={(value) => onUpdate("costOfDelay", value)}
        options={scales.costOfDelay}
        tooltip={tooltips.costOfDelay}
      />

      <div className="bg-brown/10 mt-6 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold">{score}</div>
        <div className="text-sm">RICE+D Score</div>
      </div>
    </div>
  );
};
