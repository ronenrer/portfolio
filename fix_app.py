import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# Fix 1: className for Regulus card
old_class = "className={`${project.span} relative w-full ${isBoosty ? 'aspect-[3840/1984]' : project.id === 'regulus' ? 'h-[450px] md:h-[550px]' : 'h-[350px] sm:h-[400px]'}`}"
new_class = "className={`${project.span} relative w-full ${isBoosty ? 'aspect-[3840/1984]' : project.id === 'regulus' ? 'h-auto' : 'h-[350px] sm:h-[400px]'}`}"

if old_class in content:
    content = content.replace(old_class, new_class)
else:
    print("Warning: could not find class line")

# Fix 2: Regulus inner div blocks

old_regulus_block = """        ) : project.id === 'regulus' ? (
          <div className="absolute inset-0 bg-[#1e2025] flex flex-col overflow-hidden">
            {/* Background Image Container */}
            <div className="relative h-[72%] w-full flex items-end justify-center pt-8 pr-8 pb-0 pl-0">
              <picture className="absolute inset-0 group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out flex">
                <source type="image/webp" srcSet={`${regulus1x} 1x, ${regulus2x} 2x`} />
                <img src={regulusFallback} alt="Regulus Core Interface" className="w-full h-full object-contain object-bottom" loading="lazy" />
              </picture>
            </div>
            
            {/* Lower Text Box Container */}
            <div className="relative h-[28%] bg-surface w-full z-20">
              {/* Tag Pill Layer - Pulled up to sit on the dividing line */}
              <div className="absolute left-8 top-0 -translate-y-[100%] bg-surface px-6 py-3 border border-b-0 border-arch shadow-sm z-30 flex items-center justify-center">
                <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em]">{project.tag}</span>
              </div>
              
              {/* Main Title Block */}
              <div className="w-full h-full p-8 flex flex-col justify-end border-t border-r border-arch">
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter text-primary uppercase">{project.title}</h3>
              </div>
            </div>
          </div>
        ) : ("""

new_regulus_block = """        ) : project.id === 'regulus' ? (
          <div className="w-full h-full bg-[#1e2025] flex flex-col overflow-hidden">
            {/* Background Image Container with fixed 19/10 aspect ratio */}
            <div className="relative w-full aspect-[19/10] overflow-hidden shrink-0">
              <picture className="absolute inset-0 group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out flex">
                <source type="image/webp" srcSet={`${regulus1x} 1x, ${regulus2x} 2x`} />
                <img src={regulusFallback} alt="Regulus Core Interface" className="w-full h-full object-cover object-top" loading="lazy" />
              </picture>
            </div>
            
            {/* Lower Text Box Container */}
            <div className="w-full shrink-0 bg-surface flex flex-col justify-center border-t border-r border-arch p-8 relative z-20">
              <div className="mb-2 text-[12px] font-bold text-primary uppercase tracking-[0.2em]">{project.tag}</div>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter text-primary uppercase">{project.title}</h3>
            </div>
          </div>
        ) : ("""

if old_regulus_block in content:
    content = content.replace(old_regulus_block, new_regulus_block)
else:
    print("Warning: could not find regulus block")

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Done")
