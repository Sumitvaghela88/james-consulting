import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full">
      {/* === HERO BANNER === */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img
            src="https://static.wixstatic.com/media/82fcd3_47a465bb9c6f4b52a0cc83f281806af8~mv2.jpg"
            alt="Mountain landscape with hiker"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Hero Content */}
        <div 
          className="relative mt-32 z-10 h-full flex items-center justify-center"
          style={{
            opacity: 1 - (scrollY / 500),
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        >
          <div className="bg-white/95 backdrop-blur-sm px-12 py-16 max-w-2xl mx-4 text-center shadow-2xl">
            <p className="text-lg md:text-xl text-gray-700 mb-4 font-light">
              Developing Innovative Strategies
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-gray-900 mb-8">
              ACHIEVING GROWTH
            </h1>
            <button className="border-2 border-gray-800 text-gray-800 px-8 py-3 text-sm font-medium hover:bg-gray-800 hover:text-white transition-all duration-300">
              Free Consultation
            </button>
          </div>
        </div>
      </div>

      {/* === FEATURE SECTION === */}
      <div className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          
          {/* SERVICES */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-light tracking-wider text-gray-900 mb-6">
              SERVICES
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              I'm a paragraph. Click here to add your own text and edit me. It's easy. 
              Just click "Edit Text" or double click me to add your own content and make 
              changes to the font. I'm a great place for you to tell a story and let your 
              users know a little more about you.
            </p>
            <button className="border-2 border-gray-700 text-gray-700 py-2.5 px-8 text-sm font-medium hover:bg-gray-700 hover:text-white transition-all duration-300">
              More Info
            </button>
          </div>

          {/* PROJECTS */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-light tracking-wider text-gray-900 mb-6">
              PROJECTS
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              I'm a paragraph. Click here to add your own text and edit me. It's easy. 
              Just click "Edit Text" or double click me to add your own content and make 
              changes to the font. I'm a great place for you to tell a story and let your 
              users know a little more about you.
            </p>
            <button className="border-2 border-gray-700 text-gray-700 py-2.5 px-8 text-sm font-medium hover:bg-gray-700 hover:text-white transition-all duration-300">
              More Info
            </button>
          </div>

          {/* CLIENTS */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-light tracking-wider text-gray-900 mb-6">
              CLIENTS
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              I'm a paragraph. Click here to add your own text and edit me. It's easy. 
              Just click "Edit Text" or double click me to add your own content and make 
              changes to the font. I'm a great place for you to tell a story and let your 
              users know a little more about you.
            </p>
            <button className="border-2 border-gray-700 text-gray-700 py-2.5 px-8 text-sm font-medium hover:bg-gray-700 hover:text-white transition-all duration-300">
              More Info
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;