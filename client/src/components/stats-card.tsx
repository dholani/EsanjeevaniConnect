import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  isLoading: boolean;
  bgColor: string;
}

export default function StatsCard({ icon, title, value, isLoading, bgColor }: StatsCardProps) {
  if (isLoading) {
    return (
      <Card className="medical-card p-4">
        <div className="flex items-center">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="ml-3">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="medical-card p-4">
      <div className="flex items-center">
        <div className={`${bgColor} p-3 rounded-full`}>
          {icon}
        </div>
        <div className="ml-3">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </Card>
  );
}
