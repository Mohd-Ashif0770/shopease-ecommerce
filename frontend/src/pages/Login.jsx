import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";

import { loginSchema } from "../validations/auth.validation";
import { loginAPI } from "../apis/auth.api";
import {
  setCredentials,
  setLoading,
  setError,
  clearAuthError,
} from "../redux/features/authSlice";
import googlIcon from "../assets/google-logo.jpg";
import LoginRightSection from "../components/LoginRightSection";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (formData) => {
    dispatch(setLoading(true));
    dispatch(clearAuthError());

    try {
      const response = await loginAPI(formData);
      const { accessToken, user } = response.data;

      dispatch(setCredentials({ accessToken, user }));

      toast.success(`Welcome back, ${user.name}!`);
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to log in. Please try again.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const inputClass = `
    h-[46px] w-full rounded-xl border border-slate-300
    bg-white pl-[46px] pr-11 text-sm sm:text-base text-slate-900
    placeholder:text-slate-400 outline-none transition
    focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/10
  `;

  return (
    <main className="min-h-screen lg:h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
      {/* LEFT: Login form */}
      <section className="flex flex-col justify-center min-h-screen lg:min-h-0 lg:h-full w-full px-6 py-6 sm:px-12 lg:px-14 xl:px-18 overflow-y-auto">
        <div className="w-full max-w-[420px] mx-auto my-auto">
          <div className="mb-5 sm:mb-6">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl sm:leading-tight">
              Welcome Back
            </h1>

            <p className="mt-1.5 text-sm text-slate-500 sm:text-base">
              Login to your account and continue shopping
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
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
                  className={`${inputClass} ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-slate-900"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  strokeWidth={1.9}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={loading}
                  aria-invalid={Boolean(errors.password)}
                  {...register("password", {
                    onChange: () => dispatch(clearAuthError()),
                  })}
                  className={`${inputClass} ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute cursor-pointer right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-emerald-900"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me / Forgot password */}
            <div className="flex items-center justify-between gap-3 pt-0.5">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4.5 w-4.5 cursor-pointer rounded accent-emerald-800"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-[46px] sm:h-[48px] cursor-pointer w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 text-base font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 sm:my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="whitespace-nowrap text-xs sm:text-sm font-medium text-slate-400">
              or continue with
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google button */}
          <button
            type="button"
            onClick={() => toast.info("Google sign-in will be available soon.")}
            className="flex h-[46px] sm:h-[48px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-slate-300 bg-white text-base font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            <img src={googlIcon} alt="google icon" className="w-6" />
            Continue with Google
          </button>

          {/* Signup */}
          <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-slate-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950"
            >
              Sign up <ArrowRight size={16} />
            </Link>
          </p>
        </div>
      </section>

      {/* RIGHT: Lifestyle panel */}
      <LoginRightSection />
    </main>
  );
};

export default Login;
