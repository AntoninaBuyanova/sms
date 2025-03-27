import React from 'react';

const LogoCloud: React.FC = () => {
  return (
    <section className="py-12 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-600 font-medium mb-8">Trusted by writers and teams from leading companies</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          <img className="h-8 md:h-10" src="https://cdn.worldvectorlogo.com/logos/airbnb-2.svg" alt="Airbnb logo" />
          <img className="h-8 md:h-10" src="https://cdn.worldvectorlogo.com/logos/dropbox-2.svg" alt="Dropbox logo" />
          <img className="h-8 md:h-10" src="https://cdn.worldvectorlogo.com/logos/shopify.svg" alt="Shopify logo" />
          <img className="h-8 md:h-10" src="https://cdn.worldvectorlogo.com/logos/slack-2.svg" alt="Slack logo" />
          <img className="h-8 md:h-10" src="https://cdn.worldvectorlogo.com/logos/spotify-2.svg" alt="Spotify logo" />
          <img className="h-8 md:h-10" src="https://cdn.worldvectorlogo.com/logos/zoom-app.svg" alt="Zoom logo" />
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
