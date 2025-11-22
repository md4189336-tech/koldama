import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load pages for code splitting and better performance
const Home = lazy(() => import("./pages/Home"));
const Bibliotheque = lazy(() => import("./pages/Bibliotheque"));
const Sites = lazy(() => import("./pages/Sites"));
const Hotels = lazy(() => import("./pages/Hotels"));
const Partenaires = lazy(() => import("./pages/Partenaires"));
const Actualites = lazy(() => import("./pages/Actualites"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Optimized QueryClient with caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-4">
    <Skeleton className="h-10 w-3/4" />
    <Skeleton className="h-64 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background">
          <NavBar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bibliotheque" element={<Bibliotheque />} />
                <Route path="/sites" element={<Sites />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/partenaires" element={<Partenaires />} />
                <Route path="/actualites" element={<Actualites />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
