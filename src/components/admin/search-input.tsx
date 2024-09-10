import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

interface SearchInputProps {
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => (
  <PlaceholdersAndVanishInput
    // type="text"
    placeholder="Looking for a specific item?"
    onChange={(e) => onSearch(e.target.value)}
    onSubmit={(e) => e.preventDefault()}
    className="w-full rounded border p-2"
  />
);

export default SearchInput;
