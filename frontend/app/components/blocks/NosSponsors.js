import React from 'react';

// application
import Mailto from './../ui/Mailto';

const NosSponsors = () => (
  <div id="nos-sponsors" className="col-right block mt40">
    <h3 className="mb40">
      <span>Nos Sponsors & Partenaires</span>
      <hr className="liner mt12" />
    </h3>
    <p className="flex-columns flex-start">
      <img className="flex-0"
        height="65"
        alt="La fabrique numérique"
        src="/static/logo-fabnum.svg" />
      <img className="flex-0 ml20"
        height="65"
        alt="Chambres d'Agricultue Provence-Alpes-Côte d'Azur"
        src="/static/logo-dca-paca.png" />
      <img className="flex-0 ml20"
        alt="beta.gouv.fr"
        height="65"
        src="/static/logo-betagouv.svg" />
    </p>
    <p className="align-center">
      <Mailto email="contact@assec.beta.gouv.fr" className="calltoaction">
        <i className="icon icon-thumbs-up mr7" />
        <span>Prêt à nous soutenir ? Ajoutez votre logo ici</span>
      </Mailto>
    </p>
  </div>
);
export default NosSponsors;
