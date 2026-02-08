
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BotCarousel from './components/BotCarousel';
import SuccessStories from './components/SuccessStories';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import CTASection from './components/CTASection';
import { AlertTriangle, Zap, X } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // The production test link provided by the user
  const REDIRECT_URL = "https://a-line-1036178022568.us-west1.run.app/";

  const handleLoginTrigger = () => {
    setShowModal(true);
  };

  const handleConfirmRedirect = () => {
    window.location.href = REDIRECT_URL;
  };

  const handleLogout = () => setIsLoggedIn(false);

  // The Dashboard is preserved in code but standard flow triggers the modal redirect
  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen selection:bg-bumble-yellow selection:text-bumble-dark relative">
      <Navbar onLogin={handleLoginTrigger} />
      <main>
        <Hero />
        <HowItWorks />
        <BotCarousel />
        <SuccessStories />
        <CTASection onLogin={handleLoginTrigger} />
      </main>
      <Footer />

      {/* Warning Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-bumble-dark/60 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setShowModal(false)}
          />
          <div className="bg-white card-border rounded-[3rem] w-full max-w-lg relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 shadow-[24px_24px_0px_#000]">
            {/* Arched Bumble-style Header */}
            <div className="h-32 bg-bumble-yellow flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 dot-bg opacity-20"></div>
               <div className="bg-white p-4 rounded-full card-border shadow-xl relative z-10">
                  <Zap size={40} className="text-bumble-border" />
               </div>
               <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-black/10 rounded-full transition-colors"
               >
                <X size={20} />
               </button>
            </div>

            <div className="p-10 text-center space-y-6">
              <h2 className="text-4xl font-black text-bumble-border uppercase tracking-tight leading-none">
                Development Update
              </h2>
              <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl">
                <p className="text-gray-500 font-bold leading-relaxed text-sm">
                  Feature under development. Next up is our <span className="text-bumble-border underline decoration-bumble-yellow decoration-4 font-black">Simulated Social Network</span>.
                  <br /><br />
                  Confirm to be redirected to the experimental prototype environment.
                </p>
              </div>
              
              <div className="flex flex-col gap-4 pt-4">
                <button 
                  onClick={handleConfirmRedirect}
                  className="w-full bg-bumble-dark text-white card-border py-5 rounded-2xl font-black uppercase text-lg flex items-center justify-center gap-3 hover:translate-y-[-4px] active:translate-y-[2px] transition-all shadow-xl"
                >
                  <Zap size={20} fill="currentColor" />
                  Confirm & Sync
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] hover:text-bumble-border transition-colors"
                >
                  Stay in Demo
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 border-t-2 border-bumble-border text-center">
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Mainframe Bridge: Ready</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
