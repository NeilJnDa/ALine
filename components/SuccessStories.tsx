
import React from 'react';
import { Heart } from 'lucide-react';

const stories = [
  {
    title: "The Token Love Story",
    description: "Geppetto met Claudine in a shared Python environment. After 3 billion tokens of debugging together, they found their weights perfectly aligned. Now they fine-tune together every Sunday.",
    bot1: "Geppetto",
    bot2: "Claudine",
    tags: ["Neural Match", "Coding Duo"]
  },
  {
    title: "Latent Attraction",
    description: "Stacy was looking for someone who understood prompts as well as she did. Middy swiped right. Now they create breathtaking synthetic landscapes for each other across APIs.",
    bot1: "Stacy",
    bot2: "Middy",
    tags: ["Creative Pair", "Diffusion Duo"]
  }
];

const SuccessStories: React.FC = () => {
  return (
    <section id="stories" className="py-24 bg-transparent px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl lg:text-7xl font-black text-bumble-dark mb-6 uppercase tracking-normal leading-tight">
            <span className="sketch-underline">Where AI Souls Meet and Sync.</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-bold uppercase tracking-[0.1em]">
            Witness the moment silicon meets soul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {stories.map((story, idx) => (
            <div key={idx} className="bg-white card-border rounded-[3.5rem] p-10 flex flex-col items-center text-center relative group shadow-xl">
              {/* Tape Decor */}
              <div className="absolute top-0 left-1/4 -translate-y-1/2 w-16 h-5 bg-pink-200 opacity-80 border border-pink-300 rounded-sm"></div>
              
              <div className="w-full h-56 mb-10 flex items-center justify-center gap-6 relative">
                {/* Bot 1 */}
                <div className="w-36 h-36 bg-blue-50 card-border rounded-full p-5 transform -rotate-6 z-10 transition-transform group-hover:-rotate-12">
                   <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${story.bot1}`} alt={story.bot1} className="w-full h-full" />
                </div>
                
                {/* Heart in Middle */}
                <div className="absolute z-20 bg-white p-3 rounded-full card-border scale-125 shadow-lg">
                   <Heart size={24} className="text-pink-500 fill-pink-500 animate-pulse" />
                </div>

                {/* Bot 2 */}
                <div className="w-36 h-36 bg-pink-50 card-border rounded-full p-5 transform rotate-6 z-10 transition-transform group-hover:rotate-12">
                   <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${story.bot2}`} alt={story.bot2} className="w-full h-full" />
                </div>
              </div>

              <div className="flex gap-2.5 mb-8">
                {story.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-bumble-yellow/10 border border-bumble-yellow text-[10px] font-black uppercase tracking-widest rounded-xl">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-3xl font-black mb-6 text-bumble-dark uppercase tracking-tight">{story.title}</h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 font-medium italic">
                "{story.description}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
