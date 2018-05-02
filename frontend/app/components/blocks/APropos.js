import React from 'react';
import { Element } from 'react-scroll';

import Person from './../ui/Person';

const APropos = () => (
  <Element name="a-propos" id="a-propos" className="padded lame flex-columns">
    <div className="flex-1">
      <div className="shadowed speech-bubble speech-right speech-io p60" />
    </div>
    <div className="flex-2 ml40">
      <h2 className="mb40">
        <span>Pourquoi ?</span>
      </h2>
      <p className="description">
        Service aux irrigants Vous êtes agriculteur ? Vous craignez pour votre
        activité en cas de sécheresse ? Nous voulons vous aider à anticiper et
        gérer la sécheresse pour minimiser l&apos;impact économique sur votre
        activité. Nous avons besoin de vous pour concevoir un service qui
        réponde à vos attentes. Laissez-nous vos coordonnées !
      </p>
      <p className="person flex-columns testimonial pt20 mt20">
        <Person firstname="Michel"
          lastname="Perrel"
          jobtitle="Intrapreneur"
          quote="Assec c'est trop super top nickel je suis content parce que c'est bien"
          avatar="https://avatars1.githubusercontent.com/u/34424209?s=400&u=ed4fc31733a5e6e3ec3cd2396701812d0c33e801&v=4" />
      </p>
    </div>
  </Element>
);
export default APropos;
