import React from 'react';
import { Element } from 'react-scroll';

import Person from './../ui/Person';

const CommentParticiper = () => (
  <Element name="comment-participer"
    id="comment-participer"
    className="padded lame flex-columns">
    <div className="flex-1">
      <figure>
        <img alt="" src="https://picsum.photos/1280/800" />
      </figure>
    </div>
    <div className="flex-2 ml40">
      <h2 className="mb40">
        <span>Comment participer ?</span>
      </h2>
      <p className="description">
        Que faisons nous ? Nous développons des solutions pour améliorer la
        réponse au problème de pénurie d&apos;eau lors d&apos;épisodes de
        sécheresse. Nous travaillons actuellement sur la vallée de l&apos;Asse
        dans les Alpes-de-haute-Provence. Vous êtes agriculteur sur ce
        territoire ? Nous avons besoin de vous pour développer un service utile.
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

export default CommentParticiper;
