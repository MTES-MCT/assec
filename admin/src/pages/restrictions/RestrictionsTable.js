import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import { ALL_RESTRICTIONS } from './../../apolloql';

const renderRestrictionsTableHeader = () => (
  <thead>
    <tr>
      <th>Titre</th>
      <th>Description</th>
      <th className="small" />
      <th className="small" />
    </tr>
  </thead>
);

class RestrictionsTable extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  onEditClick (args) {
    const { title, id } = args;
    const popin = { id, name: title, type: 'RestrictionsPopin' };
    this.props.dispatch({ type: 'onOpenPopin', popin });
  }

  onDeleteClick (args) {
    const { title, id } = args;
    const popin = { id, name: title, type: 'DeletePopin' };
    this.props.dispatch({ type: 'onOpenPopin', popin });
  }

  renderTableRow (obj) {
    return (
      <tr key={obj.id}>
        <td>{obj.title}</td>
        <td>{obj.description}</td>
        <td className="small">
          <button type="button" onClick={() => this.onEditClick()}>
            <i className="icon icon-pencil" />
          </button>
        </td>
        <td className="small">
          <button type="button"
            className="danger"
            onClick={() => this.onDeleteClick()}>
            <i className="icon icon-trash" />
          </button>
        </td>
      </tr>
    );
  }

  render () {
    const { selected } = this.props;
    return (
      <Query query={ALL_RESTRICTIONS} variables={{ dpt: selected }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading... </p>;
          if (error) return <p>Error </p>;
          const { restrictions } = data;
          return (
            <div>
              <table>
                {renderRestrictionsTableHeader()}
                <tbody>
                  {restrictions && restrictions.map(this.renderTableRow)}
                </tbody>
              </table>
            </div>
          );
        }}
      </Query>
    );
  }
}

RestrictionsTable.defaultProps = {
  selected: null,
};

RestrictionsTable.propTypes = {
  selected: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(RestrictionsTable);
