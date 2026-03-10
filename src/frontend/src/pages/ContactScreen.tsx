import { ArrowLeft, Globe, HardHat, Heart, Mail } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  onBack: () => void;
}

export default function ContactScreen({ onBack }: Props) {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header */}
      <header className="px-5 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            style={{
              background: "oklch(0.22 0.02 260)",
              border: "1px solid oklch(0.3 0.02 260)",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-heading text-xl font-bold">Contact & About</h1>
            <p className="text-muted-foreground font-body text-xs">
              Learn more about KaamMitra
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 pb-8 space-y-5">
        {/* App info card */}
        <motion.div
          className="p-6 rounded-2xl text-center"
          style={{
            background: "oklch(0.17 0.015 260)",
            border: "1px solid oklch(0.25 0.015 260)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: "oklch(0.72 0.2 48 / 0.15)",
              border: "1px solid oklch(0.72 0.2 48 / 0.3)",
            }}
          >
            <img
              src="/assets/generated/kaam-mitra-logo-transparent.dim_512x512.png"
              alt="KaamMitra"
              className="w-14 h-14 object-contain"
            />
          </div>
          <h2 className="font-heading text-2xl font-bold">
            Kaam<span className="text-primary">Mitra</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-2">
            Connecting Workers & Employers
          </p>
          <p className="text-muted-foreground/60 font-body text-xs mt-1">
            Kaam Dhundho. Kaam Do.
          </p>
        </motion.div>

        {/* About section */}
        <motion.div
          className="p-5 rounded-2xl space-y-4"
          style={{
            background: "oklch(0.17 0.015 260)",
            border: "1px solid oklch(0.25 0.015 260)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="font-heading font-semibold text-base">
            About KaamMitra
          </h3>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            KaamMitra is a platform designed to bridge the gap between skilled
            workers and those who need their services. Whether you're a mason,
            electrician, plumber, or any skilled professional, KaamMitra helps
            you find work and get hired.
          </p>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            For employers, find trusted, verified workers across 8 skilled
            categories right in your area.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="p-5 rounded-2xl"
          style={{
            background: "oklch(0.17 0.015 260)",
            border: "1px solid oklch(0.25 0.015 260)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-heading font-semibold text-base mb-3">
            Available Categories
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "JCB Operator", emoji: "🏗️" },
              { label: "Mason", emoji: "🧱" },
              { label: "Electrician", emoji: "⚡" },
              { label: "Plumber", emoji: "🔧" },
              { label: "Painter", emoji: "🎨" },
              { label: "Labour", emoji: "💪" },
              { label: "Driver", emoji: "🚗" },
              { label: "Carpenter", emoji: "🔨" },
            ].map((cat) => (
              <div
                key={cat.label}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                style={{ background: "oklch(0.22 0.02 260)" }}
              >
                <span className="text-xl">{cat.emoji}</span>
                <span className="font-body text-sm font-medium">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="p-5 rounded-2xl space-y-3"
          style={{
            background: "oklch(0.17 0.015 260)",
            border: "1px solid oklch(0.25 0.015 260)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="font-heading font-semibold text-base">Get in Touch</h3>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.22 0.02 260)" }}
            >
              <HardHat className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-body text-sm font-medium">Support</p>
              <p className="text-muted-foreground font-body text-xs">
                Available 9am - 6pm
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.22 0.02 260)" }}
            >
              <Globe className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-body text-sm font-medium">
                KaamMitra Platform
              </p>
              <p className="text-muted-foreground font-body text-xs">
                Powered by Internet Computer
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="px-5 pb-8 text-center">
        <p className="text-muted-foreground/40 text-xs font-body flex items-center justify-center gap-1">
          © {new Date().getFullYear()}. Built with{" "}
          <Heart className="w-3 h-3 text-primary" fill="currentColor" /> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-muted-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
