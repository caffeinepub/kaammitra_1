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
  usePostJob,
} from "../hooks/useQueries";

interface Props {
  onBack: () => void;
}

export default function PostJobScreen({ onBack }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const { mutateAsync, isPending } = usePostJob();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title.trim() ||
      !category ||
      !location.trim() ||
      !contactPhone.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await mutateAsync({
        title: title.trim(),
        category: category as Category,
        location: location.trim(),
        description: description.trim(),
        contactPhone: contactPhone.trim(),
      });
      toast.success("Job posted successfully!");
      onBack();
    } catch {
      toast.error("Failed to post job. Please try again.");
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
            <h1 className="font-heading text-xl font-bold">Post a Job</h1>
            <p className="text-muted-foreground font-body text-xs">
              Share your work requirement
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
              htmlFor="job-title"
              className="font-body text-sm font-medium"
            >
              Job Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="job-title"
              data-ocid="post_job.input"
              type="text"
              placeholder="e.g., Need Electrician for House Wiring"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 rounded-xl bg-card border-border font-body"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="job-category"
              className="font-body text-sm font-medium"
            >
              Category <span className="text-destructive">*</span>
            </Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as Category)}
            >
              <SelectTrigger
                data-ocid="post_job.select"
                className="h-12 rounded-xl bg-card border-border font-body"
              >
                <SelectValue placeholder="Select a category" />
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
              htmlFor="job-location"
              className="font-body text-sm font-medium"
            >
              Location <span className="text-destructive">*</span>
            </Label>
            <Input
              id="job-location"
              type="text"
              placeholder="e.g., Patna, Bihar"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 rounded-xl bg-card border-border font-body"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-desc" className="font-body text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="job-desc"
              data-ocid="post_job.textarea"
              placeholder="Describe the job requirements in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl bg-card border-border font-body min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="job-phone"
              className="font-body text-sm font-medium"
            >
              Contact Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="job-phone"
              type="tel"
              placeholder="Your phone number"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="h-12 rounded-xl bg-card border-border font-body"
            />
          </div>

          <Button
            type="submit"
            data-ocid="post_job.submit_button"
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...
              </>
            ) : (
              "Post Job"
            )}
          </Button>
        </motion.form>
      </main>
    </div>
  );
}
