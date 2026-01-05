import React from "react";

const AboutUs = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://static.wixstatic.com/media/82fcd3_96376843bac9407bb5b50891b78b6210~mv2.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-white/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-light tracking-wider text-slate-800 mb-12">
          ABOUT US
        </h2>

        <div className="space-y-6 mb-10">
          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click "Edit 
            Text" or double click me to add your own content and make changes to the font. Feel free 
            to drag and drop me anywhere you like on your page. I'm a great place for you to tell a 
            story and let your users know a little more about you.
          </p>

          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            This is a great space to write a long text about your company and your services. You can 
            use this space to go into a little more detail about your company. Talk about your team 
            and what services you provide. Tell your visitors the story of how you came up with the idea 
            for your business and what makes you different from your competitors. Make your 
            company stand out and show your visitors who you are.
          </p>
        </div>

        <button className="px-8 py-3 border-2 border-slate-700 text-slate-700 font-medium hover:bg-slate-700 hover:text-white transition-all duration-300">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default AboutUs;