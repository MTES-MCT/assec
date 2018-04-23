import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import { DPT_ZONES, DELETE_ZONE, UPDATE_DPT_ZONES } from './../../apolloql';
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
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  onDeleteClick (obj) {
    const { name, id } = obj;
    this.props.dispatch({
      type: 'onOpenPopin',
      popin: {
        id,
        name,
        type: 'DeletePopin',
        deleteAction: DELETE_ZONE,
        updateAction: UPDATE_DPT_ZONES,
      },
    });
  }

  renderTableRow (obj) {
    const { id, name, order } = obj;
    return (
      <tr key={id}>
        <td>{name}</td>
        <td className="small">{order}</td>
        <td className="small">
          <button type="button" className="super" onClick={() => {}}>
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
      <Query query={DPT_ZONES} variables={{ dpt: selected }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading... </p>;
          if (error) return <p>Error </p>;
          const { zones } = data;
          if (!zones || !zones.length) {
            return renderNoZones();
          }
          return (
            <div>
              <table>
                {renderZonesTableHeader()}
                <tbody>{zones && zones.map(this.renderTableRow)}</tbody>
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
