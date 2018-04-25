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
import DataTable from './../../components/datatable/DataTable';

const renderNoZones = () => (
  <div id="page-main-column">
    <NoContent description="Pour ajouter une nouvelle zone utilisez le formulaire ci-contre" />
  </div>
);

class ZonesTable extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
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
            <DataTable provider={departmentZones}
              actions={{
                edit: this.onEditClick,
                delete: this.onDeleteClick,
              }}
              cols={[
                {
                  key: 'label',
                  label: 'Nom de la zone',
                },
                {
                  key: 'order',
                  type: 'order',
                  label: 'Ordre',
                },
              ]} />
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
