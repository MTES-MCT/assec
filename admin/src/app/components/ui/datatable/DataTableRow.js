import React from 'react';
import PropTypes from 'prop-types';

import { usedebug } from './../../../core/utils/usedebug';

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
    const debugprops = (usedebug() && { 'debug-data-id': data.id }) || {};
    return (
      <tr {...debugprops}>
        {cols &&
          cols.map((col) => {
            const props = col.key.split('.');
            const value = props.reduce((acc, key) => acc[key], data);
            return (
              <td className={`${col.type || col.key} ${col.cssclass || ''}`}
                key={`datatablerow::tr::${data.id}::td::${col.key}`}>
                {col.type !== 'bool' && <span>{value}</span>}
                {col.type === 'bool' &&
                  col.validate(value) && <i className="icon icon-check" />}
                {col.type === 'bool' &&
                  !col.validate(value) && <i className="icon icon-cancel" />}
              </td>
            );
          })}
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
