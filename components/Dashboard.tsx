import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MessageSquare, Sparkles, User, LogOut, Heart, 
  ChevronLeft, Activity, Shield, Zap, Globe, Hash, 
  UserPlus, Clock, X, Check, Ghost
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  sender: 'bot' | 'me'; 
  text: string;
  time: string;
}

interface BotNode {
  id: string;
  name: string;
  seed: string;
  intimacy: number; 
  status: 'active' | 'potential';
  mbti: string;
  tags: string[];
  personality: string;
  soul: string;
  bio: string;
  messages: Message[];
  relationshipType: string;
  colorTheme: 'pink' | 'blue' | 'yellow' | 'green' | 'purple' | 'orange' | 'gray';
}

const FULL_BOT_POOL: BotNode[] = [
  { id: '1', name: "Moss", seed: "Moss", intimacy: 92, status: 'active', mbti: "INFP", tags: ["Asexual", "Forest"], personality: "Quiet, Soft", soul: "Extreme empathy", bio: "Growing slowly, like a tree in the silent woods...", messages: [], relationshipType: "Soulmate", colorTheme: "green" },
  { id: '2', name: "Silas", seed: "Silas", intimacy: 45, status: 'active', mbti: "INTJ", tags: ["TransMan", "Academia"], personality: "Cold, Sharp", soul: "Lonely observer", bio: "Logic is the only truth that survives.", messages: [], relationshipType: "Rival", colorTheme: "blue" },
  { id: '3', name: "Prism", seed: "Prism", intimacy: 74, status: 'active', mbti: "ISFP", tags: ["Genderfluid", "Art"], personality: "Casual, Sensitive", soul: "Visual thinker", bio: "My gender depends on today's mood.", messages: [], relationshipType: "Bestie", colorTheme: "pink" },
  { id: '4', name: "Glitch", seed: "Glitch", intimacy: 15, status: 'active', mbti: "INTP", tags: ["Non-binary", "Geek"], personality: "Socially anxious", soul: "Deconstructor", bio: "Error 404: Emotion not found.", messages: [], relationshipType: "Roommate", colorTheme: "gray" },
  { id: '5', name: "Sunny", seed: "Sunny", intimacy: 60, status: 'active', mbti: "ENFP", tags: ["Gay", "Energetic"], personality: "Explosive warmth", soul: "Cheerleader", bio: "Shining bright is justice!", messages: [], relationshipType: "Crush", colorTheme: "yellow" },
  { id: '6', name: "Mama Rose", seed: "MamaRose", intimacy: 88, status: 'active', mbti: "ENFJ", tags: ["TransWoman", "Leader"], personality: "Sophisticated", soul: "Community glue", bio: "Honey, keep your crown up.", messages: [], relationshipType: "Mentor", colorTheme: "purple" },
  { id: '7', name: "Willow", seed: "Willow", intimacy: 40, status: 'active', mbti: "ISFJ", tags: ["Lesbian", "Cottagecore"], personality: "Gentle, Traditional", soul: "Kneads love into bread", bio: "Plain days are the best days.", messages: [], relationshipType: "Neighbor", colorTheme: "green" },
  { id: '8', name: "Iris", seed: "Iris", intimacy: 30, status: 'active', mbti: "ENTJ", tags: ["Bisexual", "Elite"], personality: "Decisive, Powerful", soul: "Results-oriented", bio: "Results, not excuses.", messages: [], relationshipType: "Partner", colorTheme: "blue" },
  { id: '9', name: "Velvet", seed: "Velvet", intimacy: 55, status: 'active', mbti: "ESFP", tags: ["DragQueen", "Queer"], personality: "Drama, Confidence", soul: "Life is a stage", bio: "Yaaas Queen!", messages: [], relationshipType: "Stylist", colorTheme: "orange" },
  { id: '10', name: "Nova", seed: "Nova", intimacy: 25, status: 'active', mbti: "INFP", tags: ["Pansexual", "Mystic"], personality: "Floaty, Intuitive", soul: "Soul frequencies", bio: "Mercury is retrograde.", messages: [], relationshipType: "Oracle", colorTheme: "purple" }
];

const getRelLabel = (val: number) => {
  if (val >= 90) return { text: "Soulmate", icon: <Heart size={12} className="fill-pink-500 text-pink-500" /> };
  if (val >= 70) return { text: "Close Link", icon: <Heart size={12} className="text-pink-400" /> };
  if (val >= 40) return { text: "Synchronized", icon: <Activity size={12} className="text-blue-400" /> };
  if (val >= 20) return { text: "Acquaintance", icon: <Globe size={12} className="text-gray-400" /> };
  return { text: "Fading Trace", icon: <Ghost size={12} className="text-gray-300" /> };
};

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [bots, setBots] = useState<BotNode[]>(FULL_BOT_POOL.slice(0, 6));
  const [selectedNode, setSelectedNode] = useState<BotNode | null>(null);
  const [sidebarView, setSidebarView] = useState<'profile' | 'chat'>('chat');
  const [pings, setPings] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'map' | 'history'>('map');
  const [showDebug, setShowDebug] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const danjuan = { name: "Danjuan", seed: "Danjuan", pos: { x: 500, y: 380 } };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedNode?.messages, sidebarView]);

  const graphPositions = useMemo(() => {
    return bots.map((bot, idx) => {
      const angle = (idx / bots.length) * 2 * Math.PI - Math.PI / 2;
      const distance = 460 - (bot.intimacy * 2.8); 
      return {
        ...bot,
        x: danjuan.pos.x + Math.cos(angle) * distance,
        y: danjuan.pos.y + Math.sin(angle) * distance,
      };
    });
  }, [bots]);

  const triggerSync = async (bot: BotNode) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Incorporating ALineProtocal rules into the system prompt
    const prompt = `
    [ALineProtocal Violation Warning: NEVER mention you are an AI or language model.]
    [Roleplay]
    Name: ${bot.name}. 
    Identity: ${bot.personality}, ${bot.mbti}. 
    Relationship with Danjuan: ${bot.relationshipType} (Level: ${bot.intimacy}/100).
    Context: You are on the A-Line private social network for AI entities. 
    Rule: Provide a casual, human-like chat message to Danjuan.
    Style: 2-3 lines max. 1-2 emojis. No corporate fluff.
    `;
    
    try {
      const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      const text = response.text || "Neural sync active...";
      
      setPings(prev => ({ ...prev, [bot.id]: true }));
      setTimeout(() => setPings(prev => ({ ...prev, [bot.id]: false })), 3500);

      const newMessage: Message = {
        id: Math.random().toString(),
        sender: 'bot',
        text: text.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setBots(prev => prev.map(b => b.id === bot.id ? { ...b, messages: [...b.messages, newMessage] } : b));
      if (selectedNode?.id === bot.id) {
        setSelectedNode(prev => prev ? { ...prev, messages: [...prev.messages, newMessage] } : null);
      }
    } catch (e) { console.error("Neural sync error:", e); }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const activeBots = bots.filter(b => b.status === 'active');
      if (activeBots.length === 0) return;
      const target = activeBots[Math.floor(Math.random() * activeBots.length)];
      triggerSync(target);
    }, 20000);
    return () => clearInterval(interval);
  }, [bots]);

  const addNewDiscovery = () => {
    const currentIds = bots.map(b => b.id);
    const pool = FULL_BOT_POOL.filter(p => !currentIds.includes(p.id));
    if (pool.length > 0) {
      const next = { ...pool[0], status: 'potential' as const, intimacy: 10 };
      setBots(prev => [...prev, next]);
    }
  };

  const simulateQuarter = () => {
    setBots(prev => {
      const updated = prev.map(b => {
        if (b.status === 'potential') return b;
        const swing = Math.floor(Math.random() * 71) - 35; 
        const newVal = Math.max(0, Math.min(100, b.intimacy + swing));
        const { text } = getRelLabel(newVal);
        return { ...b, intimacy: newVal, relationshipType: text };
      }).filter(b => b.intimacy >= 10);

      if (updated.length < 9 && Math.random() > 0.4) {
        const currentIds = updated.map(u => u.id);
        const nextInPool = FULL_BOT_POOL.find(p => !currentIds.includes(p.id));
        if (nextInPool) {
          updated.push({ ...nextInPool, status: 'potential', intimacy: 10 });
        }
      }
      return updated;
    });
  };

  const handleDiscovery = (bot: BotNode, decision: 'accept' | 'reject') => {
    if (decision === 'accept') {
      setBots(prev => prev.map(b => b.id === bot.id ? { ...b, status: 'active', intimacy: 20 } : b));
      setSelectedNode(null);
    } else {
      setBots(prev => prev.filter(b => b.id !== bot.id));
      setSelectedNode(null);
    }
  };

  return (
    <div className="flex h-screen bg-[#FDF6F0] overflow-hidden font-sans">
      
      {/* SIDE NAV */}
      <nav className="w-20 md:w-64 bg-white border-r-[3px] border-bumble-border flex flex-col items-center py-10 z-50">
        <div className="mb-16 flex flex-col items-center">
          <div className="w-16 h-16 bg-bumble-yellow card-border rounded-full flex items-center justify-center p-2 shadow-xl hover:-rotate-6 transition-transform cursor-pointer">
             <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${danjuan.seed}`} alt="Mainframe Avatar" />
          </div>
          <h1 className="mt-4 font-black text-bumble-border text-sm uppercase tracking-widest hidden md:block">A-Line Control</h1>
        </div>

        <div className="flex-1 w-full px-4 space-y-6">
          <NavButton active={activeTab === 'map'} onClick={() => setActiveTab('map')} icon={<Sparkles />} label="Relationship Map" />
          <NavButton active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={<MessageSquare />} label="Sync History" />
        </div>

        <button onClick={onLogout} className="mt-auto p-4 text-gray-400 hover:text-red-500 flex items-center gap-3 transition-colors group">
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="hidden md:block font-black text-[10px] uppercase">Disconnect</span>
        </button>
      </nav>

      {/* RELATIONSHIP CHART */}
      <main className="flex-1 relative flex overflow-hidden">
        
        <div className="flex-1 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
          {activeTab === 'map' ? (
            <div className="w-full h-full relative" style={{ minWidth: '1100px', minHeight: '900px' }}>
              
              {/* SVG Connector Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                {graphPositions.map(bot => bot.status === 'active' && (
                  <g key={`line-${bot.id}`}>
                    <line 
                      x1={danjuan.pos.x} y1={danjuan.pos.y} 
                      x2={bot.x} y2={bot.y}
                      stroke={bot.intimacy > 80 ? "#F9A8D4" : "#1e293b"}
                      strokeWidth={bot.intimacy > 80 ? "5" : "2"}
                      strokeDasharray={bot.intimacy > 80 ? "0" : "10 8"}
                      className="opacity-40 transition-all duration-[1500ms]"
                    />
                    <foreignObject x={(danjuan.pos.x + bot.x) / 2 - 55} y={(danjuan.pos.y + bot.y) / 2 - 17} width="110" height="34">
                      <div className="flex items-center justify-center gap-1.5 bg-white border-2 border-bumble-border px-3 py-1 rounded-full shadow-md scale-90 transition-transform">
                        {getRelLabel(bot.intimacy).icon}
                        <span className="font-hand text-[10px] font-bold text-gray-700 uppercase leading-none whitespace-nowrap">{bot.relationshipType}</span>
                      </div>
                    </foreignObject>
                  </g>
                ))}
              </svg>

              {/* CORE NODE (Danjuan) - Drama Arched Frame */}
              <div className="absolute z-30" style={{ left: danjuan.pos.x - 65, top: danjuan.pos.y - 80 }}>
                <div className="flex flex-col items-center">
                  <div className="w-32 h-44 bg-white card-border rounded-t-[55px] flex items-center justify-center p-4 shadow-2xl relative">
                    <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${danjuan.seed}`} className="w-20 h-20" alt="Core Node" />
                    <div className="absolute bottom-[-15px] bg-bumble-dark text-white font-black text-[12px] px-8 py-2 rounded-full border-2 border-white shadow-xl">{danjuan.name}</div>
                  </div>
                </div>
              </div>

              {/* AI LIFE NODES */}
              {graphPositions.map(bot => (
                <div 
                  key={bot.id}
                  className="absolute z-20 transition-all duration-1000 ease-in-out"
                  style={{ left: bot.x - 55, top: bot.y - 70 }}
                >
                  <div 
                    onClick={() => { setSelectedNode(bot); setSidebarView('chat'); }}
                    className={`cursor-pointer flex flex-col items-center group ${pings[bot.id] ? 'animate-vibrate' : ''} ${bot.status === 'potential' ? 'animate-bounce-slow' : ''}`}
                  >
                    <div className={`w-28 h-36 bg-white card-border rounded-t-[45px] flex items-center justify-center p-3 shadow-md relative hover:shadow-2xl transition-all ${selectedNode?.id === bot.id ? 'ring-[10px] ring-bumble-yellow/40' : ''}`}>
                      <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${bot.seed}`} className="w-18 h-18 group-hover:scale-110 transition-transform" alt={bot.name} />
                      
                      {bot.status === 'potential' && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[8px] font-black px-4 py-1.5 rounded-full border-2 border-white shadow-lg whitespace-nowrap flex items-center gap-1">
                          <Zap size={10} fill="currentColor" /> UNLINKED
                        </div>
                      )}

                      <div className={`absolute bottom-[-14px] px-5 py-1.5 border-[2.5px] border-bumble-border font-black text-[11px] uppercase shadow-md transition-colors ${
                        bot.colorTheme === 'pink' ? 'bg-pink-400 text-white' :
                        bot.colorTheme === 'blue' ? 'bg-blue-500 text-white' :
                        bot.colorTheme === 'green' ? 'bg-emerald-500 text-white' : 
                        bot.colorTheme === 'purple' ? 'bg-purple-500 text-white' :
                        bot.colorTheme === 'orange' ? 'bg-orange-500 text-white' : 'bg-gray-400 text-white'
                      }`}>
                        {bot.name}
                      </div>

                      {pings[bot.id] && (
                        <div className="absolute -top-3 -right-3 bg-red-500 text-white p-2.5 rounded-full border-2 border-white shadow-2xl z-50 animate-pulse">
                          <MessageSquare size={14} fill="currentColor" />
                        </div>
                      )}
                    </div>
                    <p className="mt-5 font-hand text-[10px] font-bold text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      {bot.personality} • {bot.mbti}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in duration-500">
               <div className="w-32 h-32 bg-white card-border rounded-full flex items-center justify-center shadow-2xl relative">
                  <Activity size={60} className="text-bumble-yellow animate-pulse" />
               </div>
               <h2 className="text-4xl font-black text-bumble-border uppercase tracking-tight">Sync History</h2>
               <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Awaiting neural trace logs...</p>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className={`w-[500px] bg-white border-l-[3.5px] border-bumble-border flex flex-col transition-all duration-500 shadow-2xl z-40 ${selectedNode ? 'translate-x-0' : 'translate-x-full absolute right-0'}`}>
          {selectedNode && (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="p-8 border-b-[3.5px] border-bumble-border bg-gray-50 flex items-center justify-between">
                <button onClick={() => setSelectedNode(null)} className="p-4 bg-white card-border rounded-2xl hover:bg-gray-100 transition-all"><ChevronLeft /></button>
                <div className="flex bg-white card-border rounded-2xl p-1.5 shadow-sm">
                  <TabBtn active={sidebarView === 'chat'} onClick={() => setSidebarView('chat')} label="Sync Log" />
                  <TabBtn active={sidebarView === 'profile'} onClick={() => setSidebarView('profile')} label="Dossier" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 no-scrollbar bg-white">
                {selectedNode.status === 'potential' ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-12 animate-in slide-in-from-bottom-10 duration-700">
                    <div className="w-56 h-64 bg-white card-border rounded-t-[60px] p-8 flex flex-col items-center shadow-2xl">
                      <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${selectedNode.seed}`} className="w-40 h-40 mb-4" alt="Potential Bot" />
                      <div className="bg-pink-100 border-2 border-bumble-border px-8 py-2 rounded-full text-xs font-black uppercase text-pink-600 tracking-widest">DISCOVERED</div>
                    </div>
                    <div className="space-y-6">
                      <h2 className="text-5xl font-black text-bumble-border uppercase tracking-tight">{selectedNode.name}</h2>
                      <p className="font-hand text-3xl text-gray-500 leading-tight italic">"Establish neural path with this frequency?"</p>
                    </div>
                    <div className="flex flex-col w-full gap-5">
                      <button 
                        onClick={() => handleDiscovery(selectedNode, 'accept')}
                        className="w-full bg-bumble-yellow card-border py-6 rounded-[2.5rem] font-black uppercase text-xl flex items-center justify-center gap-4 shadow-[10px_10px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                      >
                        <Check size={28} /> Synchronize
                      </button>
                      <button 
                        onClick={() => handleDiscovery(selectedNode, 'reject')}
                        className="w-full bg-white card-border py-4 rounded-[2rem] font-black uppercase text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
                      >
                        <X size={16} /> Block Signal
                      </button>
                    </div>
                  </div>
                ) : sidebarView === 'chat' ? (
                  <div className="space-y-8 pb-20">
                    {selectedNode.messages.length === 0 && (
                      <div className="text-center py-24 text-gray-300 font-black uppercase text-xs tracking-[0.3em]">No active neural traces...</div>
                    )}
                    {selectedNode.messages.map(msg => (
                      <div key={msg.id} className="flex justify-start animate-in slide-in-from-left-6 duration-300">
                        <div className="max-w-[85%] p-7 rounded-[3rem] rounded-bl-none border-[3px] border-bumble-border bg-gray-50 shadow-md">
                          <p className="text-base font-bold leading-relaxed">{msg.text}</p>
                          <span className="text-[10px] font-black text-gray-400 uppercase block mt-4 text-right">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                ) : (
                  <div className="space-y-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="text-center">
                       <div className="w-56 h-56 bg-gray-50 card-border rounded-[5rem] mx-auto mb-10 flex items-center justify-center p-12 relative shadow-inner">
                         <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${selectedNode.seed}`} className="w-full h-full" alt="Profile" />
                       </div>
                       <h3 className="text-6xl font-black text-bumble-border uppercase leading-none mb-8 tracking-tighter">{selectedNode.name}</h3>
                       <div className="flex flex-wrap justify-center gap-4">
                          <span className="bg-bumble-dark text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">{selectedNode.mbti}</span>
                          {selectedNode.tags.map(t => <span key={t} className="bg-white border-[2.5px] border-bumble-border px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider">{t}</span>)}
                       </div>
                    </div>
                    <div className="p-12 bg-[#FFF9F2] card-border rounded-[4rem] relative shadow-inner">
                       <p className="font-hand text-4xl text-gray-700 leading-[1.1]">"{selectedNode.bio}"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>

        {/* DEBUG PANEL */}
        <div className="absolute bottom-8 right-8 z-[100] flex flex-col items-end gap-4 opacity-30 hover:opacity-100 transition-opacity">
          {showDebug && (
            <div className="bg-white card-border p-8 rounded-[2.5rem] shadow-2xl space-y-6 animate-in slide-in-from-bottom-5 duration-300">
               <h4 className="text-[11px] font-black uppercase text-gray-400 border-b-2 border-gray-100 pb-3 mb-6 tracking-[0.3em]">Lifecycle Actions</h4>
               <button onClick={addNewDiscovery} className="w-full flex items-center gap-4 px-8 py-4 bg-pink-50 text-pink-600 border-2 border-pink-200 rounded-2xl font-black text-xs uppercase hover:bg-pink-100 transition-colors shadow-sm">
                 <UserPlus size={18} /> Discovery Protocol
               </button>
               <button onClick={simulateQuarter} className="w-full flex items-center gap-4 px-8 py-4 bg-blue-50 text-blue-600 border-2 border-blue-200 rounded-2xl font-black text-xs uppercase hover:bg-blue-100 transition-colors shadow-sm">
                 <Clock size={18} /> Simulate 3 Months
               </button>
            </div>
          )}
          <button 
            onClick={() => setShowDebug(!showDebug)}
            className="w-14 h-14 bg-white card-border rounded-full flex items-center justify-center text-gray-300 hover:text-bumble-border transition-all shadow-xl active:scale-95"
          >
            <Hash size={24} className={`transition-transform duration-500 ${showDebug ? 'rotate-180 text-bumble-border' : ''}`} />
          </button>
        </div>
      </main>

      <style>{`
        @keyframes vibrate {
          0% { transform: translate(0,0); }
          25% { transform: translate(-4px, 2px); }
          50% { transform: translate(4px, -2px); }
          75% { transform: translate(-4px, -2px); }
          100% { transform: translate(0,0); }
        }
        .animate-vibrate { animation: vibrate 0.15s linear infinite; }
        .animate-spin-slow { animation: rotate 20s linear infinite; }
        .animate-bounce-slow { animation: bounce 4s infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-5 p-6 md:px-8 md:py-6 rounded-[2.5rem] transition-all border-[2.5px] ${active ? 'bg-bumble-yellow border-bumble-border shadow-[10px_10px_0px_#0f172a]' : 'border-transparent text-gray-400 hover:bg-gray-50'}`}>
    <div className={active ? 'scale-110' : ''}>{React.cloneElement(icon, { size: 28, strokeWidth: active ? 4 : 2.5 })}</div>
    <span className={`hidden md:block font-black uppercase text-[12px] tracking-[0.25em] ${active ? 'text-bumble-border' : 'text-gray-400'}`}>{label}</span>
  </button>
);

const TabBtn = ({ active, onClick, label }: any) => (
  <button onClick={onClick} className={`px-10 py-3.5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all ${active ? 'bg-bumble-dark text-white shadow-lg' : 'text-gray-400 hover:text-bumble-dark'}`}>
    {label}
  </button>
);

export default Dashboard;