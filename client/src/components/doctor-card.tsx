import { Video, User, MapPin, Star, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import type { Doctor } from "@shared/schema";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const { toast } = useToast();

  const handleConsultNow = () => {
    toast({
      title: "Consultation Request",
      description: `Starting consultation with ${doctor.name}. Please wait while we connect you.`,
    });
  };

  const handleViewProfile = () => {
    toast({
      title: "Doctor Profile",
      description: `Viewing profile for ${doctor.name}`,
    });
  };

  const formatPatientsServed = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K+`;
    }
    return `${count}+`;
  };

  return (
    <Card className="medical-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12 border-2 border-gray-200">
            <AvatarImage src={doctor.imageUrl || undefined} alt={doctor.name} />
            <AvatarFallback className="text-white" style={{ backgroundColor: 'hsl(207, 90%, 54%)' }}>
              {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.qualification}</p>
          </div>
        </div>
        <Badge variant="outline" className="available-indicator" style={{ borderColor: 'hsl(147, 86%, 37%)', color: 'hsl(147, 86%, 37%)' }}>
          <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: 'hsl(147, 86%, 37%)' }}></div>
          Available
        </Badge>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
          <span>{doctor.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Star className="w-4 h-4 text-yellow-500 mr-2" />
          <span>{formatPatientsServed(doctor.patientsServed)} patients served</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Stethoscope className="w-4 h-4 text-gray-400 mr-2" />
          <span>{doctor.specialization}</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          className="flex-1 medical-button text-sm font-medium"
          onClick={handleConsultNow}
        >
          <Video className="mr-2 h-4 w-4" />
          Consult Now
        </Button>
        <Button 
          variant="outline"
          className="medical-button-secondary text-sm font-medium"
          onClick={handleViewProfile}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
      </div>
    </Card>
  );
}
