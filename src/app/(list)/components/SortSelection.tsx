type Props = {
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
};

export const SortSelection = ({ value, onChange, options = [] }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Sort by
      </label>
      <div className="relative">
        <select
          id="sort"
          name="sort"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg bg-white focus:outline-none transition-colors appearance-none cursor-pointer hover:border-gray-400"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-900"
            >
              {option.label}
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
