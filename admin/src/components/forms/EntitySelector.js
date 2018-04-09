import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

// application
import { ALL_DEPARTEMENTS } from './../../apolloql';

const EntitySelector = ({ onChange }) => (
  <Query query={ALL_DEPARTEMENTS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      const dpts = data.departements;
      return (
        <label htmlFor="departement.selector">
          <span>Sélectionner un département</span>
          <span className="selectbox">
            <select id="departement.selector"
              name="departement.selector"
              onChange={({ target }) => {
                const id =
                  target.value && target.value !== '' ? target.value : false;
                return onChange(id);
              }}>
              <option key="default" />
              {dpts &&
                dpts.map(obj => (
                  <option key={obj.id} value={obj.id}>
                    {`${obj.code} - ${obj.name}`}
                  </option>
                ))}
            </select>
          </span>
        </label>
      );
    }}
  </Query>
);

EntitySelector.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default EntitySelector;
