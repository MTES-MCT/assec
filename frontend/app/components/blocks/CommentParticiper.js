import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import { Tooltip } from 'react-tippy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// application
import Mailto from './../ui/Mailto';

const CommentParticiper = ({ email }) => (
  <Element name="comment-participer"
    id="comment-participer"
    className="padded lame flex-columns">
    <div className="flex-1">
      <figure className="large">
        <img className="portrait"
          alt="Nous Contacter"
          src="/static/contact_us.png" />
      </figure>
    </div>
    <div className="flex-2 ml40">
      <h2 className="mb40">
        <span>Comment participer</span>
      </h2>
      <p className="description">
        Vous êtes intéressé par le déploiement d&apos;ASSEC dans votre
        département ?
      </p>
      <p className="description mt12">
        Contactez-nous, nous pouvons développer ensemble des{' '}
        <b>solutions gratuites</b>, adaptées à vos spécificités, et facilement{' '}
        <b>intégrable sur votre site web.</b>
      </p>
      <p className="description mt12">
        Nous développons actuellement un premier outil en version beta sur le
        département du Var.<br />
        Vous voulez participer, joignez-vous aux ateliers utilisateurs!
      </p>
      <div className="description mt40">
        <b>eMail :</b> <Mailto email={email} />
        <Tooltip arrow
          size="small"
          title="COPIER"
          position="right"
          arrowSize="small"
          theme="transparent">
          <CopyToClipboard text={email}>
            <button type="button" className="copy-to-clipboard">
              <span>
                <i className="icon icon-docs" />
              </span>
            </button>
          </CopyToClipboard>
        </Tooltip>
      </div>
    </div>
  </Element>
);

CommentParticiper.defaultProps = {
  email: 'contact@assec.beta.gouv.fr',
};

CommentParticiper.propTypes = {
  email: PropTypes.string,
};

export default CommentParticiper;
