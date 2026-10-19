
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  UserRound,
  Truck,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import { toast } from "sonner";

import { registerSchema } from "../validations/auth.validation";
import { registerAPI } from "../apis/auth.api";
import {
  setLoading,
  setError,
  clearAuthError,
} from "../redux/features/authSlice";

import interiorImage from "../assets/login-interior.png";
import googleIcon from "../assets/google-logo.jpg";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (formData) => {
    dispatch(setLoading(true));
    dispatch(clearAuthError());

    try {
      // Send only fields expected by the backend.
      const { name, email, password } = formData;

      await registerAPI({ name, email, password });

      toast.success("Verification code sent to your email.");

      navigate("/verify-otp", {
        state: { email: email.trim().toLowerCase() },
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to create your account. Please try again.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const inputClass = `
    h-[40px] w-full rounded-lg border border-slate-300
    bg-white pl-10 pr-11 text-sm text-slate-900
    placeholder:text-slate-400 outline-none transition
    focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/10
    disabled:cursor-not-allowed disabled:bg-slate-50
  `;

  const fieldLabel =
    "mb-1.5 block text-xs font-semibold text-slate-900 sm:text-sm";

  const iconClass =
    "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400";

  return (
    <main className="min-h-screen w-full bg-white lg:grid lg:h-screen lg:min-h-0 lg:grid-cols-2 lg:overflow-hidden">
      {/* LEFT: Registration form */}
      <section className="flex min-h-screen items-center justify-center px-6 py-8 sm:px-12 lg:h-screen lg:min-h-0 lg:overflow-y-auto lg:px-10 lg:py-5 xl:px-16">
        <div className="my-auto w-full max-w-[440px]">
          {/* Heading */}
          <div className="mb-5">
            <h1 className="font-heading text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">
              Create an Account
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Join ShopEase and start shopping today
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Full name */}
            <div>
              <label htmlFor="name" className={fieldLabel}>
                Full Name
              </label>

              <div className="relative">
                <UserRound size={17} className={iconClass} />

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  disabled={loading}
                  aria-invalid={Boolean(errors.name)}
                  {...register("name")}
                  className={`${inputClass} ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
              </div>

              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={fieldLabel}>
                Email Address
              </label>

              <div className="relative">
                <Mail size={17} className={iconClass} />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  disabled={loading}
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                  className={`${inputClass} ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={fieldLabel}>
                Password
              </label>

              <div className="relative">
                <LockKeyhole size={17} className={iconClass} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  disabled={loading}
                  aria-invalid={Boolean(errors.password)}
                  {...register("password")}
                  className={`${inputClass} ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-emerald-800"
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className={fieldLabel}>
                Confirm Password
              </label>

              <div className="relative">
                <LockKeyhole size={17} className={iconClass} />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  disabled={loading}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  {...register("confirmPassword")}
                  className={`${inputClass} ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-emerald-800"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Create account */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-800 px-5 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="whitespace-nowrap text-xs font-medium text-slate-500">
              or continue with
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google sign-up placeholder */}
          <button
            type="button"
            onClick={() =>
              toast.info("Google sign-up will be available soon.")
            }
            className="flex h-[44px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            <img src={googleIcon} alt="" className="h-5 w-5" />
            Continue with Google
          </button>

          {/* Login link */}
          <p className="mt-5 text-center text-xs text-slate-500 sm:text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950"
            >
              Log in <ArrowRight size={15} />
            </Link>
          </p>
        </div>
      </section>

      {/* RIGHT: Reused lifestyle image and benefits */}
      <aside className="relative hidden h-screen overflow-hidden lg:block">
        <img
          src={interiorImage}
          alt="Warm minimalist living room with an olive armchair and indoor plants"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f0e8]/35 via-[#f4f0e8]/10 to-transparent" />

        <div className="absolute left-[8%] top-[12%] z-10 max-w-[390px] xl:left-[10%] xl:top-[13%]">
          <div className="mb-3 h-[2px] w-8 bg-emerald-800" />

          <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight text-slate-950 xl:text-[32px]">
            Join ShopEase
            <span className="block text-emerald-800">Today</span>
          </h2>

          <p className="mt-2 max-w-[300px] text-sm leading-5 text-slate-600 xl:text-base">
            Get exclusive deals, faster checkout and a better shopping
            experience.
          </p>

          {/* Benefits */}
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-800/10 text-emerald-800">
                <Truck size={21} strokeWidth={1.7} />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-900 xl:text-sm">
                  Free Shipping
                </p>
                <p className="mt-0.5 text-xs text-slate-600">
                  On orders over $50
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-800/10 text-emerald-800">
                <ShieldCheck size={21} strokeWidth={1.7} />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-900 xl:text-sm">
                  Secure Payment
                </p>
                <p className="mt-0.5 text-xs text-slate-600">
                  100% secure checkout
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-800/10 text-emerald-800">
                <PackageCheck size={21} strokeWidth={1.7} />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-900 xl:text-sm">
                  30-Day Returns
                </p>
                <p className="mt-0.5 text-xs text-slate-600">
                  Hassle-free returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Register;
