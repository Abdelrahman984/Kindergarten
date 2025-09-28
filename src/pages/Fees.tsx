import { useFees, usePayFee, useMarkAsPaid } from "@/api/fees";
import FeeStats from "@/components/fees/FeeStats";
import FeeTabs from "@/components/fees/FeeTabs";
import { Loader2 } from "lucide-react";

const Fees = () => {
  const { data: feeRecords = [], isLoading, isError } = useFees();
  const payFeeMutation = usePayFee();
  const markAsPaidMutation = useMarkAsPaid();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 font-arabic">جاري التحميل...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 font-arabic py-10">
        حدث خطأ أثناء تحميل البيانات
      </p>
    );
  }

  return (
    <div className="space-y-8 p-6 font-arabic">
      {/* العنوان والوصف */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">إدارة الرسوم</h1>
        <p className="text-muted-foreground">
          متابعة رسوم الطلاب والمدفوعات بكل سهولة
        </p>
      </div>

      {/* إحصائيات */}
      <FeeStats />

      {/* التابات + الجدول */}
      <FeeTabs
        feeRecords={feeRecords}
        onPay={(id) =>
          payFeeMutation.mutate({
            id: id.toString(),
            method: "manual",
            reference: "N/A",
            transactionId: "N/A",
          })
        }
        onMarkAsPaid={(id) => markAsPaidMutation.mutate(id.toString())}
      />
    </div>
  );
};

export default Fees;
