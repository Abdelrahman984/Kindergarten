import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

function getLastMonthRange() {
  const now = new Date();
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  return { from: firstDayLastMonth, to: lastDayLastMonth };
}

export const useAttendanceRate = (from?: Date, to?: Date) => {
  const range = from && to ? { from, to } : getLastMonthRange();
  return useQuery({
    queryKey: ["attendanceRate", range.from, range.to],
    queryFn: async () => {
      const res = await api.get("/attendance/rate", {
        params: { from: range.from, to: range.to },
      });
      // Log the full response object
      console.log("Attendance rate response:", res.data);
      // Return the percentage from the rate field
      const data = res.data as { rate?: number };
      return data && typeof data.rate === "number"
        ? Math.round(data.rate * 100)
        : 0;
    },
  });
};
