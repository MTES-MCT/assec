import React from 'react';
import { Element } from 'react-scroll';

const CommentParticiper = () => (
  <Element name="comment-participer"
    id="comment-participer"
    className="padded lame flex-columns">
    <div className="flex-1" />
    <div className="flex-2 ml40">
      <h2 className="mb40">
        <span>Comment participer</span>
      </h2>
      <p className="description">
        <b>
          Vous êtes intéressé par le déploiement d&apos;ASSEC dans votre
          département ?
        </b>
      </p>
      <p className="description">
        Nous développons actuellement un premier outil en version beta sur le
        département du Var.
      </p>
      <p className="description">
        Si vous voulez participer, joignez-vous aux ateliers utilisateurs!
      </p>
    </div>
  </Element>
);

export default CommentParticiper;
