import React from 'react';
import { Element } from 'react-scroll';

const APropos = () => (
  <Element name="a-propos" id="a-propos" className="padded lame flex-columns">
    <div className="flex-1">
      <figure>
        <img alt="" src="https://picsum.photos/1280/800" />
      </figure>
    </div>
    <div className="flex-2 ml40">
      <h2 className="mb40">
        <span>Pourquoi ?</span>
      </h2>
      <p>
        Service aux irrigants Vous êtes agriculteur ? Vous craignez pour votre
        activité en cas de sécheresse ? Nous voulons vous aider à anticiper et
        gérer la sécheresse pour minimiser l&apos;impact économique sur votre
        activité. Nous avons besoin de vous pour concevoir un service qui
        réponde à vos attentes. Laissez-nous vos coordonnées !
      </p>
    </div>
  </Element>
);
export default APropos;
