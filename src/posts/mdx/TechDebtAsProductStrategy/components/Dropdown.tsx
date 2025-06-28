import { Info } from "lucide-react";
import { useState } from "react";

interface Props {
  label: string;
  value: number;
  onChange: (v: number) => void;
  options: { value: number; label: string }[];
  tooltip: string;
}

export const Dropdown = ({
  label,
  value,
  onChange,
  options,
  tooltip,
}: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center">
        <label className="mr-2 text-sm font-medium">{label}</label>
        <div className="relative">
          <Info
            size={16}
            className="cursor-help"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <div className="absolute bottom-6 left-0 z-10 w-48 rounded bg-gray-800 px-2 py-1 text-xs text-white">
              {tooltip}
            </div>
          )}
        </div>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full rounded border border-gray-300 p-2 text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} ({option.value}x)
          </option>
        ))}
      </select>
    </div>
  );
};
