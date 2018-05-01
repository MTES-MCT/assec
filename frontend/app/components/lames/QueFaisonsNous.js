import React from 'react';
import { Element } from 'react-scroll';

const QueFaisonsNous = () => (
  <Element name="que-faisons-nous"
    id="que-faisons-nous"
    className="padded lame flex-columns pt80">
    <div className="flex-2 ml40">
      <h2 className="mb40">
        <span>Pour qui ?</span>
      </h2>
      <p>
        Que faisons nous ? Nous développons des solutions pour améliorer la
        réponse au problème de pénurie d&apos;eau lors d&apos;épisodes de
        sécheresse. Nous travaillons actuellement sur la vallée de l&apos;Asse
        dans les Alpes-de-haute-Provence. Vous êtes agriculteur sur ce
        territoire ? Nous avons besoin de vous pour développer un service utile.
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
