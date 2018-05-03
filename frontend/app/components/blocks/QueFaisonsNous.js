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
        Les restrictions d&apos;eau sont adaptées aux diverses utilisations, aux
        techniques de prélèvement et aux modalités de gestion, qui sont très
        variées dans l&apos;agriculture irriguée.
      </p>
      <p className="description">
        ASSEC s&apos;adresse donc d&apos;abord aux agriculteurs irrigants. Il
        apporte également une réponse pour les particuliers.
      </p>
    </div>
    <div className="flex-1" />
  </Element>
);

export default QueFaisonsNous;
