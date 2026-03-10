import { LogOut, Phone, PlusCircle, Search, Users } from "lucide-react";
import { motion } from "motion/react";
import type { Screen } from "../App";
import type { UserProfile } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface ActionCard {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  screen: Screen;
  gradient: string;
  glow: string;
  ocid: string;
}

const ACTION_CARDS: ActionCard[] = [
  {
    id: "find-work",
    label: "Find Work",
    sublabel: "Browse job postings",
    icon: <Search className="w-8 h-8" />,
    screen: "find-work",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.2 48 / 0.3), oklch(0.72 0.2 48 / 0.1))",
    glow: "oklch(0.72 0.2 48 / 0.2)",
    ocid: "home.find_work.button",
  },
  {
    id: "find-worker",
    label: "Find Worker",
    sublabel: "Hire skilled workers",
    icon: <Users className="w-8 h-8" />,
    screen: "find-worker",
    gradient:
      "linear-gradient(135deg, oklch(0.58 0.18 220 / 0.3), oklch(0.58 0.18 220 / 0.1))",
    glow: "oklch(0.58 0.18 220 / 0.2)",
    ocid: "home.find_worker.button",
  },
  {
    id: "post-job",
    label: "Post Job",
    sublabel: "Share your requirement",
    icon: <PlusCircle className="w-8 h-8" />,
    screen: "post-job",
    gradient:
      "linear-gradient(135deg, oklch(0.6 0.18 140 / 0.3), oklch(0.6 0.18 140 / 0.1))",
    glow: "oklch(0.6 0.18 140 / 0.2)",
    ocid: "home.post_job.button",
  },
  {
    id: "contact",
    label: "Contact",
    sublabel: "Help & about us",
    icon: <Phone className="w-8 h-8" />,
    screen: "contact",
    gradient:
      "linear-gradient(135deg, oklch(0.6 0.18 290 / 0.3), oklch(0.6 0.18 290 / 0.1))",
    glow: "oklch(0.6 0.18 290 / 0.2)",
    ocid: "home.contact.button",
  },
];

interface Props {
  onNavigate: (screen: Screen) => void;
  userProfile: UserProfile;
}

export default function HomeScreen({ onNavigate, userProfile }: Props) {
  const { clear } = useInternetIdentity();

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header */}
      <header className="px-5 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/kaam-mitra-logo-transparent.dim_512x512.png"
              alt="KaamMitra"
              className="w-9 h-9 object-contain"
            />
            <h1 className="font-heading text-xl font-bold">
              Kaam<span className="text-primary">Mitra</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-9 px-3 rounded-xl flex items-center gap-2"
              style={{
                background: "oklch(0.22 0.02 260)",
                border: "1px solid oklch(0.3 0.02 260)",
              }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: "oklch(0.72 0.2 48)",
                  color: "oklch(0.1 0.02 48)",
                }}
              >
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-body font-medium max-w-[100px] truncate">
                {userProfile.name.split(" ")[0]}
              </span>
            </div>
            <button
              type="button"
              onClick={clear}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              style={{
                background: "oklch(0.22 0.02 260)",
                border: "1px solid oklch(0.3 0.02 260)",
              }}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Welcome */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-muted-foreground font-body text-sm">Namaste! 🙏</p>
          <h2 className="font-heading text-2xl font-bold mt-1">
            Hello, {userProfile.name.split(" ")[0]}!
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-1">
            What would you like to do today?
          </p>
        </motion.div>
      </header>

      {/* Action Cards */}
      <main className="flex-1 px-5 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {ACTION_CARDS.map((card, i) => (
            <motion.button
              key={card.id}
              data-ocid={card.ocid}
              onClick={() => onNavigate(card.screen)}
              className="relative flex flex-col items-start p-5 rounded-2xl text-left overflow-hidden group"
              style={{
                background: "oklch(0.17 0.015 260)",
                border: "1px solid oklch(0.25 0.015 260)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + i * 0.07,
                duration: 0.4,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: card.gradient }}
              />
              {/* Always visible subtle gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: card.gradient
                    .replace("0.3)", "0.15)")
                    .replace("0.1)", "0.05)"),
                }}
              />

              <div
                className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: card.gradient,
                  boxShadow: `0 4px 16px ${card.glow}`,
                }}
              >
                <div style={{ color: "oklch(0.9 0.05 240)" }}>{card.icon}</div>
              </div>
              <div className="relative z-10">
                <p className="font-heading text-base font-bold text-foreground leading-tight">
                  {card.label}
                </p>
                <p className="text-muted-foreground font-body text-xs mt-1 leading-snug">
                  {card.sublabel}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Categories section */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <h3 className="font-heading text-base font-semibold mb-4">
            Available Categories
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "JCB", emoji: "🏗️" },
              { label: "Mason", emoji: "🧱" },
              { label: "Electric", emoji: "⚡" },
              { label: "Plumber", emoji: "🔧" },
              { label: "Painter", emoji: "🎨" },
              { label: "Labour", emoji: "💪" },
              { label: "Driver", emoji: "🚗" },
              { label: "Carpenter", emoji: "🔨" },
            ].map((cat) => (
              <button
                type="button"
                key={cat.label}
                onClick={() => onNavigate("find-worker")}
                className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl transition-colors hover:bg-card"
                style={{ border: "1px solid oklch(0.25 0.015 260)" }}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-body text-muted-foreground text-center leading-tight">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="px-5 pb-6 text-center">
        <p className="text-muted-foreground/40 text-xs font-body">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
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
