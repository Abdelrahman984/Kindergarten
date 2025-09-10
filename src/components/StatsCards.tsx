import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";
import React from "react";

export interface StatCard {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  bgClass?: string;
  textClass?: string;
}

interface StatsCardsProps {
  stats: StatCard[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card key={idx}>
          <CardContent className="p-6 flex justify-between">
            <div className={`text-right ${stat.textClass ?? ""}`}>
              <p className="text-sm font-medium text-muted-foreground font-arabic">
                {stat.label}
              </p>
              <p className="text-2xl font-bold font-arabic">{stat.value}</p>
            </div>
            {stat.icon && (
              <div
                className={`p-3 rounded-full ${
                  stat.bgClass ?? "bg-gradient-islamic"
                }`}
              >
                {stat.icon}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
