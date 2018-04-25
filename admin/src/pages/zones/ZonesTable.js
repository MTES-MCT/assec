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

const renderZonesTableCols = () => (
  <colgroup>
    <col className="expands" />
    <col />
    <col className="order" />
    <col className="actions actions-2" />
  </colgroup>
);

const renderZonesTableHeader = () => (
  <thead>
    <tr>
      <th className="expands" />
      <th>Nom de la zone</th>
      <th className="order">Ordre</th>
      <th className="actions actions-2">Actions</th>
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
    this.state = { expandable: null };
    this.onEditClick = this.onEditClick.bind(this);
    this.onExpandClick = this.onExpandClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onExpandClick (obj, index) {
    const { expandable } = this.state;
    if (expandable && expandable.index === index) {
      this.setState({ expandable: null });
    } else {
      this.setState({ expandable: { index, obj } });
    }
  }

  onEditClick (obj) {
    const {
      label, id, department, alerte,
    } = obj;
    this.props.dispatch({
      type: 'onOpenPopin',
      popin: {
        id,
        label,
        alerte,
        department,
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

  render () {
    const { selected } = this.props;
    const { expandable } = this.state;
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
            <div className="table-container">
              <table>
                {renderZonesTableCols()}
                {renderZonesTableHeader()}
                <tbody>
                  {departmentZones &&
                    departmentZones.map((obj, index) => {
                      const { id, label, order } = obj;
                      return (
                        <React.Fragment key={`table-fragment::${id}`}>
                          <tr key={`table-row::${id}`}>
                            <td className="expands">
                              <button className="p0"
                                onClick={() => this.onExpandClick(obj, index)}>
                                <i className={`icon icon-${
                                  expandable && expandable.index === index
                                    ? 'up'
                                    : 'down'
                                }-open-mini`} />
                              </button>
                            </td>
                            <td>
                              <span>{label}</span>
                            </td>
                            <td className="order">{order}</td>
                            <td className="actions actions-2">
                              <button type="button"
                                className="super"
                                onClick={() => this.onEditClick(obj)}>
                                <i className="icon icon-alert" />
                              </button>
                              <button type="button"
                                className="danger"
                                onClick={() => this.onDeleteClick(obj)}>
                                <i className="icon icon-trash" />
                              </button>
                            </td>
                          </tr>
                          {expandable &&
                            expandable.index === index && (
                            <tr key={`table-expandable::${id}`}
                              className="table-expanded-row">
                              <td colSpan="4">
                                {expandable.obj.alerte.situation.label}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
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
