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
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="type">{label}</label>
      <select
        name="type"
        id="type"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
