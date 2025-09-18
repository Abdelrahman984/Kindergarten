// src/components/StatsCards.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

export interface StatCard {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string | number | React.ReactNode;
  isPositiveStat?: boolean; // true = إحصائية إيجابية (الحضور), false = إحصائية سلبية (الغياب)
}

interface StatsCardsProps {
  stats: StatCard[];
  columns?: number; // default 4
}

const StatsCards = ({ stats, columns = 4 }: StatsCardsProps) => (
  <div className={`grid gap-4 md:grid-cols-${columns}`}>
    {stats.map((stat, idx) => {
      let trendUp = true;
      let trendColor = "text-green-500";

      if (stat.trend && stat.isPositiveStat !== undefined) {
        const numericTrend = Number(String(stat.trend).replace("%", ""));

        if (stat.isPositiveStat) {
          // ✅ إحصائية إيجابية (الحضور مثلًا): عالي = سهم ↑ أخضر، قليل = سهم ↓ أحمر
          trendUp = numericTrend >= 50;
          trendColor = trendUp ? "text-green-500" : "text-red-500";
        } else {
          // ❌ إحصائية سلبية (الغياب مثلًا): عالي = سهم ↑ أحمر، قليل = سهم ↓ أخضر
          trendUp = numericTrend >= 50;
          trendColor = trendUp ? "text-red-500" : "text-green-500";
        }
      }

      return (
        <Card key={idx}>
          <CardContent className="p-6 text-center">
            {/* Icon + Label */}
            <div className="flex items-center justify-center gap-2 mb-2">
              {stat.icon}
              <p className="text-sm text-muted-foreground font-arabic">
                {stat.label}
              </p>
            </div>

            {/* Value */}
            <div className="text-2xl font-bold mb-2">{stat.value}</div>

            {/* Trend */}
            {stat.trend && (
              <Badge
                variant="outline"
                className="flex items-center gap-3 text-xs font-arabic"
              >
                <TrendingUp
                  className={`w-3 h-3 ${
                    trendUp ? "" : "rotate-180"
                  } ${trendColor}`}
                  />
                  {stat.trend}
              </Badge>
            )}
          </CardContent>
        </Card>
      );
    })}
  </div>
);

export default StatsCards;
