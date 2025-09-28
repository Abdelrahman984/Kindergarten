import StatsCards, { StatCard } from "@/components/shared/StatsCards";
import {
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  Layers,
  PieChart,
} from "lucide-react";
import { useFeeStats } from "@/api/fees";

const FeeStats = () => {
  const { data: stats, isLoading } = useFeeStats();

  if (isLoading || !stats) return null;

  const cards: StatCard[] = [
    {
      label: "إجمالي الرسوم",
      value: stats.totalAmount,
      icon: <DollarSign className="w-5 h-5 text-primary" />,
    },
    {
      label: "المحصل",
      value: stats.paidAmount,
      icon: <CheckCircle className="w-5 h-5 text-success" />,
      isPositiveStat: true,
      trend: stats.paidCount ? `${stats.paidCount} طلاب` : undefined,
    },
    {
      label: "متأخر",
      value: stats.overdueAmount,
      icon: <AlertCircle className="w-5 h-5 text-destructive" />,
      isPositiveStat: false,
      trend: stats.overdueCount ? `${stats.overdueCount} طلاب` : undefined,
    },
    {
      label: "معلق",
      value: stats.pendingAmount,
      icon: <Clock className="w-5 h-5 text-warning" />,
      isPositiveStat: false,
      trend: stats.pendingCount ? `${stats.pendingCount} طلاب` : undefined,
    },
    {
      label: "نسبة التحصيل",
      value: `${Math.round((stats.collectionRate || 0))}%`,
      icon: <PieChart className="w-5 h-5 text-emerald-500" />,
      isPositiveStat: true,
    },
  ];

  return <StatsCards stats={cards} columns={5} />;
};

export default FeeStats;
