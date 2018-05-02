import React from 'react';
import { Element } from 'react-scroll';

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
        Nous développons actuellement un premier outil sur le département du
        Var. Si vous voulez participer, joignez-vous aux ateliers utilisateurs!
        Vous êtes intéressé par le déploiement d’Assec dans votre département ?
        Contactez-nous!
      </p>
    </div>
  </Element>
);

export default CommentParticiper;
