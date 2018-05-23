import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const ResultsView = ({ restrictions, slug, label }) => (
  <React.Fragment>
    <h5 className="mb20">
      <span>Vos Règles</span>
    </h5>
    <p className="note large p20">
      Votre territoire est placé en situation de{' '}
      <b className={`situation-${slug}`}>{`${label}`}.</b> Les règles de partage
      de l&apos;eau qui vous sont applicables sont les suivantes:
    </p>
    <div className="relative">
      <ul className="descriptions absolute">
        {restrictions.map(obj => (
          <li className="description" key={obj.id}>
            <ReactMarkdown source={obj.description} />
          </li>
        ))}
      </ul>
    </div>
  </React.Fragment>
);
/*
  <Query query={LOAD_RESTRICTION_CASE} variables={values}>
    {({ loading, error, data }) => {
      if (error || loading) return <p>...</p>;
      const rules = (data && data.findRestriction) || [];
      const {
        restrictions,
        situation: { label, slug },
      } = rules;
      return (
        <div className="col-left flex-rows">
          <p className="note large p20">
            Votre territoire est placé en situation de{' '}
            <b className={`situation-${slug}`}>{`${label}`}.</b> Les règles de
            partage de l&apos;eau qui vous sont applicables sont les suivantes:
          </p>
          <div className="relative">
            <ul className="descriptions absolute">
              {restrictions.map(obj => (
                <li className="description" key={obj.id}>
                  <ReactMarkdown source={obj.description} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }}
  </Query>
);
*/

ResultsView.propTypes = {
  slug: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  restrictions: PropTypes.array.isRequired,
};

export default ResultsView;
