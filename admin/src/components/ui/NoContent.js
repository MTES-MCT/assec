import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const words = ['Ouuups!', 'Désolé!', 'Oula, pas trop vite!', 'Oh nooo!'];

const NoContent = ({ description, link }) => (
  <div className="notice large">
    <h3 className="mb20">
      <span>{words[Math.floor(Math.random() * words.length)]}</span>
    </h3>
    <p className="m0">Il n&apos;y a rien à afficher ici</p>
    {description && <p className="mt0">{description}</p>}
    {link && (
      <p>
        <Link to={`/${link}`}>
          <span>Ajouter un département</span>
        </Link>
      </p>
    )}
  </div>
);

NoContent.defaultProps = {
  link: null,
  description: null,
};

NoContent.propTypes = {
  link: PropTypes.string,
  description: PropTypes.string,
};

export default NoContent;
