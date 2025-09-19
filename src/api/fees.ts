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

// دالة لجلب كل الرسوم
const fetchFees = async (): Promise<FeeRecord[]> => {
  const { data } = await api.get<FeeRecord[]>("/fees"); // عدل الـ URL حسب الـ backend
  return data;
};

// Hook لجلب الرسوم
export const useFees = () => {
  return useQuery<FeeRecord[], Error>({
    queryKey: ["fees"],
    queryFn: fetchFees,
    staleTime: 1000 * 60, // 1 دقيقة
  });
};

// دالة دفع الرسوم
const payFee = async (id: string) => {
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
