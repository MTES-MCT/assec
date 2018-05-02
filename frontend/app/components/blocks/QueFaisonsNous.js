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
        ASSEC s&apos;adresse d&apos;abord aux agriculteurs, pour qui les
        restrictions dépendent de nombreux facteurs. Il apporte également une
        réponse pour les industriels et les particuliers.
      </p>
    </div>
    <div className="flex-1">
      <figure>
        <img alt="" src="https://picsum.photos/1280/800" />
      </figure>
    </div>
  </Element>
);

export default QueFaisonsNous;
