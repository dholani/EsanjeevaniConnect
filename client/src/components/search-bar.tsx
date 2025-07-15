import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  locationFilter: string;
  onLocationChange: (location: string) => void;
  locations: string[];
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  locationFilter,
  onLocationChange,
  locations,
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search doctors by name, specialization, or location..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-3 focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Select value={locationFilter} onValueChange={onLocationChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Locations">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="medical-button px-6 py-3">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
    </div>
  );
}
