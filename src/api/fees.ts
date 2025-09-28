// src/api/fees.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

// نوع بيانات الرسوم
export interface FeeRecord {
  id: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  status: string;
  studentName: string;
  className: string;
  parentName: string;
  transactionId?: string;
}
export interface PayFeePayload {
  id: string;
  method: string;
  reference: string;
  transactionId?: string;
}

export interface FeeStats {
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
  paidCount: number;
  pendingCount: number;
  overdueCount: number;
  collectionRate: number;
}

const fetchFees = async (): Promise<FeeRecord[]> => {
  const { data } = await api.get<FeeRecord[]>("/fees"); // عدل الـ URL حسب الـ backend
  return data;
};

export const useFees = () => {
  return useQuery<FeeRecord[], Error>({
    queryKey: ["fees"],
    queryFn: fetchFees,
    staleTime: 1000 * 60, // 1 دقيقة
  });
};

// دالة دفع الرسوم
export const payFee = async (id: string) => {
  const { data } = await api.post(`/fees/${id}/pay`);
  return data;
};

export const useMarkAsPaid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.post(`/fees/${id}/mark-paid`);
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["fees"] });
      const previousFees = queryClient.getQueryData<FeeRecord[]>(["fees"]);

      if (previousFees) {
        queryClient.setQueryData<FeeRecord[]>(
          ["fees"],
          (old) =>
            old?.map((fee) =>
              fee.id === id
                ? {
                    ...fee,
                    status: "Paid",
                    paymentDate: new Date().toISOString(),
                  }
                : fee
            ) || []
        );
      }

      return { previousFees };
    },
    onError: (_err, _id, context) => {
      if (context?.previousFees) {
        queryClient.setQueryData(["fees"], context.previousFees);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["fees"] });
    },
  });
};

export const usePayFee = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, PayFeePayload>({
    mutationFn: async ({ id, method, reference }) => {
      await api.post(`/fees/${id}/pay`, {
        method,
        reference,
        transactionId: "N/A",
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fees"] }),
  });
};

export const fetchFeeStats = async (): Promise<FeeStats> => {
  const { data } = await api.get<FeeStats>("/fees/stats");
  return data;
};

export const useFeeStats = () => {
  return useQuery({ queryKey: ["feeStats"], queryFn: fetchFeeStats });
};
