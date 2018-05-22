import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import ReactMarkdown from 'react-markdown';

// application
import { LOAD_RESTRICTION_CASE } from './../../apolloql/queries';

const FormResults = ({ values }) => (
  <Query query={LOAD_RESTRICTION_CASE} variables={values}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error graphql :(</p>;
      const rules = (data && data.findRestriction) || [];
      const {
        restrictions,
        situation: { label, slug },
      } = rules;
      return (
        <div id="assec-widget-results" className="flex-rows flex-1">
          <h5>
            <span>Vos Règles</span>
          </h5>
          <p className="note large p20">
            Votre territoire est placé en situation de{' '}
            <b className={`situation-${slug}`}>{`${label}`}.</b> Les règles de
            partage de l&apos;eau qui vous sont applicables sont les suivantes:
          </p>
          <ul className="descriptions">
            {restrictions.map(obj => (
              <li className="description" key={obj.id}>
                <ReactMarkdown source={obj.description} />
              </li>
            ))}
          </ul>
        </div>
      );
    }}
  </Query>
);

FormResults.propTypes = {
  values: PropTypes.object.isRequired,
};

export default FormResults;
