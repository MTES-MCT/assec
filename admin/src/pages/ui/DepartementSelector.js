import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

// application
import { DEPARTEMENTS } from './../../apolloql';

const DepartementSelector = ({ onChange }) => (
  <Query query={DEPARTEMENTS}>
    {({ loading, error, data: { departements: dpts } }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
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
                    {obj.name}
                  </option>
                ))}
            </select>
          </span>
        </label>
      );
    }}
  </Query>
);

DepartementSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DepartementSelector;
