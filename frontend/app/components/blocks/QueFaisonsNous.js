import React from 'react';
import { Element } from 'react-scroll';

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
    </div>
    <div className="flex-1" />
  </Element>
);

export default QueFaisonsNous;
