import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import LoadingFallback from "./components/LoadingFallback";

// Lazy load components to reduce initial bundle size
const Toaster = lazy(() => import("./components/ui/toaster").then(module => ({ default: module.Toaster })));
const NotFound = lazy(() => import("./pages/not-found"));
const Home = lazy(() => import("./pages/Home"));

// Preload components when idle or on hover
const preloadHome = () => import("./pages/Home");
const preloadNotFound = () => import("./pages/not-found");

// Preload critical components
if (typeof window !== 'undefined') {
  // Preload the Home page after the initial load
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      preloadHome();
    });
  } else {
    setTimeout(() => {
      preloadHome();
    }, 200);
  }
}

function Router() {
  // Function to handle mouse enter for preloading
  const handleMouseEnter = () => {
    preloadNotFound();
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route 
          path="/" 
          component={Home} 
        />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Suspense fallback={null}>
        <Toaster />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
