import React from 'react';

import { ButtonLink } from './ui/Links';
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
              L&apos;outil qui vous informe des restrictions d&apos;eau en temps
              réel
            </strong>
          </span>
        </h1>
        <hr className="liner my20" />
        <NewsletterForm placeholder="Votre email"
          className="notice mb12"
          label="Prévenez-moi quand le département du Var passe en vigilance" />
      </div>
      <div className="flex-1 col-50">
        <ButtonLink to="essayez-la-demo"
          spy
          hashSpy
          smooth
          offset={-80}
          duration={800}
          className="demo-button large"
          style={{
            right: '5%',
            top: '70px',
            position: 'absolute',
          }}>
          <span>Essayer la démo</span>
          <i className="icon icon-thumbs-up ml7" />
        </ButtonLink>
      </div>
    </div>
    <span className="more pb20 pt80">
      <i className="ico icon-down-open-big" />
    </span>
  </div>
);

export default HeroContainer;
