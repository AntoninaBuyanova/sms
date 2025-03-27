import React from 'react';

interface TestimonialProps {
  image: string;
  quote: string;
  name: string;
  university: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ image, quote, name, university }) => (
  <div className="flex flex-col items-start">
    <img src={image} alt={name} className="w-16 h-16 rounded-full mb-4" />
    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{quote}</p>
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-gray-500 text-sm">{university}</p>
    </div>
  </div>
);

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-4xl font-normal mb-16 max-w-2xl">
          For students, researchers, professionals, and everyone in between
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <Testimonial
            image="/path/to/samantha.jpg"
            quote="I usually got stuck rewriting the same paragraph over and over. This finally showed me what was actually wrong. My structure was off — fixed it, and my grade jumped!"
            name="Samantha R."
            university="Columbia University"
          />
          <Testimonial
            image="/path/to/daniel.jpg"
            quote="I used it the night before my deadline. It caught weak spots I didn't see, especially in argument flow. I made a few edits and got the highest grade I've had all semester"
            name="Daniel M."
            university="Boston University"
          />
          <Testimonial
            image="/path/to/michael.jpg"
            quote="Honestly, I just wanted to know if my essay was 'good enough.' Turned out a few sections needed work. The fixes were fast, and it saved me from turning in something half-baked."
            name="Michael S."
            university="University of Pennsylvania"
          />
        </div>

        {/* Submit CTA */}
        <div className="text-center">
          <h2 className="text-4xl font-normal mb-4">
            Submit your best paper
          </h2>
          <p className="text-gray-600 mb-8">
            Get detailed feedback and make meaningful improvements — in minutes
          </p>
          <button className="px-8 py-4 bg-black text-white rounded-full text-lg font-medium">
            Enhance my paper
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
