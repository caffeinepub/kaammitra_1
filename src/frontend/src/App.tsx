import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useUserProfile } from "./hooks/useQueries";
import ContactScreen from "./pages/ContactScreen";
import FindWorkScreen from "./pages/FindWorkScreen";
import FindWorkerScreen from "./pages/FindWorkerScreen";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import PostJobScreen from "./pages/PostJobScreen";
import ProfileSetupScreen from "./pages/ProfileSetupScreen";
import RegisterWorkerScreen from "./pages/RegisterWorkerScreen";

export type Screen =
  | "home"
  | "find-work"
  | "find-worker"
  | "post-job"
  | "register-worker"
  | "contact"
  | "profile-setup";

function AuthenticatedApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const { data: userProfile, isLoading } = useUserProfile();

  if (isLoading) {
    return (
      <div className="app-container flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/generated/kaam-mitra-logo-transparent.dim_512x512.png"
            alt="KaamMitra"
            className="w-16 h-16 animate-pulse"
          />
          <p className="text-muted-foreground font-body">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="app-container">
        <ProfileSetupScreen onComplete={() => setScreen("home")} />
      </div>
    );
  }

  return (
    <div className="app-container">
      {screen === "home" && (
        <HomeScreen onNavigate={setScreen} userProfile={userProfile} />
      )}
      {screen === "find-work" && (
        <FindWorkScreen onBack={() => setScreen("home")} />
      )}
      {screen === "find-worker" && (
        <FindWorkerScreen
          onBack={() => setScreen("home")}
          onRegister={() => setScreen("register-worker")}
        />
      )}
      {screen === "post-job" && (
        <PostJobScreen onBack={() => setScreen("home")} />
      )}
      {screen === "register-worker" && (
        <RegisterWorkerScreen onBack={() => setScreen("find-worker")} />
      )}
      {screen === "contact" && (
        <ContactScreen onBack={() => setScreen("home")} />
      )}
    </div>
  );
}

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="app-container flex items-center justify-center min-h-dvh">
        <img
          src="/assets/generated/kaam-mitra-logo-transparent.dim_512x512.png"
          alt="KaamMitra"
          className="w-20 h-20 animate-pulse"
        />
      </div>
    );
  }

  return (
    <>
      {identity ? (
        <AuthenticatedApp />
      ) : (
        <div className="app-container">
          <LoginScreen />
        </div>
      )}
      <Toaster position="top-center" richColors />
    </>
  );
}
