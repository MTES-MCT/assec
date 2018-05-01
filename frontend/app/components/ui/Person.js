import React from 'react';
import PropTypes from 'prop-types';

const SocialLink = ({ type, url }) => (
  <a className="mr3"
    href={url}
    title={type}
    target="_blank"
    rel="noopener noreferrer">
    <i className={`icon icon-${type}`} />
  </a>
);

SocialLink.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const Person = ({
  firstname, lastname, jobtitle, avatar, quote, socials,
}) => (
  <React.Fragment>
    <figure>
      <img alt={`${firstname} ${lastname} - ${jobtitle}`} src={avatar} />
    </figure>
    <div className="ml12">
      <blockquote>“{quote}”</blockquote>
      <h4 className="mt7">
        <b>
          {firstname} {lastname}
        </b>
        <span className="ml7">/ {jobtitle}</span>
      </h4>
      <nav className="mt3">
        {socials && socials.map(obj => <SocialLink key={obj.type} {...obj} />)}
      </nav>
    </div>
  </React.Fragment>
);

Person.defaultProps = {
  socials: null,
};

Person.propTypes = {
  socials: PropTypes.array,
  quote: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  jobtitle: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
};

export default Person;
