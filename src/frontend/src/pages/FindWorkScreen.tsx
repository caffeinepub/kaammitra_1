import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Briefcase, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  ALL_CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  type Category,
  useAllJobPostings,
  useJobsByCategory,
} from "../hooks/useQueries";

interface Props {
  onBack: () => void;
}

export default function FindWorkScreen({ onBack }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const { data: allJobs, isLoading: allLoading } = useAllJobPostings();
  const { data: filteredJobs, isLoading: filteredLoading } =
    useJobsByCategory(selectedCategory);

  const jobs = selectedCategory ? (filteredJobs ?? []) : (allJobs ?? []);
  const isLoading = selectedCategory ? filteredLoading : allLoading;

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header */}
      <header className="px-5 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-4">
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
            <h1 className="font-heading text-xl font-bold">Find Work</h1>
            <p className="text-muted-foreground font-body text-xs">
              Browse available jobs
            </p>
          </div>
        </div>

        {/* Category chips */}
        <div className="chips-scroll">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-body font-medium border transition-all ${
              selectedCategory === null
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            All
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-body font-medium border transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </header>

      {/* Job list */}
      <main className="flex-1 px-5 pb-8">
        {isLoading ? (
          <div data-ocid="find_work.loading_state" className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <motion.div
            data-ocid="find_work.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-5xl mb-4">📋</span>
            <h3 className="font-heading text-lg font-semibold">No Jobs Yet</h3>
            <p className="text-muted-foreground font-body text-sm mt-2">
              {selectedCategory
                ? `No ${CATEGORY_LABELS[selectedCategory]} jobs found`
                : "No jobs posted yet. Check back soon!"}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory ?? "all"}
              data-ocid="find_work.list"
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {jobs.map((job, i) => (
                <motion.div
                  key={job.id.toString()}
                  data-ocid={`find_work.item.${i + 1}`}
                  className="p-4 rounded-2xl"
                  style={{
                    background: "oklch(0.17 0.015 260)",
                    border: "1px solid oklch(0.25 0.015 260)",
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-base truncate">
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-body font-medium border ${CATEGORY_COLORS[job.category]}`}
                        >
                          {CATEGORY_LABELS[job.category]}
                        </span>
                      </div>
                    </div>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.22 0.02 260)" }}
                    >
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  {job.description && (
                    <p className="text-muted-foreground font-body text-sm mt-2 line-clamp-2">
                      {job.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="font-body text-xs">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Phone className="w-3.5 h-3.5" />
                      <span className="font-body text-xs">
                        {job.contactPhone}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
