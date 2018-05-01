import React from 'react';

const NosSponsors = () => (
  <div className="block">
    <h3 className="mt40 mb40">
      <span>Nos Sponsors</span>
      <hr className="liner mt12" />
    </h3>
    <p>
      <img alt="La fabrique numérique"
        height="65"
        src="/static/logo-fabnum.svg" />
      <img alt="Chambres d'Agricultue Provence-Alpes-Côte d'Azur"
        height="65"
        className="ml20"
        src="/static/logo-dca-paca.png" />
      <img alt="beta.gouv.fr"
        height="65"
        src="/static/logo-betagouv.svg"
        className="mt20" />
    </p>
  </div>
);
export default NosSponsors;
