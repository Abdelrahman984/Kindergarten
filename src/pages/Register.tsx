import { useState } from "react";
import { Eye, EyeOff, User, Mail, Phone, MapPin, Loader2 } from "lucide-react";
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
import { useRegister } from "@/api/auth";

const Register = () => {
  const register = useRegister();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "الاسم الكامل مطلوب";
    if (!password) e.password = "كلمة المرور مطلوبة";
    else if (password.length < 3) e.password = "كلمة المرور قصيرة جدًا";
    if (email && !/^\S+@\S+\.\S+$/.test(email))
      e.email = "صيغة البريد غير صحيحة";
    if (phone && !/^\+?[0-9\s-]{6,}$/.test(phone))
      e.phone = "رقم الهاتف غير صالح";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    register.mutate(
      {
        fullName: fullName.trim(),
        email: email ? email.trim() : undefined,
        phoneNumber: phone ? phone.trim() : undefined,
        password,
        address: address ? address.trim() : undefined,
      },
      {
        onSuccess: () => {
          toast.success("تم إنشاء الحساب بنجاح، يمكنك تسجيل الدخول الآن");
          navigate("/login", { replace: true });
        },
        onError: (err: unknown) => {
          const msg = extractErrorMessage(err) || "حدث خطأ أثناء إنشاء الحساب";
          toast.error(msg);
        },
      }
    );
  };

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
      <Card className="w-full max-w-lg shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mb-2">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            إنشاء حساب
          </CardTitle>
          <CardDescription className="text-gray-600">
            املأ البيانات لإنشاء حساب جديد
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {register.isError && (
              <Alert variant="destructive" className="text-right">
                <AlertDescription>
                  فشل إنشاء الحساب. يرجى المحاولة لاحقاً.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-right block text-gray-700 font-medium"
                >
                  الاسم الكامل
                </Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName)
                        setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    placeholder="أدخل الاسم الكامل"
                    className="text-right pr-12"
                  />
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm text-right mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-right block text-gray-700 font-medium"
                >
                  البريد الإلكتروني (اختياري)
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="أدخل البريد الإلكتروني"
                    className="text-right pr-12"
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm text-right mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-right block text-gray-700 font-medium"
                >
                  رقم الهاتف (اختياري)
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone)
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="أدخل رقم الهاتف"
                    className="text-right pr-12"
                  />
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm text-right mt-1">
                    {errors.phone}
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
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="أدخل كلمة المرور"
                    className="text-right pr-12 pl-12"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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

              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-right block text-gray-700 font-medium"
                >
                  العنوان (اختياري)
                </Label>
                <div className="relative">
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="أدخل العنوان"
                    className="text-right pr-12"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              disabled={register.isPending}
            >
              {register.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin ml-2" /> جاري
                  الإنشاء...
                </>
              ) : (
                "إنشاء حساب"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
