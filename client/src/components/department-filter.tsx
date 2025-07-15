import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Department } from "@shared/schema";

interface DepartmentFilterProps {
  departments: Department[];
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  isLoading: boolean;
}

export default function DepartmentFilter({
  departments,
  selectedDepartment,
  onDepartmentChange,
  isLoading,
}: DepartmentFilterProps) {
  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-24 rounded-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedDepartment === "All Departments" ? "default" : "outline"}
        className={`rounded-full text-sm font-medium transition-colors ${
          selectedDepartment === "All Departments"
            ? "medical-button"
            : "medical-button-secondary border border-gray-300"
        }`}
        onClick={() => onDepartmentChange("All Departments")}
      >
        All Departments
        <Badge variant="secondary" className="ml-2">
          {departments.reduce((sum, dept) => sum + dept.doctorCount, 0)}
        </Badge>
      </Button>
      {departments.map((department) => (
        <Button
          key={department.id}
          variant={selectedDepartment === department.name ? "default" : "outline"}
          className={`rounded-full text-sm font-medium transition-colors ${
            selectedDepartment === department.name
              ? "medical-button"
              : "medical-button-secondary border border-gray-300"
          }`}
          onClick={() => onDepartmentChange(department.name)}
        >
          {department.name}
          {department.doctorCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {department.doctorCount}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
}
