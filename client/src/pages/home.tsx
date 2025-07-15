import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Stethoscope, Users, Hospital, MapPin, UserPlus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DoctorCard from "@/components/doctor-card";
import StatsCard from "@/components/stats-card";
import DepartmentFilter from "@/components/department-filter";
import SearchBar from "@/components/search-bar";
import type { Doctor, Department } from "@shared/schema";

export default function Home() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All Departments");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("All Locations");

  const { data: doctors, isLoading: doctorsLoading } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors"],
  });

  const { data: departments, isLoading: departmentsLoading } = useQuery<Department[]>({
    queryKey: ["/api/departments"],
  });

  const { data: stats, isLoading: statsLoading } = useQuery<{
    availableDoctors: number;
    departments: number;
    patientsServed: string;
    locations: number;
  }>({
    queryKey: ["/api/stats"],
  });

  const { data: searchResults, isLoading: searchLoading } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors/search", { q: searchQuery }],
    enabled: searchQuery.length > 0,
  });

  const { data: departmentDoctors, isLoading: departmentLoading } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors/department", selectedDepartment],
    enabled: selectedDepartment !== "All Departments",
  });

  const filteredDoctors = () => {
    let result = doctors || [];

    if (searchQuery.length > 0 && searchResults) {
      result = searchResults;
    } else if (selectedDepartment !== "All Departments" && departmentDoctors) {
      result = departmentDoctors;
    }

    if (locationFilter !== "All Locations") {
      result = result.filter(doctor => doctor.location.includes(locationFilter));
    }

    return result;
  };

  const uniqueLocations = () => {
    if (!doctors) return [];
    const locations = new Set(doctors.map(doctor => {
      const parts = doctor.location.split(", ");
      return parts[parts.length - 1]; // Get state
    }));
    return Array.from(locations);
  };

  const isLoading = doctorsLoading || searchLoading || departmentLoading;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(210, 40%, 98%)' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'hsl(207, 90%, 54%)' }}>
                <Stethoscope className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">eSanjeevani</h1>
                <p className="text-sm text-gray-600">Available Doctors</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(147, 86%, 37%)' }}></div>
                <span>All doctors currently available</span>
              </div>
              <Button className="medical-button">
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            locationFilter={locationFilter}
            onLocationChange={setLocationFilter}
            locations={uniqueLocations()}
          />

          <DepartmentFilter 
            departments={departments || []}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            isLoading={departmentsLoading}
          />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard
              icon={<Users className="h-6 w-6" style={{ color: 'hsl(147, 86%, 37%)' }} />}
              title="Available Doctors"
              value={stats?.availableDoctors?.toString() || "0"}
              isLoading={statsLoading}
              bgColor="bg-green-50"
            />
            <StatsCard
              icon={<Hospital className="h-6 w-6" style={{ color: 'hsl(207, 90%, 54%)' }} />}
              title="Departments"
              value={stats?.departments?.toString() || "0"}
              isLoading={statsLoading}
              bgColor="bg-blue-50"
            />
            <StatsCard
              icon={<Users className="text-yellow-500 h-6 w-6" />}
              title="Patients Served"
              value={stats?.patientsServed || "0"}
              isLoading={statsLoading}
              bgColor="bg-yellow-500 bg-opacity-10"
            />
            <StatsCard
              icon={<MapPin className="text-purple-500 h-6 w-6" />}
              title="Locations"
              value={stats?.locations?.toString() || "0"}
              isLoading={statsLoading}
              bgColor="bg-purple-500 bg-opacity-10"
            />
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="medical-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </Card>
            ))
          ) : filteredDoctors().length > 0 ? (
            filteredDoctors().map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Hospital className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No doctors found
              </h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? "No doctors match your search criteria. Try adjusting your search terms."
                  : "No doctors available in the selected department or location."}
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {!isLoading && filteredDoctors().length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="px-8 py-3"
              disabled
            >
              <Users className="mr-2 h-4 w-4" />
              All Available Doctors Loaded
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'hsl(207, 90%, 54%)' }}>
                  <Stethoscope className="text-white h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">eSanjeevani</h3>
                  <p className="text-sm text-gray-600">National Telemedicine Service</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Bridging the Digital Health Divide with quality healthcare access for all.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Find Doctors</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Departments</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Emergency</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Health Records</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Emergency</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">24/7 Emergency Helpline</p>
                <p className="text-lg font-bold text-red-600">1800-123-4567</p>
                <p className="text-sm text-gray-600">For medical emergencies only</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 eSanjeevani - National Telemedicine Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
