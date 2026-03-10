import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  ALL_CATEGORIES,
  CATEGORY_LABELS,
  type Category,
  useRegisterWorker,
} from "../hooks/useQueries";

interface Props {
  onBack: () => void;
}

export default function RegisterWorkerScreen({ onBack }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const { mutateAsync, isPending } = useRegisterWorker();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !category || !location.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await mutateAsync({
        name: name.trim(),
        phone: phone.trim(),
        category: category as Category,
        location: location.trim(),
        experienceYears: Number.parseInt(experience) || 0,
        description: bio.trim(),
      });
      toast.success("Profile registered! You are now visible to employers.");
      onBack();
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

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
            <h1 className="font-heading text-xl font-bold">
              Register as Worker
            </h1>
            <p className="text-muted-foreground font-body text-xs">
              Create your worker profile
            </p>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 px-5 pb-8">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-2">
            <Label
              htmlFor="worker-name"
              className="font-body text-sm font-medium"
            >
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="worker-name"
              data-ocid="register_worker.input"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl bg-card border-border font-body"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="worker-phone"
              className="font-body text-sm font-medium"
            >
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="worker-phone"
              type="tel"
              placeholder="Your contact number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 rounded-xl bg-card border-border font-body"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="worker-cat"
              className="font-body text-sm font-medium"
            >
              Skill / Category <span className="text-destructive">*</span>
            </Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as Category)}
            >
              <SelectTrigger
                data-ocid="register_worker.select"
                className="h-12 rounded-xl bg-card border-border font-body"
              >
                <SelectValue placeholder="Select your skill" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {ALL_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="font-body">
                    {CATEGORY_LABELS[cat]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="worker-loc"
              className="font-body text-sm font-medium"
            >
              Location <span className="text-destructive">*</span>
            </Label>
            <Input
              id="worker-loc"
              type="text"
              placeholder="e.g., Ranchi, Jharkhand"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 rounded-xl bg-card border-border font-body"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="worker-exp"
              className="font-body text-sm font-medium"
            >
              Experience (Years)
            </Label>
            <Input
              id="worker-exp"
              type="number"
              min="0"
              max="50"
              placeholder="e.g., 5"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="h-12 rounded-xl bg-card border-border font-body"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="worker-bio"
              className="font-body text-sm font-medium"
            >
              Short Bio
            </Label>
            <Textarea
              id="worker-bio"
              placeholder="Tell employers about your skills and experience..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="rounded-xl bg-card border-border font-body min-h-[100px] resize-none"
            />
          </div>

          <Button
            type="submit"
            data-ocid="register_worker.submit_button"
            disabled={isPending}
            className="w-full h-12 rounded-xl font-body font-semibold text-base"
            style={{
              background: "oklch(0.72 0.2 48)",
              color: "oklch(0.1 0.02 48)",
              boxShadow: "0 4px 20px oklch(0.72 0.2 48 / 0.35)",
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...
              </>
            ) : (
              "Register as Worker"
            )}
          </Button>
        </motion.form>
      </main>
    </div>
  );
}
