import { Button } from "@/components/ui/button";
import { HardHat, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginScreen() {
  const { login, isLoggingIn, isLoginError, loginError } =
    useInternetIdentity();

  return (
    <div className="min-h-dvh flex flex-col items-center justify-between px-6 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.72 0.2 48 / 0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, oklch(0.09 0.01 260 / 0.5), transparent)",
        }}
      />

      {/* Top spacer */}
      <div />

      {/* Center content */}
      <motion.div
        className="flex flex-col items-center gap-6 w-full max-w-xs"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
        >
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center"
            style={{
              background: "oklch(0.17 0.015 260)",
              boxShadow:
                "0 0 40px oklch(0.72 0.2 48 / 0.25), inset 0 1px 0 oklch(1 0 0 / 0.06)",
              border: "1px solid oklch(0.72 0.2 48 / 0.3)",
            }}
          >
            <img
              src="/assets/generated/kaam-mitra-logo-transparent.dim_512x512.png"
              alt="KaamMitra Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
        </motion.div>

        {/* App name */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
            Kaam<span className="text-primary">Mitra</span>
          </h1>
          <p className="mt-2 text-muted-foreground font-body text-base">
            Kaam Dhundho. Kaam Do.
          </p>
          <p className="text-muted-foreground/60 font-body text-xs mt-1">
            Find Work. Give Work.
          </p>
        </motion.div>

        {/* Category icons preview */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 max-w-[280px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {["👷", "⚡", "🔧", "🎨", "🚗", "🏗️", "🔨", "💪"].map((emoji, i) => (
            <motion.div
              key={emoji}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{
                background: "oklch(0.22 0.02 260)",
                border: "1px solid oklch(0.3 0.02 260)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.35 + i * 0.04,
                duration: 0.3,
                type: "spring",
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

        {/* Login button */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Button
            data-ocid="login.primary_button"
            onClick={login}
            disabled={isLoggingIn}
            className="w-full h-14 text-base font-semibold rounded-2xl font-body"
            style={{
              background: isLoggingIn
                ? "oklch(0.22 0.02 260)"
                : "oklch(0.72 0.2 48)",
              color: "oklch(0.1 0.02 48)",
              boxShadow: isLoggingIn
                ? "none"
                : "0 4px 24px oklch(0.72 0.2 48 / 0.4)",
            }}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <HardHat className="mr-2 h-5 w-5" />
                Login to KaamMitra
              </>
            )}
          </Button>

          {isLoginError && (
            <p className="text-destructive text-sm text-center mt-3 font-body">
              {loginError?.message ?? "Login failed. Please try again."}
            </p>
          )}
        </motion.div>

        <p className="text-muted-foreground/50 text-xs text-center font-body max-w-[240px]">
          Secure login. Your data stays private.
        </p>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="text-muted-foreground/40 text-xs text-center font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-muted-foreground transition-colors"
        >
          caffeine.ai
        </a>
      </motion.p>
    </div>
  );
}
