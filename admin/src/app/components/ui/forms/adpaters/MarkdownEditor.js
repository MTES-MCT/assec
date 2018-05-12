import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

class MarkdownEditor extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { preview: false, value: '' };
    this.showEditor = this.showEditor.bind(this);
    this.showPreview = this.showPreview.bind(this);
    this.onTextareaChange = this.onTextareaChange.bind(this);
  }

  componentWillReceiveProps (nextprops) {
    if (nextprops.input.value !== this.state.value) {
      this.setState({ value: nextprops.input.value });
    }
  }

  onTextareaChange (evt) {
    evt.preventDefault();
    const { value } = evt.target;
    const { input } = this.props;
    this.setState({ value }, () => input.onChange(value));
  }

  showEditor () {
    this.setState({ preview: false });
  }

  showPreview () {
    this.setState({ preview: true });
  }

  render () {
    const { label } = this.props;
    const { preview, value } = this.state;
    const editcss = (!preview && 'active') || '';
    const previewcss = (preview && 'active') || '';
    return (
      <div className="markdown-editor">
        <div className="markdown-editor-container">
          <div className="markdown-editor-header">
            <span>
              <b>{label}</b>
            </span>
          </div>
          <div className="flex-columns flex-between">
            <nav className="markdown-editor-styles" />
            <nav className="markdown-editor-views">
              <button type="button"
                disabled={!preview}
                className={editcss}
                onClick={this.showEditor}>
                <span>
                  Text <i className="icon icon-code" />
                </span>
              </button>
              <button type="button"
                disabled={preview}
                className={previewcss}
                onClick={this.showPreview}>
                <span>
                  Preview <i className="icon icon-eye" />
                </span>
              </button>
            </nav>
          </div>
          <div className="markdown-editor-views">
            <div className={`markdown-editor-raw ${editcss}`}
              style={{ display: (preview && 'none') || 'block' }}>
              <textarea className="xlarge"
                value={value}
                component="textarea"
                onChange={this.onTextareaChange} />
            </div>
            <div className={`markdown-editor-preview ${previewcss}`}
              style={{ display: (preview && 'block') || 'none' }}>
              <ReactMarkdown className="markdown-body"
                escapeHtml={false}
                source={value} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
};

export default MarkdownEditor;
