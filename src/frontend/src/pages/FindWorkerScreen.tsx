import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MapPin, Phone, Star, UserPlus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  ALL_CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  type Category,
  useAllWorkers,
  useWorkersByCategory,
} from "../hooks/useQueries";

interface Props {
  onBack: () => void;
  onRegister: () => void;
}

export default function FindWorkerScreen({ onBack, onRegister }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const { data: allWorkers, isLoading: allLoading } = useAllWorkers();
  const { data: filteredWorkers, isLoading: filteredLoading } =
    useWorkersByCategory(selectedCategory);

  const workers = selectedCategory
    ? (filteredWorkers ?? [])
    : (allWorkers ?? []);
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
          <div className="flex-1">
            <h1 className="font-heading text-xl font-bold">Find Worker</h1>
            <p className="text-muted-foreground font-body text-xs">
              Hire skilled professionals
            </p>
          </div>
          <Button
            data-ocid="find_worker.register.button"
            onClick={onRegister}
            size="sm"
            className="rounded-xl text-xs font-body h-9 px-3"
            style={{
              background: "oklch(0.72 0.2 48)",
              color: "oklch(0.1 0.02 48)",
            }}
          >
            <UserPlus className="w-3.5 h-3.5 mr-1.5" />
            Register
          </Button>
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

      {/* Worker list */}
      <main className="flex-1 px-5 pb-8">
        {isLoading ? (
          <div data-ocid="find_worker.loading_state" className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
        ) : workers.length === 0 ? (
          <motion.div
            data-ocid="find_worker.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-5xl mb-4">👷</span>
            <h3 className="font-heading text-lg font-semibold">
              No Workers Found
            </h3>
            <p className="text-muted-foreground font-body text-sm mt-2">
              {selectedCategory
                ? `No ${CATEGORY_LABELS[selectedCategory]} workers registered yet`
                : "No workers registered yet."}
            </p>
            <Button
              onClick={onRegister}
              className="mt-4 rounded-xl font-body"
              style={{
                background: "oklch(0.72 0.2 48)",
                color: "oklch(0.1 0.02 48)",
              }}
            >
              Register as Worker
            </Button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory ?? "all"}
              data-ocid="find_worker.list"
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {workers.map((worker, i) => (
                <motion.div
                  key={worker.id.toString()}
                  data-ocid={`find_worker.item.${i + 1}`}
                  className="p-4 rounded-2xl"
                  style={{
                    background: "oklch(0.17 0.015 260)",
                    border: "1px solid oklch(0.25 0.015 260)",
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-lg flex-shrink-0"
                      style={{
                        background: "oklch(0.72 0.2 48 / 0.2)",
                        color: "oklch(0.85 0.18 48)",
                      }}
                    >
                      {worker.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 justify-between">
                        <h4 className="font-heading font-semibold text-base truncate">
                          {worker.name}
                        </h4>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-body text-muted-foreground">
                            {Number(worker.experienceYears)} yrs
                          </span>
                        </div>
                      </div>
                      <span
                        className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-body font-medium border ${CATEGORY_COLORS[worker.category]}`}
                      >
                        {CATEGORY_LABELS[worker.category]}
                      </span>
                      {worker.description && (
                        <p className="text-muted-foreground font-body text-sm mt-2 line-clamp-2">
                          {worker.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="font-body text-xs">
                            {worker.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Phone className="w-3.5 h-3.5" />
                          <span className="font-body text-xs">
                            {worker.phone}
                          </span>
                        </div>
                      </div>
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
