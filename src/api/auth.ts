import { useMutation } from "@tanstack/react-query";
import api from "./client";

// public record RegisterDto(string FullName, string? Email, string? PhoneNumber, string Password, string? Address);
// public record LoginDto(string Identifier, string Password);

export interface LoginRequest {
  identifier: string;
  password: string;
}
export interface LoginResponse {
  token: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await api.post<LoginResponse>("/auth/login", data);
      localStorage.setItem("token", res.data.token); // حفظ التوكن
      return res.data;
    },
  });
};
