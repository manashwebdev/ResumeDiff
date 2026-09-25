import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import Landing from "./pages/Landing.jsx";
import Compare from "./pages/Compare.jsx";
import Results from "./pages/Results.jsx";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={setPaletteOpen} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
