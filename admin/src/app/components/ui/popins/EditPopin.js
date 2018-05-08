import React from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';
import { Motion, spring } from 'react-motion';

// application
import CloseButton from './CloseButton';
import { noop } from './../../../core/utils/noop';
import SubmitButton from './../forms/SubmitButton';

class EditPopinForm extends React.PureComponent {
  renderHeader () {
    const { entity, onClose, suptitle } = this.props;
    const title = (entity && (entity.label || entity.name)) || '';
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
    const { entity, form, loading } = this.props;
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
          invalid={form.invalid || loading}
          pristine={form.pristine || loading} />
      </React.Fragment>
    );
  }

  render () {
    const { height, form, children } = this.props;
    return (
      <Motion style={{ y: spring(0) }} defaultStyle={{ y: -height }}>
        {value => (
          <div className="edit-popin popin-container" style={{ top: value.y }}>
            {this.renderHeader()}
            <form onSubmit={form.handleSubmit}>
              <div className="popin-content flex-columns p40">
                <div className="popin-main flex1 mr40">{children}</div>
                <div className="popin-sidebar flex0">
                  {this.renderSidebar()}
                </div>
              </div>
            </form>
          </div>
        )}
      </Motion>
    );
  }
}

EditPopinForm.propTypes = {
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  suptitle: PropTypes.string.isRequired,
};

export default withSizes(({ height }) => ({ height }))(EditPopinForm);
