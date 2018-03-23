import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AppSidebar = ({ values }) => {
  const today = new Date();
  return (
    <div id="app-sidebar-left" className="column flex1">
      <h6>
        <small>
          {today.toLocaleDateString('fr-FR', {
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            year: 'numeric',
          })}
        </small>
      </h6>
      <h4>
        <span>Votre sélection</span>
      </h4>
      <ul>
        {Object.keys(values).map(key => (
          <li key={`question_${key}`}>
            {`${key}: ${JSON.stringify(values[key])}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

AppSidebar.propTypes = {
  values: PropTypes.object.isRequired,
};

const mapStateToProps = ({ form }) => ({
  values: (form.decisionnal && form.decisionnal.values) || {},
});

export default connect(mapStateToProps)(AppSidebar);
