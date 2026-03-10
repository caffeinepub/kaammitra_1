import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSaveUserProfile } from "../hooks/useQueries";

interface Props {
  onComplete: () => void;
}

export default function ProfileSetupScreen({ onComplete }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { mutateAsync, isPending } = useSaveUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Please enter your name and phone number");
      return;
    }
    try {
      await mutateAsync({ name: name.trim(), phone: phone.trim() });
      toast.success("Profile saved! Welcome to KaamMitra");
      onComplete();
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        className="w-full max-w-xs"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-8">
          <img
            src="/assets/generated/kaam-mitra-logo-transparent.dim_512x512.png"
            alt="KaamMitra"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h2 className="font-heading text-2xl font-bold">
            Setup Your Profile
          </h2>
          <p className="text-muted-foreground text-sm mt-2 font-body">
            Tell us a bit about yourself to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="setup-name"
              className="font-body text-sm font-medium"
            >
              Full Name
            </Label>
            <Input
              id="setup-name"
              data-ocid="profile_setup.input"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl bg-card border-border font-body"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="setup-phone"
              className="font-body text-sm font-medium"
            >
              Phone Number
            </Label>
            <Input
              id="setup-phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 rounded-xl bg-card border-border font-body"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 rounded-xl font-body font-semibold text-base mt-2"
            style={{
              background: "oklch(0.72 0.2 48)",
              color: "oklch(0.1 0.02 48)",
              boxShadow: "0 4px 20px oklch(0.72 0.2 48 / 0.35)",
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Get Started →"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
