import React from 'react';

import Person from './../ui/Person';

const APropos = () => (
  <div id="a-propos" className="padded lame flex-columns">
    <div className="flex-1">
      <figure className="large">
        <img className="portrait"
          alt="Crédits: Ramin Khatibi on Unsplash"
          src="/static/ramin-khatibi-577822-unsplash.jpg" />
      </figure>
    </div>
    <div className="flex-2 ml20">
      <h2 className="mb40">
        <span>Pourquoi ?</span>
      </h2>
      <p className="description">
        Pour partager l&apos;eau en période de sécheresse. Des règles de partage
        sont décidées par l&apos;Etat en concertation avec tous les usagers de
        l&apos;eau.
      </p>
      <p className="description mt12">
        Connaître ces règles de partage de l&apos;eau en période de sécheresse
        est utile pour minimiser l&apos;impact économique sur son exploitation
        agricole et nécessaire pour être en règle
      </p>
      <hr className="liner mt40 mb20" />
      <div className="person testimonial flex-columns">
        <Person firstname="Franck"
          lastname="Chauvet"
          jobtitle="Président de la fédération des structures hydrauliques du Var"
          quote="Les règles discutées avec les services de l’Etat sont facilement accessibles à tous"
          avatar="/static/default_avatar.png" />
      </div>
    </div>
  </div>
);
export default APropos;
