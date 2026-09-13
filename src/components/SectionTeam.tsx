import { motion } from 'framer-motion';

const team = [
  { 
    name: 'Souradeep Pradhan', 
    role: 'Full Stack Dev', 
    image: '/teams/souradeep (2).png',
    github: '#', website: '#', linkedin: '#' 
  },
  { 
    name: 'Sattwik Das', 
    role: 'Full Stack Dev', 
    image: '/teams/sattwik.png',
    github: '#', website: '#', linkedin: '#' 
  },
  { 
    name: 'Sampurna Chandra', 
    role: 'Full Stack Dev', 
    image: '/teams/sampurna.png',
    github: '#', website: '#', linkedin: '#' 
  },
  { 
    name: 'Soyuz Paul', 
    role: 'Full Stack Dev', 
    image: '/teams/souyz.png',
    github: '#', website: '#', linkedin: '#' 
  },
];

export function SectionTeam() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1000px] px-4 pt-40 lg:pt-52 pb-24 bg-paper">
      <div className="flex flex-col items-center mb-24">
        <motion.div 
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center font-clicky-oracle text-[40px] md:text-[56px] text-primary leading-none tracking-[-1.52px] mb-4">
            Made with love by devs for the devs
          </h2>
          <p className="text-secondary text-lg text-center font-medium max-w-lg">
            Meet the team behind Clickit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-16 gap-x-6 max-w-[1100px] mx-auto w-full">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group flex justify-center w-full"
            >
              {/* Professional Clean Card (Center Aligned, No Hover) */}
              <div className="flex flex-col items-center text-center w-full px-2">
                
                {/* Large Portrait Image (Professional Rectangle) */}
                <div className="w-full aspect-[4/5] mb-5 drop-shadow-sm">
                  <div className="w-full h-full bg-[#F7F5F3] overflow-hidden rounded-[16px]">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-[center_top] grayscale"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center w-full">
                  <h3 className="text-[19px] font-bold text-primary tracking-tight mb-0.5">{member.name}</h3>
                  <p className="text-secondary/70 text-[13px] font-medium">{member.role}</p>

                  {/* Social SVGs */}
                  <div className="flex items-center gap-3 mt-3.5 text-secondary/40">
                    {/* GitHub */}
                    <a href={member.github} className="hover:text-gray-900 transition-colors" aria-label="GitHub">
                      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    {/* Website */}
                    <a href={member.website} className="hover:text-gray-900 transition-colors" aria-label="Website">
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a href={member.linkedin} className="hover:text-gray-900 transition-colors" aria-label="LinkedIn">
                      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
