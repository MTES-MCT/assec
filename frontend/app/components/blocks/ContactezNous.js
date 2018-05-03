import React from 'react';

const ContactezNous = () => (
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
            <b>eMail :</b> assec@beta.gouv.fr
          </li>
        </ul>
      </div>
    </div>
  </div>
);
export default ContactezNous;
