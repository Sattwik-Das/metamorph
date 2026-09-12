import { motion } from 'framer-motion';

export function SectionPricing() {
  const plans = [
    {
      name: "Free",
      desc: "Experience the essential companion.",
      price: "$0",
      features: ["25 voice messages a month", "Standard dictation", "25 agent tasks a month"]
    },
    {
      name: "Pro",
      desc: "Unleash limitless productivity.",
      price: "$20",
      popular: true,
      features: ["Unlimited voice messages", "Unlimited dictation", "150 agent tasks a month"]
    },
    {
      name: "Max",
      desc: "The ultimate AI orchestration.",
      price: "$100",
      features: ["Unlimited voice messages", "Unlimited dictation", "1,000 agent tasks a month"]
    }
  ];

  return (
    <motion.section 
      className="mx-auto mt-30 w-full max-w-[1300px] px-4 lg:mt-50 lg:px-0"
      initial={{ opacity: 0, y: 40 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut" }} 
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="text-center mb-16">
        <h2 className="font-clicky-oracle text-[36px] text-primary leading-none tracking-[-1.44px] lg:text-[66px] lg:tracking-[-2.64px]">
          Choose your Clickit.
        </h2>
        <p className="mt-4 text-[24px] text-secondary tracking-[-0.96px]">
          Elevate your workflow with a plan tailored to your needs. Cancel anytime.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((p, i) => (
          <div 
            key={i} 
            className={`flex flex-col p-8 rounded-3xl border transition-all ${
              p.popular 
                ? 'border-primary shadow-[0_0_40px_rgba(0,0,0,0.1)] lg:-translate-y-4 bg-paper' 
                : 'border-quaternary bg-transparent'
            }`}
          >
            {p.popular && (
              <div className="self-center mb-4 rounded-full bg-button-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-inverted">
                Popular
              </div>
            )}
            <h3 className="font-clicky-oracle text-[32px] text-primary mb-2 leading-none">{p.name}</h3>
            <p className="text-secondary text-sm mb-6">{p.desc}</p>
            <div className="mb-8 font-clicky-oracle">
              <span className="text-[58px] text-primary leading-none tracking-[-2.32px]">{p.price}</span>
              <span className="text-secondary text-[24px]">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-center text-primary text-[18px]">
                  <svg className="w-5 h-5 mr-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-full font-clicky-oracle text-[18px] leading-none tracking-[-0.72px] transition-colors ${
              p.popular 
                ? 'bg-button-primary text-inverted hover:bg-hover-primary' 
                : 'border border-primary text-primary hover:bg-hover-tertiary'
            }`}>
              Choose {p.name}
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-16 max-w-2xl mx-auto text-center p-8 rounded-2xl border border-quaternary bg-paper">
        <h4 className="font-clicky-oracle text-[24px] text-primary mb-2">Creators Program</h4>
        <p className="text-secondary text-[18px]">
          Building something extraordinary? Whether it's an application, content channel, or independent project, apply for our Creators Program to receive 50% off your first month of Pro.
        </p>
      </div>
    </motion.section>
  );
}
