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
        <label htmlFor="department.selector">
          <span>Sélectionner un département</span>
          <span className="selectbox">
            <select id="department.selector"
              name="department.selector"
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
  query: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EntitySelector;
