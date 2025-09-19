import StatsCards, { StatCard } from "@/components/shared/StatsCards";
import { DollarSign, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { FeeRecord } from "@/api/fees";

interface FeeStatsProps {
  feeRecords: FeeRecord[];
}

const FeeStats = ({ feeRecords }: FeeStatsProps) => {
  const stats: StatCard[] = [
    {
      label: "إجمالي الرسوم",
      value: feeRecords.reduce((sum, f) => sum + f.amount, 0),
      icon: <DollarSign className="w-5 h-5 text-primary" />,
    },
    {
      label: "المحصل",
      value: feeRecords
        .filter((f) => f.status === "Paid")
        .reduce((sum, f) => sum + f.amount, 0),
      icon: <CheckCircle className="w-5 h-5 text-success" />,
      isPositiveStat: true,
    },
    {
      label: "متأخر",
      value: feeRecords
        .filter((f) => f.status === "Overdue")
        .reduce((sum, f) => sum + f.amount, 0),
      icon: <AlertCircle className="w-5 h-5 text-destructive" />,
      isPositiveStat: false,
    },
    {
      label: "معلق",
      value: feeRecords
        .filter((f) => f.status === "Pending")
        .reduce((sum, f) => sum + f.amount, 0),
      icon: <Clock className="w-5 h-5 text-warning" />,
      isPositiveStat: false,
    },
  ];

  return <StatsCards stats={stats} columns={4} />;
};

export default FeeStats;
