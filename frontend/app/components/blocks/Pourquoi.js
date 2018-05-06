import React from 'react';
import { Element } from 'react-scroll';

import Person from './../ui/Person';

const APropos = () => (
  <Element name="a-propos" id="a-propos" className="padded lame flex-columns">
    <div className="flex-1" />
    <div className="flex-2 ml40">
      <h2 className="mb40">
        <span>Pourquoi ?</span>
      </h2>
      <p className="description">
        Pour optimiser la réponse collective du monde agricole et des services
        de l&apos;Etat au problème de pénurie d&apos;eau en période de
        sécheresse.
      </p>
      <p className="description mt12">
        Connaître les restrictions d&apos;utilisation de l&apos;eau en période
        de sécheresse est utile pour minimiser l&apos;impact économique sur son
        exploitation agricole et nécessaire pour être en règle
      </p>
      <hr className="liner mt40 mb20" />
      <div className="person testimonial flex-columns">
        <Person firstname="Franck"
          lastname="Chauvet"
          jobtitle="Président de la fédération des structures hydrauliques du Var"
          quote="Les règles discutées avec les services de l’Etat sont enfin accessibles à tous"
          avatar="/static/default_avatar.png" />
      </div>
    </div>
  </Element>
);
export default APropos;
