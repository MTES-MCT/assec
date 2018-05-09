import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

class MarkdownEditor extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { preview: false };
    this.showEditor = this.showEditor.bind(this);
    this.showPreview = this.showPreview.bind(this);
  }

  showEditor () {
    this.setState({ preview: false });
  }
  showPreview () {
    this.setState({ preview: true });
  }

  render () {
    const { preview } = this.state;
    const { name, label, ...rest } = this.props;
    const editcss = (!preview && 'active') || '';
    const previewcss = (preview && 'active') || '';
    return (
      <div className="markdown-editor">
        <div className="markdown-editor-container">
          <div className=" flex-columns flex-between">
            <label htmlFor={name} className="inline">
              <span>{label}</span>
            </label>
            <nav className="markdown-editor-navs">
              <button className={editcss} onClick={this.showPreview}>
                <span>Text</span>
              </button>
              <button className={previewcss} onClick={this.showPreview}>
                <span>Preview</span>
              </button>
            </nav>
          </div>
          <div className="markdown-editor-views">
            <div className={`markdown-editor-editor ${editcss}`}>
              <Field {...rest}
                id={name}
                name={name}
                className="xlarge"
                component="textarea" />
            </div>
            <div className={`markdown-editor-preview ${previewcss}`} />
          </div>
        </div>
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default MarkdownEditor;
