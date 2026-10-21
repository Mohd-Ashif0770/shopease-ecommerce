import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, MailCheck } from "lucide-react";
import { toast } from "sonner";

import { verifyOtpSchema } from "../validations/auth.validation";
import { verifyOtpAPI, resendOtpAPI } from "../apis/auth.api";
import {
  setLoading,
  setError,
  clearAuthError,
} from "../redux/features/authSlice";
import RegisterRightSection from "../components/RegisterRightSection";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const { loading } = useSelector((state) => state.auth);
  const [resendCooldown, setResendCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setTimeout(() => {
      setResendCooldown((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const onSubmit = async ({ otp }) => {
    dispatch(setLoading(true));
    dispatch(clearAuthError());

    try {
      await verifyOtpAPI({ email, otp });

      toast.success("Email verified successfully. You can now log in.");

      navigate("/login", {
        replace: true,
        state: { email },
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
    if (loading || resendCooldown > 0) return;

    dispatch(setLoading(true));
    dispatch(clearAuthError());

    try {
      await resendOtpAPI({ email });

      toast.success("A new verification code has been sent.");
      setResendCooldown(60);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to resend the code. Please try again.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const otpInputClass = `
    h-14 w-full rounded-xl border border-slate-300 bg-white
    px-4 text-center text-2xl font-semibold tracking-[0.45em]
    text-slate-900 placeholder:text-slate-300 outline-none
    transition focus:border-emerald-800 focus:ring-2
    focus:ring-emerald-800/10 disabled:bg-slate-50
  `;

  if (!email) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <MailCheck className="mx-auto mb-4 text-emerald-800" size={40} />

          <h1 className="font-heading text-2xl font-bold text-slate-950">
            Verify your email
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Your email address is missing from this verification session. Please
            return to registration and try again.
          </p>

          <Link
            to="/register"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900"
          >
            Back to registration <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-white lg:grid lg:h-screen lg:min-h-0 lg:grid-cols-2 lg:overflow-hidden">
      {/* LEFT: OTP form */}
      <section className="flex min-h-screen items-center justify-center px-6 py-8 sm:px-12 lg:h-screen lg:min-h-0 lg:overflow-y-auto lg:px-10 lg:py-6 xl:px-16">
        <div className="my-auto w-full max-w-[440px]">
          <div className="mb-7">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-800/10 text-emerald-800">
              <MailCheck size={28} strokeWidth={1.7} />
            </div>

            <h1 className="font-heading text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">
              Verify your email
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              We sent a 6-digit verification code to
            </p>

            <p className="mt-1 break-all text-sm font-semibold text-slate-800">
              {email}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-semibold text-slate-900"
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
                disabled={loading}
                aria-invalid={Boolean(errors.otp)}
                {...register("otp", {
                  onChange: (event) => {
                    event.target.value = event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6);

                    dispatch(clearAuthError());
                  },
                })}
                className={`${otpInputClass} ${
                  errors.otp ? "border-red-500" : ""
                }`}
              />

              {errors.otp && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.otp.message}
                </p>
              )}

              <p className="mt-2 text-xs leading-5 text-slate-500">
                The code expires after 5 minutes.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-[48px] w-full items-center cursor-pointer justify-center gap-2 rounded-lg bg-emerald-800 px-5 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Please wait..." : "Verify Email"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">Didn't receive the code?</p>

            <button
              type="button"
              disabled={loading || resendCooldown > 0}
              onClick={handleResendOtp}
              className="mt-2 cursor-pointer text-sm font-semibold text-emerald-800 hover:text-emerald-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : "Resend verification code"}
            </button>
          </div>

          <Link
            to="/register"
            className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-800"
          >
            <ArrowLeft size={16} />
            Back to registration
          </Link>
        </div>
      </section>

      {/* RIGHT: Reused lifestyle image */}
      <RegisterRightSection />
    </main>
  );
};

export default VerifyOtp;
