import React from 'react';
import PropTypes from 'prop-types';

class RestrictionsPage extends React.PureComponent {
  render () {
    const { departements } = this.props;
    return (
      <div id="restrictions-page" className="flex-rows">
        <div>
          <select>
            <option key="department::default" />
            {departements.map(obj => (
              <option key={`department::${obj.id}`}>{obj.label}</option>
            ))}
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Attributs</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    );
  }
}

RestrictionsPage.defaultProps = {
  departements: [
    {
      id: 'Var - 84',
      label: 'Var - 84',
    },
  ],
};

RestrictionsPage.propTypes = {
  departements: PropTypes.array,
};

export default RestrictionsPage;
