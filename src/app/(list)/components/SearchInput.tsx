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
      placeholder="Search Pokémon by name or ID"
      className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg bg-white focus:outline-none transition-colors appearance-none cursor-pointer hover:border-gray-400"
    />
  );
};
