import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import CloseButton from './CloseButton';
import { closePopin } from './../../../actions';
import FormButtons from './../forms/FormButtons';
import { noop } from './../../../core/utils/noop';

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
    const {
      entity, formprops, loading, dispatch,
    } = this.props;
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
        <FormButtons display="rows"
          labelCancel="Annuler"
          labelSubmit="Modifier"
          submit={formprops.form.submit}
          reset={() => {
            formprops.form.reset();
            dispatch(closePopin());
          }}
          disabled={{
            cancel: false,
            submit: formprops.invalid || formprops.pristine || loading,
          }} />
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
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  suptitle: PropTypes.string.isRequired,
  // FIXME -> use shapeof instead of simple object
  formprops: PropTypes.object.isRequired,
};

export default connect()(EditPopinForm);
