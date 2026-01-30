type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export const FilterSelection = ({
  label,
  options = [],
  value,
  onChange,
}: Props) => {
  const selectId = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          name={selectId}
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg bg-white focus:outline-none transition-colors appearance-none cursor-pointer hover:border-gray-400"
        >
          <option value="" className="text-gray-500">
            All
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-gray-900">
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
