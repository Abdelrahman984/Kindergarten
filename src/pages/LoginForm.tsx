import { useState } from "react";
import { Eye, EyeOff, User, Lock, Loader2 } from "lucide-react";
import { useLogin } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginForm = () => {
  const login = useLogin();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { identifier?: string; password?: string } = {};

    if (!identifier.trim()) {
      newErrors.identifier = "يرجى إدخال اسم المستخدم";
    }

    if (!password) {
      newErrors.password = "يرجى إدخال كلمة المرور";
    } else if (password.length < 3) {
      newErrors.password = "كلمة المرور يجب أن تحتوي على الأقل 3 أحرف";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrors({});
    login.mutate(
      { identifier, password },
      {
        onSuccess: () => {
          toast.success("تم تسجيل الدخول بنجاح");
          // Redirect to home (replace so user can't go back to login)
          navigate("/", { replace: true });
        },
        onError: (err: unknown) => {
          const msg = extractErrorMessage(err) || "حدث خطأ أثناء تسجيل الدخول";
          toast.error(msg);
        },
      }
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Helper to safely extract server error message from unknown
  const extractErrorMessage = (err: unknown): string | undefined => {
    try {
      if (typeof err === "object" && err !== null) {
        const e = err as Record<string, unknown>;
        if (
          e.response &&
          typeof e.response === "object" &&
          e.response !== null
        ) {
          const resp = e.response as Record<string, unknown>;
          if (
            resp.data &&
            typeof resp.data === "object" &&
            resp.data !== null
          ) {
            const data = resp.data as Record<string, unknown>;
            if (typeof data.message === "string") return data.message;
          }
        }
        if (typeof e.message === "string") return e.message;
      }
    } catch {
      // ignore
    }
    return undefined;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-cyan-50 p-4 rtl"
      dir="rtl"
    >
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mb-2">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            مرحباً بك
          </CardTitle>
          <CardDescription className="text-gray-600">
            قم بتسجيل الدخول للوصول إلى حسابك
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {login.isError && (
              <Alert variant="destructive" className="text-right">
                <AlertDescription>
                  خطأ في تسجيل الدخول. يرجى التحقق من البيانات المدخلة والمحاولة
                  مرة أخرى.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="identifier"
                className="text-right block text-gray-700 font-medium"
              >
                اسم المستخدم أو البريد الإلكتروني
              </Label>
              <div className="relative">
                <Input
                  id="identifier"
                  type="text"
                  placeholder="أدخل اسم المستخدم أو البريد الإلكتروني"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errors.identifier) {
                      setErrors((prev) => ({ ...prev, identifier: undefined }));
                    }
                  }}
                  className={`text-right pr-12 ${
                    errors.identifier ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  disabled={login.isPending}
                  autoComplete="username"
                />
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              {errors.identifier && (
                <p className="text-red-500 text-sm text-right mt-1">
                  {errors.identifier}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-right block text-gray-700 font-medium"
              >
                كلمة المرور
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  className={`text-right pr-12 pl-12 ${
                    errors.password ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  disabled={login.isPending}
                  autoComplete="current-password"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={login.isPending}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm text-right mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              disabled={login.isPending}
            >
              {login.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin ml-2" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                "تسجيل الدخول"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
