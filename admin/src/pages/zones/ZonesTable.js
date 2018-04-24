import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import {
  DELETE_ZONE,
  GET_DEPARTMENT_ZONES,
  UPDATE_DEPARTMENT_ZONES,
} from './../../apolloql';
import NoContent from './../../components/ui/NoContent';

const renderZonesTableHeader = () => (
  <thead>
    <tr>
      <th>Titre</th>
      <th className="small">Ordre</th>
      <th className="small" />
      <th className="small" />
    </tr>
  </thead>
);

const renderNoZones = () => (
  <div id="page-main-column">
    <NoContent description="Pour ajouter une nouvelle zone utilisez le formulaire ci-contre" />
  </div>
);

class ZonesTable extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onAlertClick = this.onAlertClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  onAlertClick (obj) {
    const {
      label, id, department, alerte,
    } = obj;
    this.props.dispatch({
      type: 'onOpenPopin',
      popin: {
        id,
        alerte,
        department,
        name: label,
        type: 'ZonePopin',
      },
    });
  }

  onDeleteClick (obj) {
    const { label, id } = obj;
    this.props.dispatch({
      type: 'onOpenPopin',
      popin: {
        id,
        name: label,
        type: 'DeletePopin',
        deleteAction: DELETE_ZONE,
        updateAction: UPDATE_DEPARTMENT_ZONES,
      },
    });
  }

  renderTableRow (obj) {
    const { id, label, order } = obj;
    return (
      <tr key={id}>
        <td>{label}</td>
        <td className="small">{order}</td>
        <td className="small">
          <button type="button"
            className="super"
            onClick={() => this.onAlertClick(obj)}>
            <i className="icon icon-alert" />
          </button>
        </td>
        <td className="small">
          <button type="button"
            className="danger"
            onClick={() => this.onDeleteClick(obj)}>
            <i className="icon icon-trash" />
          </button>
        </td>
      </tr>
    );
  }

  render () {
    const { selected } = this.props;
    return (
      <Query query={GET_DEPARTMENT_ZONES} variables={{ department: selected }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading... </p>;
          if (error) return <p>Error </p>;
          const { departmentZones } = data;
          if (!departmentZones || !departmentZones.length) {
            return renderNoZones();
          }
          return (
            <div>
              <table>
                {renderZonesTableHeader()}
                <tbody>
                  {departmentZones && departmentZones.map(this.renderTableRow)}
                </tbody>
              </table>
            </div>
          );
        }}
      </Query>
    );
  }
}

ZonesTable.defaultProps = {
  selected: null,
};

ZonesTable.propTypes = {
  selected: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ZonesTable);
