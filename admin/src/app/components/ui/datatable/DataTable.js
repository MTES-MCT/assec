import React from 'react';
import PropTypes from 'prop-types';

import './datatable.css';
import DataTableRow from './DataTableRow';

class DataTable extends React.PureComponent {
  renderColGroup (actionscol) {
    const { cols } = this.props;
    const rendercol = (col, index) => (
      <col key={`datatable::col::${col.index || index}`}
        className={`${col.type || col.key} ${col.cssclass || ''}`} />
    );
    return (
      <colgroup>
        {cols && cols.map(rendercol)}
        {actionscol && rendercol(actionscol)}
      </colgroup>
    );
  }

  renderTableHead (actionscol) {
    const { cols } = this.props;
    const renderth = (col, index) => (
      <th key={`datatable::thead::th::${col.index || index}`}
        className={`${col.type || col.key} ${col.cssclass || ''}`}>
        <span>{col.label}</span>
      </th>
    );
    return (
      <thead>
        <tr>
          {cols && cols.map(renderth)}
          {actionscol && renderth(actionscol)}
        </tr>
      </thead>
    );
  }

  render () {
    const { cols, actions, provider } = this.props;
    const actionscol =
      (actions && {
        type: 'actions',
        label: 'Actions',
        index: cols.length + 1,
        cssclass: `actions-${Object.keys(actions).length}`,
      }) ||
      null;
    // sert a calculer le nombre d'actions a afficher
    return (
      <div className="datatable">
        <table>
          <caption>
            <span>{(provider && provider.length) || 0} élément(s)</span>
          </caption>
          {this.renderColGroup(actionscol)}
          {this.renderTableHead(actionscol)}
          <tbody>
            {provider &&
              provider.map((data, index) => (
                <DataTableRow key={`datatablerow::${data.id}`}
                  data={data}
                  cols={cols}
                  index={index}
                  actions={actions} />
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

DataTable.defaultProps = {
  actions: null,
};

DataTable.propTypes = {
  actions: PropTypes.object,
  cols: PropTypes.array.isRequired,
  provider: PropTypes.array.isRequired,
};

export default DataTable;
