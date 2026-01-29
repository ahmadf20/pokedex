export const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (newValue: string) => void;
}) => {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search Pokémon by name or ID..."
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
