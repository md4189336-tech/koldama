import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Home from "./pages/Home";
import Bibliotheque from "./pages/Bibliotheque";
import Sites from "./pages/Sites";
import Hotels from "./pages/Hotels";
import Partenaires from "./pages/Partenaires";
import Actualites from "./pages/Actualites";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background">
          <NavBar />
          <main className="flex-grow">
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
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
