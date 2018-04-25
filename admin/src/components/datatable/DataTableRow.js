import React from 'react';
import PropTypes from 'prop-types';

class DataTableRow extends React.PureComponent {
  renderActions () {
    const { actions, data } = this.props;
    const getactionobject = (key) => {
      switch (key) {
      case 'edit':
        return { icon: 'pencil', cssclass: 'super' };
      case 'delete':
        return { icon: 'trash', cssclass: 'danger' };
      default:
        return null;
      }
    };
    const children = Object.keys(actions).map((key) => {
      const { icon, cssclass } = getactionobject(key);
      return (
        <button key={`action-button-${key}`}
          type="button"
          className={cssclass}
          onClick={() => actions[key](data)}>
          <i className={`icon icon-${icon}`} />
        </button>
      );
    });
    return children;
  }

  render () {
    const { cols, data } = this.props;
    const actions = this.renderActions();
    const alen = actions && actions.length;
    return (
      <tr>
        {cols &&
          cols.map(col => (
            <td className={col.type || col.key}
              key={`datatablerow::tr::${data.id}::td::${col.key}`}>
              <span>{data[col.key]}</span>
            </td>
          ))}
        {actions && (
          <td className={`actions actions-${alen}`}
            key={`datatablerow::tr::${data.id}::td::actions`}>
            {actions}
          </td>
        )}
      </tr>
    );
  }
}

DataTableRow.propTypes = {
  cols: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default DataTableRow;
