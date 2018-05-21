import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { LOAD_RESTRICTION_CASE } from './../../apolloql/queries';

const FormResults = ({ values }) => (
  <Query query={LOAD_RESTRICTION_CASE} variables={values}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error graphql :(</p>;
      const rules = (data && data.findRestriction) || [];
      const { situation, restrictions } = rules;
      return (
        <div id="assec-widget-results" className="flex-1 p20">
          <h5>
            <span>Vos Règles</span>
          </h5>
          <p>
            Votre territoire est placé en situation de{' '}
            <b>{`${situation.label}`}.</b> Les règles de partage de l&apos;eau
            qui vous sont applicables sont les suivantes:
          </p>
          <ul>
            {restrictions.map(obj => <li key={obj.id}>{obj.description}</li>)}
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
