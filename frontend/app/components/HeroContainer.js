import React from 'react';

import NewsletterForm from './ui/NewsletterForm';

const HeroContainer = () => (
  <div id="hero-container" className="flex-rows flex-end flex-4">
    <div className="flex-columns flex-between items-end">
      <div className="flex-1 items-end col-50">
        <h2 className="logo">
          <span>
            ASSEC <small>beta</small>
          </span>
        </h2>
        <h1 className="baseline">
          <span>
            <strong>
              L&apos;outil qui vous informe des règles de partage de l&apos;eau
              en période de sécheresse
            </strong>
          </span>
        </h1>
        <hr className="liner my20" />
        <NewsletterForm placeholder="Votre email"
          className="notice mb12"
          label="Tenez moi informé des développements d'ASSEC" />
      </div>
      <div className="flex-1 col-50" />
    </div>
    <span className="more pb20 pt80">
      <i className="ico icon-down-open-big" />
    </span>
  </div>
);

export default HeroContainer;
