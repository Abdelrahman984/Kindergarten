import { useState } from "react";
import { useLogin } from "@/api/auth";

const LoginForm = () => {
  const login = useLogin();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ identifier, password });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input
        className="border p-2 w-full"
        placeholder="اسم المستخدم"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <input
        type="password"
        className="border p-2 w-full"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-emerald-600 text-white px-4 py-2 rounded">
        دخول
      </button>
    </form>
  );
};

export default LoginForm;
