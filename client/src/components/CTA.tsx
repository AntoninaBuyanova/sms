import React from 'react';

interface TestimonialProps {
  image: string;
  quote: string;
  name: string;
  university: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ image, quote, name, university }) => (
  <div className="flex flex-col items-start p-6 border border-[#E8E8E5] rounded-[2rem] h-full">
    <img src={image} alt={name} className="w-20 md:w-[100px] h-20 md:h-[100px] mb-4" />
    <p className="text-[#232323] mb-6 text-base leading-relaxed font-aeonik">{quote}</p>
    <div className="mt-auto">
      <p className="font-medium font-aeonik text-[1.25rem]">{name}</p>
      <p className="text-[#232323] text-sm font-aeonik">{university}</p>
    </div>
  </div>
);

const CTA: React.FC = () => {
  return (
    <section className="pt-20 pb-[7.5rem] bg-[#FFFFFF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-[3.25rem] font-aeonik font-medium leading-[3.75rem] text-[#232323] max-w-[62rem]">
          For students, researchers, professionals, and everyone in between
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 mb-[7.5rem]">
          <Testimonial
            image="students1.png"
            quote="I usually got stuck rewriting the same paragraph over and over. This finally showed me what was actually wrong. My structure was off — fixed it, and my grade jumped!"
            name="Samantha R."
            university="Columbia University"
          />
          <Testimonial
            image="students2.png"
            quote="I used it the night before my deadline. It caught weak spots I didn't see, especially in argument flow. I made a few edits and got the highest grade I've had all semester"
            name="Daniel M."
            university="Boston University"
          />
          <Testimonial
            image="students3.png"
            quote="Honestly, I just wanted to know if my essay was 'good enough.' Turned out a few sections needed work. The fixes were fast, and it saved me from turning in something half-baked."
            name="Michael S."
            university="University of Pennsylvania"
          />
        </div>

        {/* Submit CTA */}
        <div className="text-center">
          <h2 className="text-[3.25rem] font-aeonik font-medium leading-[3.75rem] text-[#232323] mb-4">
            Submit your best paper
          </h2>
          <p className="text-[#3C3C3C] mb-10 font-aeonik text-[1.25rem] leading-[1.75rem]">
            Get detailed feedback and make meaningful improvements — in minutes
          </p>
          <button className="px-[3.75rem] py-[1.125rem] bg-[#232323] text-white rounded-full text-[1.25rem] font-aeonik font-medium">
            Enhance my paper
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
