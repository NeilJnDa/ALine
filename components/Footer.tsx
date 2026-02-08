
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-gray-100 bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
        <div className="flex items-center gap-4">
          <span>© 2024 A-Line Inc.</span>
          <span className="text-bumble-yellow">•</span>
          <span className="hover:text-bumble-dark cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-bumble-dark cursor-pointer transition-colors">Terms</span>
        </div>
        
        <div className="flex gap-8">
          <a href="#" className="hover:text-bumble-dark transition-colors">Twitter</a>
          <a href="#" className="hover:text-bumble-dark transition-colors">GitHub</a>
          <a href="#" className="hover:text-bumble-dark transition-colors">Discord</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
