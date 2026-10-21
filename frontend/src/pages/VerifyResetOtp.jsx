
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, KeyRound, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import {
  verifyResetOtpSchema,
} from "../validations/auth.validation";
import {
  verifyResetOtpAPI,
  forgotPasswordAPI,
} from "../apis/auth.api";
import {
  setLoading,
  setError,
  clearAuthError,
} from "../redux/features/authSlice";
import LoginRightSection from "../components/LoginRightSection";

export default function VerifyResetOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const email = location.state?.email;

  const [resendCooldown, setResendCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyResetOtpSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (!email) {
      toast.error("Please enter your email address first.");
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setTimeout(() => {
      setResendCooldown((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const onSubmit = async ({ otp }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearAuthError());

      const response = await verifyResetOtpAPI({
        email,
        otp,
      });

      toast.success(
        response.message || "Verification code accepted."
      );

      navigate("/reset-password", {
        state: { email, otp },
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to verify the code. Please try again.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || resending) return;

    try {
      setResending(true);
      dispatch(clearAuthError());

      const response = await forgotPasswordAPI({ email });

      toast.success(
        response.message ||
          "If an account exists, reset instructions will be sent."
      );

      setValue("otp", "");
      setResendCooldown(60);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to request a new code. Please try again.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="min-h-screen lg:h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
      <section className="flex flex-col justify-center min-h-screen lg:min-h-0 lg:h-full w-full px-6 py-8 sm:px-12 lg:px-14 xl:px-18 overflow-y-auto">
        <div className="w-full max-w-[420px] mx-auto my-auto">
          <Link
            to="/forgot-password"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-emerald-900 sm:mb-6"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <KeyRound size={23} strokeWidth={1.8} />
            </div>

           <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl sm:leading-tight">
              Check Your Email
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter the 6-digit password reset code sent to{" "} <br/>
              <span className="font-medium text-slate-800 break-all">
                {email || "your email"}
              </span>
              .
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Verification code
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="000000"
                {...register("otp", {
                  onChange: (event) => {
                    const digits = event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6);

                    setValue("otp", digits, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  },
                })}
                className={`h-14 w-full rounded-xl border px-4 text-center font-heading text-2xl font-semibold tracking-[0.5em] outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 ${
                  errors.otp ? "border-red-400" : "border-slate-200"
                }`}
              />

              {errors.otp && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <LoaderCircle size={17} className="animate-spin" />
              )}
              {loading ? "Verifying..." : "Verify code"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || resending}
              className="font-semibold cursor-pointer text-emerald-800 hover:text-emerald-900 disabled:cursor-not-allowed disabled:text-slate-400"
            >
              {resending
                ? "Sending..."
                : resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Resend code"}
            </button>
          </div>

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

     {/* right section */}
     <LoginRightSection/>
    </main>
  );
}
