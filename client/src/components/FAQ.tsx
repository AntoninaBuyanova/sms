import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <div className="py-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{question}</h3>
      <p className="text-slate-600">{answer}</p>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How does myStylus improve my writing?",
      answer: "myStylus uses advanced AI to analyze your text and provide real-time suggestions for improving style, clarity, engagement, and impact. It identifies areas where your writing could be more effective and offers specific recommendations tailored to your target audience and goals."
    },
    {
      question: "Can I use myStylus with my existing tools?",
      answer: "Yes! myStylus integrates seamlessly with popular writing platforms including Google Docs, Microsoft Word, WordPress, and more through our browser extension. You can also use our web app independently or via our API for custom integrations."
    },
    {
      question: "Is my content secure with myStylus?",
      answer: "Absolutely. We take data security seriously. Your content is encrypted in transit and at rest, and we never store your writing permanently without permission. We do not use your content to train our models, and you can easily delete your data at any time."
    },
    {
      question: "What types of writing does myStylus support?",
      answer: "myStylus supports virtually any type of writing, including business emails, marketing content, academic papers, creative writing, social media posts, technical documentation, and more. Our style tuning feature allows you to customize suggestions based on your specific writing context."
    },
    {
      question: "Can I change plans or cancel my subscription?",
      answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings. If you cancel, you'll continue to have access until the end of your current billing period, and we don't charge any cancellation fees."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently asked questions</h2>
          <p className="text-xl text-slate-600">Everything you need to know about myStylus.</p>
        </div>
        
        <div className="max-w-4xl mx-auto divide-y divide-slate-200">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
            View all FAQ
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
