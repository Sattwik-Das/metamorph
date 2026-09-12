import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What does Clickit actually do?",
    answer: "Clickit is an AI companion that lives in your macOS menu bar. Using a global push-to-talk hotkey (Ctrl+Option), it instantly captures your screen context and voice commands, allowing you to converse with state-of-the-art AI models about whatever you're looking at."
  },
  {
    question: "Is Clickit free to use?",
    answer: "Yes, Clickit offers a generous free tier that gives you access to essential AI assistance right away. We also have Pro plans for power users needing unlimited access to advanced models like Claude 3.5 Sonnet and Opus."
  },
  {
    question: "Does my data leave my computer?",
    answer: "Your privacy is our top priority. We only capture your screen and voice when you explicitly hold the push-to-talk hotkey. Data is sent securely to our cloud providers for processing the AI response and is never stored permanently or used to train models."
  },
  {
    question: "Which AI models does Clickit use?",
    answer: "Clickit currently uses Anthropic's Claude 3.5 Sonnet by default, with an option to upgrade to Claude 3.5 Opus for advanced reasoning. We also use AssemblyAI for lightning-fast voice transcription and ElevenLabs for natural, conversational voice responses."
  },
  {
    question: "Does it work with multiple monitors?",
    answer: "Yes! Clickit fully supports multi-monitor setups out of the box. The AI cursor overlay will seamlessly follow and point to UI elements across all of your connected displays."
  },
  {
    question: "How do I trigger the push-to-talk feature?",
    answer: "Simply hold down the Ctrl + Option keys on your keyboard anywhere in macOS to start talking to Clickit. A blue cursor will appear to let you know it's listening and looking at your screen."
  }
];

export function SectionFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 mx-auto w-full max-w-[900px] px-4 pt-32 pb-24 lg:pt-48 lg:pb-32 bg-paper">
      <div className="flex flex-col items-center mb-12 md:mb-16">
        <h2 className="text-center font-clicky-oracle text-[40px] md:text-[56px] text-primary leading-none tracking-[-1.52px]">
          Frequently Asked Questions
        </h2>
        <p className="text-secondary text-lg mt-5 text-center font-medium max-w-lg">
          Everything you need to know about how Clickit works and how it respects your privacy.
        </p>
      </div>
      
      <div className="flex flex-col gap-3 mx-auto max-w-[800px]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`rounded-[20px] border bg-white p-6 md:p-8 cursor-pointer transition-all duration-300 ${isOpen ? 'border-primary/20 shadow-md' : 'border-black/5 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-black/10'}`}
              onClick={() => toggle(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-body-large md:text-xl font-medium pr-8 transition-colors ${isOpen ? 'text-primary' : 'text-primary/90'}`}>{faq.question}</h3>
                <div className="relative flex-shrink-0 w-6 h-6 text-secondary flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </motion.div>
                  <motion.div
                    animate={{ rotate: isOpen ? 0 : -180, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute text-primary"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </motion.div>
                </div>
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-body text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
