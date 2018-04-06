import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

// application
import { ALL_DEPARTEMENTS } from './../../graphql';

const DepartementSelector = ({ onChange }) => (
  <Query query={ALL_DEPARTEMENTS}>
    {({ loading, error, data: { allDepartements: dpts } }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      const provider = dpts.map(({ id, name }) => ({
        id,
        name,
        value: id,
      }));
      return (
        <fieldset>
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
                {provider &&
                  provider.map(obj => (
                    <option key={obj.id} value={obj.value}>
                      {obj.name}
                    </option>
                  ))}
              </select>
            </span>
          </label>
        </fieldset>
      );
    }}
  </Query>
);

DepartementSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DepartementSelector;
