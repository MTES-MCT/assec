import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

// application

const EntitySelector = ({ query, onChange }) => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      const dpts = data.departments;
      return (
        <label htmlFor="entityselector">
          <span>Sélectionner un département</span>
          <span className="selectbox">
            <select id="entityselector"
              name="entityselector"
              onChange={({ target }) => {
                const id =
                  target.value && target.value !== '' ? target.value : false;
                return onChange(id);
              }}>
              <option key="default" />
              {dpts &&
                dpts.map(obj => (
                  <option key={obj.id} value={obj.id}>
                    {`${obj.code} - ${obj.label}`}
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
  query: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EntitySelector;
