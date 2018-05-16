import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { LOAD_RESTRICTION_CASE } from './../apolloql/queries';

const WidgetResult = ({ values }) => (
  <Query query={LOAD_RESTRICTION_CASE} variables={values}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error graphql :(</p>;
      return <div />;
    }}
  </Query>
);

WidgetResult.propTypes = {
  values: PropTypes.object.isRequired,
};

export default WidgetResult;
