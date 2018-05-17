import React from 'react';
import { Element } from 'react-scroll';

import Person from './../ui/Person';

const QueFaisonsNous = () => (
  <Element name="que-faisons-nous"
    id="que-faisons-nous"
    className="padded lame flex-columns">
    <div className="flex-2 mr40">
      <h2 className="mb40">
        <span>Pour qui ?</span>
      </h2>
      <p className="description">
        Les règles de partage de l&apos;eau sont adaptées à l&apos;utilisation
        qui en est faite, aux techniques de prélèvement et de transport de
        l&apos;eau et aux spécificités locales de gestion de l&apos;eau, qui
        sont très variées dans l&apos;agriculture irriguée.
      </p>
      <p className="description mt12">
        ASSEC s&apos;adresse donc d&apos;abord aux agriculteurs irrigants. Il
        apporte également une réponse pour les industriels, les particuliers et
        les collectivités..
      </p>
      <hr className="liner mt40 mb20" />
      <div className="person testimonial flex-columns">
        <Person firstname="Georges"
          lastname="Contreras"
          jobtitle="Viticulteur"
          quote="C'est super"
          avatar="/static/default_avatar.png" />
      </div>
    </div>
    <div className="flex-1">
      <figure className="large">
        {/* Crédits: Nacho Domínguez Argenta on Unsplash
          https://source.unsplash.com/F_ilCik66Hg */}
        {/* Crédits: Igor Ovsyannykov on Unsplash
          https://source.unsplash.com/a4xt7ieZ85A */}
        <img className="paysage"
          alt="Crédits: Igor Ovsyannykov on Unsplash"
          src="/static/igor-ovsyannykov-347292-unsplash.jpg" />
      </figure>
    </div>
  </Element>
);

export default QueFaisonsNous;
