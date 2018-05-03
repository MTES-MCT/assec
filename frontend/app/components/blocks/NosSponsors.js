import React from 'react';

const NosSponsors = () => (
  <div id="nos-sponsors" className="block mt80">
    <h3 className="mb40">
      <span>Nos Sponsors & Partenaires</span>
      <hr className="liner mt12" />
    </h3>
    <p className="flex-columns flex-start">
      <img className="flex-0"
        alt="beta.gouv.fr"
        height="65"
        src="/static/logo-betagouv.svg" />
      <img className="flex-0 ml20"
        height="65"
        alt="La fabrique numérique"
        src="/static/logo-fabnum.svg" />
      <img className="flex-0 ml20"
        height="65"
        alt="Chambres d'Agricultue Provence-Alpes-Côte d'Azur"
        src="/static/logo-dca-paca.png" />
      <button className="flex-1 ml20 align-center dashed">
        <i className="icon icon-thumbs-up mr7" />
        <span>Prêt à nous soutenir ? Ajoutez votre logo ici</span>
      </button>
    </p>
  </div>
);
export default NosSponsors;
