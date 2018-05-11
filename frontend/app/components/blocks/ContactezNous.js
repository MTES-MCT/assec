import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// application
import Mailto from './../ui/Mailto';

const ContactezNous = ({ email }) => (
  <div id="comment-nous-contacter" className="block flex-2">
    <h3 className="mt40 mb40">
      <span>Nous contacter</span>
      <hr className="liner mt12" />
    </h3>
    <div className="flex-columns">
      <p className="col-left">
        <span className="big-badge">
          <i className="icon icon-mail" />
        </span>
      </p>
      <div className="col-right ml40">
        <ul className="list mt40">
          <li>
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
          </li>
        </ul>
      </div>
    </div>
  </div>
);

ContactezNous.defaultProps = {
  email: 'contact@assec.beta.gouv.fr',
};

ContactezNous.propTypes = {
  email: PropTypes.string,
};

export default ContactezNous;
