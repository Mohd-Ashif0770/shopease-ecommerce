import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  clearAuthError,
  setError,
} from "../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, LoaderCircle, Mail } from "lucide-react";
import { toast } from "sonner";

import { forgotPasswordSchema } from "../validations/auth.validation";
import { forgotPasswordAPI } from "../apis/auth.api";
import LoginRightSection from "../components/LoginRightSection";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }) => {
    dispatch(setLoading(true));
    dispatch(clearAuthError());

    try {
      const response = await forgotPasswordAPI({ email });
    //   console.log("Response ---> ", response);

      toast.success(
        response.message ||
          "If an account exists, reset instructions will be sent."
      );

      navigate("/verify-reset-otp", {
        state: { email },
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to process your request. Please try again.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <main className="min-h-screen lg:h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
      <section className="flex flex-col justify-center min-h-screen lg:min-h-0 lg:h-full w-full px-6 py-6 sm:px-12 lg:px-14 xl:px-18 overflow-y-auto">
        <div className="w-full max-w-[420px] mx-auto my-auto">
          <Link
            to="/login"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-emerald-900 sm:mb-6"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>

          <div className="mb-5 sm:mb-6">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Mail size={23} strokeWidth={1.8} />
            </div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl sm:leading-tight">
              Forgot Password?
            </h1>

            <p className="mt-1.5 text-sm leading-6 text-slate-500 sm:text-base">
              Enter the email address associated with your account and we’ll
              send you a code to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-slate-900"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  strokeWidth={1.9}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  disabled={loading}
                  aria-invalid={Boolean(errors.email)}
                  {...register("email", {
                    onChange: () => dispatch(clearAuthError()),
                  })}
                  className={`h-[46px] w-full rounded-xl border border-slate-300 bg-white pl-[46px] pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/10 sm:text-base ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-xs text-red-600 sm:text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 text-base font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[48px]"
            >
              {loading && <LoaderCircle size={17} className="animate-spin" />}
              {loading ? "Sending code..." : "Send reset code"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-500 sm:mt-6 sm:text-sm">
            Remember your password?{" "}
            <Link
              to="/login"
              className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950"
            >
              Sign in <ArrowRight size={16} />
            </Link>
          </p>
        </div>
      </section>

      {/* RIGHT: Lifestyle panel */}
      <LoginRightSection/>
    </main>
  );
}
