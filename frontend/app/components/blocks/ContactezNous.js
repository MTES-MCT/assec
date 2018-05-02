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
        <p>
          <b style={{ display: 'block ' }}>Nous sommes à votre écoute</b>
          <span style={{ display: 'block ' }}>
            du lundi au vendredi, de 9h30 à 18h00.
          </span>
        </p>
        <ul className="list pl20 mt40">
          <li className="mt12">
            <b>eMail :</b> assec@beta.gouv.fr
          </li>
          <li className="mt12">
            <b>Téléphone :</b> +33 (0)1 40 81 95 86
          </li>
        </ul>
      </div>
    </div>
  </div>
);
export default ContactezNous;
