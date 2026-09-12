import { useState } from 'react';
import { motion } from 'framer-motion';

export function SectionPricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "free",
      desc: "see what the fuss is about.",
      subdesc: "best for trying it out",
      priceMonthly: "$0",
      priceYearly: "$0",
      priceSubMonthly: "free forever, no card needed",
      priceSubYearly: "free forever, no card needed",
      buttonText: "start free",
      popular: false,
      features: [
        "25 talk messages a month",
        "plenty of dictation",
        "25 agent messages a month"
      ]
    },
    {
      name: "pro",
      desc: "talk as much as you want.",
      subdesc: "best for everyday use",
      priceMonthly: "$20",
      priceYearly: "$16",
      priceSubMonthly: "per month, billed monthly",
      priceSubYearly: "per month, billed $192 yearly",
      buttonText: "get pro",
      popular: true,
      features: [
        "unlimited talk",
        "unlimited dictation",
        "150 agent messages a month"
      ]
    },
    {
      name: "max",
      desc: "all the hands you need.",
      subdesc: "best for power users",
      priceMonthly: "$100",
      priceYearly: "$80",
      priceSubMonthly: "per month, billed monthly",
      priceSubYearly: "per month, billed $960 yearly",
      buttonText: "get max",
      popular: false,
      features: [
        "unlimited talk",
        "unlimited dictation",
        "1,000 agent messages a month"
      ]
    }
  ];

  return (
    <motion.section 
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#3b82f6] to-[#93c5fd] py-20 px-4 md:px-8 mt-32 md:mt-40 lg:mt-48"
      initial={{ opacity: 0, y: 40 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut" }} 
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-4xl md:text-[56px] leading-none font-bold text-white mb-4 text-center tracking-tight font-clicky-oracle drop-shadow-sm">
            Simple, transparent pricing.
          </h2>
          <p className="text-white/90 text-lg md:text-xl text-center max-w-lg font-medium drop-shadow-sm">
            Choose the perfect plan for you. No hidden fees.
          </p>
        </div>
        {/* Toggle */}
        <div className="flex items-center gap-1 p-1 bg-white/20 backdrop-blur-md rounded-full mb-12 shadow-inner border border-white/30 relative">
          <button 
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-full font-medium transition-all text-sm md:text-base relative z-10 ${!isYearly ? 'bg-white text-[#3b82f6] shadow-sm' : 'text-white/90 hover:text-white'}`}
          >
            monthly
          </button>
          <button 
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded-full font-medium transition-all text-sm md:text-base relative z-10 ${isYearly ? 'bg-white text-[#3b82f6] shadow-sm' : 'text-white/90 hover:text-white'}`}
          >
            yearly <span className={isYearly ? "text-[#3b82f6]/70" : "text-white/70"}>-20%</span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1000px]">
          {plans.map((p, i) => (
            <div key={i} className="relative flex flex-col h-full mt-4">
              
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-[#b3d4ff] text-[#0d3b66] px-4 py-1 rounded-full text-sm font-semibold shadow-md border border-white/50">
                    popular
                  </div>
                </div>
              )}

              <div className="flex flex-col h-full bg-white/60 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/40 shadow-2xl relative">
                
                {/* macOS Window Header */}
                <div className="h-8 bg-gradient-to-b from-white/80 to-white/40 border-b border-white/30 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                </div>

                <div className="p-8 flex flex-col flex-1 text-center">
                  <h3 className="font-clicky-oracle text-[32px] text-gray-900 mb-2 leading-none font-bold">{p.name}</h3>
                  <p className="text-gray-800 text-lg mb-1">{p.desc}</p>
                  <p className="text-gray-500 text-xs mb-8">{p.subdesc}</p>
                  
                  <div className="border-t border-gray-300/50 pt-8 mb-4">
                    <span className="text-[64px] text-gray-900 leading-none tracking-tight font-medium">
                      {isYearly ? p.priceYearly : p.priceMonthly}
                    </span>
                    <span className="text-gray-500 font-medium text-xl ml-1">/mo</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-6 h-5">
                    {isYearly ? p.priceSubYearly : p.priceSubMonthly}
                  </p>
                  
                  <button className={`w-3/4 mx-auto py-3 rounded-full font-medium text-[18px] transition-all mb-10 shadow-md ${
                    p.popular 
                      ? 'bg-gradient-to-b from-[#60a5fa] to-[#3b82f6] text-white border border-[#2563eb] hover:opacity-90 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]' 
                      : 'bg-gradient-to-b from-white to-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-50 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]'
                  }`}>
                    {p.buttonText}
                  </button>

                  <div className="text-left w-full mt-auto">
                    <p className="text-gray-500 text-sm mb-4">includes</p>
                    <ul className="space-y-3">
                      {p.features.map((f, j) => (
                        <li key={j} className="flex items-start text-gray-800 text-[15px] font-medium">
                          <svg className="w-5 h-5 mr-3 text-gray-900 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" clipRule="evenodd" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Maker Discount Terminal Window */}
        <div className="mt-20 w-full max-w-[800px] relative z-10 pb-10">
          <div className="bg-[#1e1e1e] rounded-[2rem] overflow-hidden shadow-2xl border border-gray-800 relative">
            {/* Terminal Header */}
            <div className="h-8 bg-[#2d2d2d] flex items-center px-4 gap-2 border-b border-black/50">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            
            <div className="p-8 md:p-10 font-mono text-[#d4d4d4] flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1">
                <h4 className="text-xl mb-4 text-white">{'< maker discount >'}</h4>
                <p className="text-[15px] leading-relaxed text-gray-400 max-w-[400px]">
                  if you're making an app, a yt channel, or your own project, show us! we'll give you 50% off your first month on pro to help you out *
                </p>
              </div>
              <div className="shrink-0">
                <button className="bg-white text-black px-8 py-3 rounded-full font-sans font-medium text-lg hover:bg-gray-200 transition-colors shadow-lg">
                  reach out to us
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative icons for terminal */}
          <div className="absolute -bottom-2 md:bottom-2 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors cursor-pointer z-20">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
