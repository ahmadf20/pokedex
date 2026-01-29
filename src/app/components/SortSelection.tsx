type Props = {
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
};

export const SortSelection = ({ value, onChange, options = [] }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="sort">Sort by</label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
