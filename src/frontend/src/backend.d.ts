import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface JobPosting {
    id: Principal;
    title: string;
    description: string;
    category: Category;
    location: string;
    contactPhone: string;
}
export interface WorkerProfile {
    id: Principal;
    name: string;
    description: string;
    experienceYears: bigint;
    category: Category;
    phone: string;
    location: string;
}
export interface UserProfile {
    name: string;
    phone: string;
}
export enum Category {
    mason = "mason",
    plumber = "plumber",
    labour = "labour",
    electrician = "electrician",
    jcbOperator = "jcbOperator",
    painter = "painter",
    driver = "driver",
    carpenter = "carpenter"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllJobPostings(): Promise<Array<JobPosting>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getJobPosting(user: Principal): Promise<JobPosting | null>;
    getJobsByCategory(category: Category): Promise<Array<JobPosting>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWorkerProfile(worker: Principal): Promise<WorkerProfile | null>;
    getWorkersByCategory(category: Category): Promise<Array<WorkerProfile>>;
    isCallerAdmin(): Promise<boolean>;
    postJob(title: string, category: Category, location: string, description: string, contactPhone: string): Promise<void>;
    registerWorkerProfile(name: string, phone: string, category: Category, location: string, experienceYears: bigint, description: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
