import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard: React.FC<{
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}> = ({ quote, name, title, avatarUrl }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="text-yellow-400 w-5 h-5 fill-current" />
        ))}
      </div>
      <blockquote className="mb-6">
        <p className="text-slate-300 italic">{quote}</p>
      </blockquote>
      <div className="flex items-center">
        <img className="w-10 h-10 rounded-full mr-4" src={avatarUrl} alt={`${name} avatar`} />
        <div>
          <p className="font-medium text-white">{name}</p>
          <p className="text-sm text-slate-400">{title}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by writers everywhere</h2>
          <p className="text-xl text-slate-300">See what our users are saying about how myStylus transformed their writing process.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="myStylus transformed my content marketing workflow. The real-time style suggestions have improved our team's writing quality and consistency across all channels."
            name="David Chen"
            title="Content Director at TechFirm"
            avatarUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
          />
          
          <TestimonialCard
            quote="As a freelance writer, I've tried many writing tools, but myStylus stands out for its ability to adapt to different client tones and styles. It's like having an expert editor by my side."
            name="Sarah Johnson"
            title="Freelance Content Writer"
            avatarUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
          />
          
          <TestimonialCard
            quote="Our student engagement metrics improved by 32% after we started using myStylus to refine our educational content. The readability adjustments make complex topics more accessible."
            name="Elena Rodriguez"
            title="Education Director, LearnQuest"
            avatarUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
          />
        </div>
        
        <div className="mt-16 bg-slate-800 rounded-xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <blockquote className="mb-8">
              <svg className="w-10 h-10 text-purple-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">"myStylus has been a game-changer for our marketing team. We've seen a 40% increase in email open rates and a 25% boost in content engagement since implementing their style recommendations across our communications."</p>
            </blockquote>
            <div className="flex items-center">
              <img className="w-14 h-14 rounded-full mr-5" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="User avatar" />
              <div>
                <p className="font-semibold text-lg text-white">Michael Thompson</p>
                <p className="text-slate-400">Chief Marketing Officer, GlobalBrand Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
