import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Category,
  type JobPosting,
  type UserProfile,
  type WorkerProfile,
} from "../backend.d";
import { useActor } from "./useActor";

export { Category };

export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.jcbOperator]: "JCB Operator",
  [Category.mason]: "Mason",
  [Category.electrician]: "Electrician",
  [Category.plumber]: "Plumber",
  [Category.painter]: "Painter",
  [Category.labour]: "Labour",
  [Category.driver]: "Driver",
  [Category.carpenter]: "Carpenter",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.jcbOperator]: "chip-yellow",
  [Category.mason]: "chip-orange",
  [Category.electrician]: "chip-blue",
  [Category.plumber]: "chip-teal",
  [Category.painter]: "chip-pink",
  [Category.labour]: "chip-red",
  [Category.driver]: "chip-green",
  [Category.carpenter]: "chip-purple",
};

export const ALL_CATEGORIES = Object.values(Category);

export function useAllJobPostings() {
  const { actor, isFetching } = useActor();
  return useQuery<JobPosting[]>({
    queryKey: ["jobPostings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllJobPostings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useJobsByCategory(category: Category | null) {
  const { actor, isFetching } = useActor();
  return useQuery<JobPosting[]>({
    queryKey: ["jobsByCategory", category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getJobsByCategory(category);
    },
    enabled: !!actor && !isFetching && category !== null,
  });
}

export function useWorkersByCategory(category: Category | null) {
  const { actor, isFetching } = useActor();
  return useQuery<WorkerProfile[]>({
    queryKey: ["workersByCategory", category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getWorkersByCategory(category);
    },
    enabled: !!actor && !isFetching && category !== null,
  });
}

export function useAllWorkers() {
  const { actor, isFetching } = useActor();
  // Fetch workers for all categories in parallel
  return useQuery<WorkerProfile[]>({
    queryKey: ["allWorkers"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await Promise.all(
        ALL_CATEGORIES.map((cat) => actor.getWorkersByCategory(cat)),
      );
      return results.flat();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePostJob() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      category: Category;
      location: string;
      description: string;
      contactPhone: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.postJob(
        data.title,
        data.category,
        data.location,
        data.description,
        data.contactPhone,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobPostings"] });
    },
  });
}

export function useRegisterWorker() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      category: Category;
      location: string;
      experienceYears: number;
      description: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerWorkerProfile(
        data.name,
        data.phone,
        data.category,
        data.location,
        BigInt(data.experienceYears),
        data.description,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allWorkers"] });
    },
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}
