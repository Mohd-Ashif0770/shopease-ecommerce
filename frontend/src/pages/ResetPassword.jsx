
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";

import { resetPasswordSchema } from "../validations/auth.validation";
import { resetPasswordAPI } from "../apis/auth.api";
import {
  setLoading,
  setError,
  clearAuthError,
} from "../redux/features/authSlice";
import LoginRightSection from "../components/LoginRightSection";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const email = location.state?.email;
  const otp = location.state?.otp;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!email || !otp) {
      toast.error("Please verify your reset code first.");
      navigate("/forgot-password", { replace: true });
    }
  }, [email, otp, navigate]);

  const onSubmit = async ({ password, confirmPassword }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearAuthError());

      const response = await resetPasswordAPI({
        email,
        otp,
        password,
        confirmPassword,
      });

      toast.success(
        response.message ||
          "Password reset successfully. Please sign in."
      );

      navigate("/login", { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to reset your password. Please try again.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const inputClass = (hasError) =>
    `h-12 w-full rounded-xl border px-4 pr-12 text-sm outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 ${
      hasError ? "border-red-400" : "border-slate-200"
    }`;

  return (
    <main className="min-h-screen lg:h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
      <section className="flex flex-col justify-center min-h-screen lg:min-h-0 lg:h-full w-full px-6 py-8 sm:px-12 lg:px-14 xl:px-18 overflow-y-auto">
        <div className="w-full max-w-[420px] mx-auto my-auto">
         <Link
            to="/login"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-emerald-900 sm:mb-6"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>

          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <LockKeyhole size={23} strokeWidth={1.8} />
            </div>

            <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl sm:leading-tight">
              Create new password
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Choose a strong password you haven't used before.
              Your new password must contain at least 8 characters.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                New password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  {...register("password")}
                  className={inputClass(Boolean(errors.password))}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Confirm new password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter new password"
                  {...register("confirmPassword")}
                  className={inputClass(
                    Boolean(errors.confirmPassword)
                  )}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>


            <button
              type="submit"
              disabled={loading || !email || !otp}
              className="flex h-12 w-full items-center cursor-pointer justify-center gap-2 rounded-xl bg-emerald-800 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <LoaderCircle size={17} className="animate-spin" />
              )}
              {loading ? "Updating password..." : "Reset password"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-emerald-800 hover:text-emerald-900"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>

      <LoginRightSection/>
    </main>
  );
}
