import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const ResultsView = ({ restrictions, slug, label }) => (
  <div id="results-view" className="flex-rows">
    <h5 className="title mb20">
      <span>Vos Règles</span>
    </h5>
    <p className="note large p20">
      Votre territoire est placé en situation de{' '}
      <b className={`situation-${slug}`}>{`${label}`}.</b> Les règles de partage
      de l&apos;eau qui vous sont applicables sont les suivantes:
    </p>
    <div className="results relative">
      <ul className="descriptions">
        {restrictions.map(obj => (
          <li className="description" key={obj.id}>
            <ReactMarkdown source={obj.description} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

ResultsView.propTypes = {
  slug: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  restrictions: PropTypes.array.isRequired,
};

export default ResultsView;
