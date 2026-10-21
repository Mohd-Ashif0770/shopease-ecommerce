import interiorImage from "../assets/login-interior.png";

const LoginRightSection = () => {
  return (
    <aside className="relative hidden h-full w-full overflow-hidden lg:block">
        <img
          src={interiorImage}
          alt="Warm, minimalist living room with an olive armchair and indoor plants"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-linear-to-r from-[#f4f0e8]/30 via-transparent to-transparent" />

        <div className="absolute left-[10%] top-[26%] xl:top-[28%] z-10 max-w-[380px]">
          <div className="mb-4 h-[2px] w-10 bg-emerald-800" />

          <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl xl:text-[35px]">
            Shop Smarter
            <span className="mt-1 block text-emerald-800">Live Better</span>
          </h2>

          <p className="mt-3.5 max-w-[280px] text-sm text-slate-600 sm:text-base xl:text-lg xl:leading-relaxed ">
            Explore thousands of products at the best prices.
          </p>
        </div>
      </aside>
  )
}

export default LoginRightSection