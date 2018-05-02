import React from 'react';

import NewsletterForm from './ui/NewsletterForm';

const HeroContainer = () => (
  <div id="hero-container" className="flex-rows flex-end flex-4">
    <div className="flex-columns flex-between items-end">
      <div className="flex-1 items-end col-50">
        <h2 className="logo">
          <span>ASSEC</span>
        </h2>
        <h1 className="baseline">
          <span>
            <strong>
              L&apos;outil qui vous informe des restrictions d&apos;eau en temps
              réel
            </strong>
          </span>
        </h1>
        <hr className="liner my20" />
        <NewsletterForm placeholder="E-Mail"
          className="notice mb12"
          label="Me prévenir lors du passage en vigilance" />
      </div>
      <div className="flex-1 col-50" />
    </div>
    <span className="more pb20 pt80">
      <i className="ico icon-down-open-big" />
    </span>
  </div>
);
HeroContainer.propTypes = {};
export default HeroContainer;
