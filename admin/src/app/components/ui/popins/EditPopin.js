import React from 'react';
import PropTypes from 'prop-types';

// application
import CloseButton from './CloseButton';
import CancelButton from './CancelButton';
import { noop } from './../../../core/utils/noop';
import SubmitButton from './../forms/SubmitButton';

class EditPopinForm extends React.PureComponent {
  renderHeader () {
    const { entity, onClose, suptitle } = this.props;
    const title = (entity && (entity.name || entity.label)) || '';
    return (
      <div className="popin-header p40">
        <CloseButton onClose={onClose || noop} />
        <h6 className="popin-suptitle">
          <span>{suptitle}</span>
        </h6>
        <h3 className="popin-title">
          <b>{title}</b>
        </h3>
      </div>
    );
  }

  renderSidebar () {
    const { entity, formprops, loading } = this.props;
    const ctime = (entity && new Date(entity.ctime).toLocaleString()) || '';
    const mtime = (entity && new Date(entity.mtime).toLocaleString()) || '';
    return (
      <React.Fragment>
        <ul>
          <li>
            <b>Créé le:</b>
            <br />
            <span>{ctime}</span>
          </li>
          <li>
            <b>Modifié le:</b>
            <br />
            <span>{mtime}</span>
          </li>
        </ul>
        <SubmitButton label="Modifier"
          submit={() => {
            console.log('submit submit submit submit');
          }}
          invalid={formprops.invalid || loading}
          pristine={formprops.pristine || loading} />
        <CancelButton disabled={loading} />
      </React.Fragment>
    );
  }

  render () {
    const { formprops, children } = this.props;
    return (
      <div className="edit-popin popin-container flex-rows">
        {this.renderHeader()}
        <div className="popin-content flex-columns p40">
          <div className="popin-main flex1 pr12 mr28">
            <form onSubmit={formprops.handleSubmit}>{children}</form>
          </div>
          <div className="popin-sidebar flex0">{this.renderSidebar()}</div>
        </div>
      </div>
    );
  }
}

EditPopinForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  suptitle: PropTypes.string.isRequired,
  // FIXME -> use shapeof instead of simple object
  formprops: PropTypes.object.isRequired,
};

export default EditPopinForm;
