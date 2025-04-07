import React from 'react';

interface TestimonialProps {
  image: string;
  quote: string;
  name: string;
  university: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ image, quote, name, university }) => (
  <div className="flex-shrink-0 w-[280px] md:w-full flex flex-col items-start p-6 border border-[#E8E8E5] rounded-[1.25rem] lg:rounded-[2rem] h-full font-aeonik">
    <img src={image} alt={name} className="w-16 lg:w-[100px] h-16 lg:h-[100px] mb-4" />
    <p className="text-[#232323] mb-6 text-sm md:text-sm lg:text-base leading-relaxed">{quote}</p>
    <div className="mt-auto">
      <p className="font-medium text-xl md:text-base lg:text-[1.25rem]">{name}</p>
      <p className="text-[#232323] text-sm md:text-xs lg:text-sm">{university}</p>
    </div>
  </div>
);

const CTA: React.FC = () => {
  return (
    <section className="pt-0 pb-20 bg-[#FFFFFF] font-aeonik">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="mb-12 text-left">
            <h2 className="text-[2rem] lg:text-[3.25rem] font-medium leading-[1.2] lg:leading-[3.75rem] text-[#232323] max-w-none">
              Para estudantes, pesquisadores, profissionais e todos os intermediários
            </h2>
          </div>

          {/* Testimonials Slider/Grid */}
          <div className="mt-8 lg:mt-12 mb-12 lg:mb-[7.5rem]">
            <div className="flex md:grid md:grid-cols-3 md:gap-6 lg:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-[20px] md:pl-0 -mr-4 md:mr-0">
              <div className="snap-start md:snap-none mr-4 md:mr-0">
                <Testimonial
                  image="students1.png"
                  quote="Eu costumava ficar preso reescrevendo o mesmo parágrafo repetidamente. Isso finalmente me mostrou o que estava realmente errado. Minha estrutura estava ruim — corrigi e minha nota subiu!"
                  name="Samantha R."
                  university="Universidade Columbia"
                />
              </div>
              <div className="snap-start md:snap-none mr-4 md:mr-0">
                <Testimonial
                  image="students2.png"
                  quote="Usei na noite anterior ao prazo. Detectou pontos fracos que não vi, especialmente no fluxo do argumento. Fiz algumas edições e obtive a maior nota do semestre."
                  name="Daniel M."
                  university="Universidade de Boston"
                />
              </div>
              <div className="snap-start md:snap-none">
                <Testimonial
                  image="students3.png"
                  quote="Sinceramente, eu só queria saber se meu ensaio estava 'bom o suficiente'. Resultou que algumas seções precisavam de trabalho. As correções foram rápidas e me salvaram de entregar algo incompleto."
                  name="Michael S."
                  university="Universidade da Pensilvânia"
                />
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="text-center">
            <h2 className="text-[2rem] lg:text-[3.25rem] font-medium leading-[1.2] lg:leading-[3.75rem] text-[#232323] mb-3 lg:mb-4">
              Comece a citar de forma mais inteligente
            </h2>
            <p className="text-[#3C3C3C] mb-6 lg:mb-10 text-base lg:text-[1.25rem] leading-normal lg:leading-[1.75rem]">
              Encontre as fontes certas, extraia o que importa e cite-as em segundos — tudo em um só lugar
            </p>
            <a href="https://mystylus.ai/sms">
              <button className="w-full md:max-w-[400px] lg:w-auto px-6 lg:px-[3.75rem] py-4 lg:py-[1.125rem] bg-[#232323] text-white rounded-full text-base lg:text-[1.25rem] font-medium mx-auto md:mx-auto">
                Encontrar Fontes
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 