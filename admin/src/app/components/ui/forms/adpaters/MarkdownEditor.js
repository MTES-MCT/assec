import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

class MarkdownEditor extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { preview: false };
    this.showEditor = this.showEditor.bind(this);
    this.showPreview = this.showPreview.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange ({ target }) {}

  showEditor () {
    this.setState({ preview: false });
  }

  showPreview () {
    this.setState({ preview: true });
  }

  render () {
    const { preview } = this.state;
    const { input, ...rest } = this.props;
    const editcss = (!preview && 'active') || '';
    const previewcss = (preview && 'active') || '';
    return (
      <div className="markdown-editor">
        <div className="markdown-editor-container">
          <div className=" flex-columns flex-between">
            <nav className="markdown-editor-navs">
              <button type="button"
                className={editcss}
                onClick={this.showEditor}>
                <span>Text</span>
              </button>
              <button type="button"
                className={previewcss}
                onClick={this.showPreview}>
                <span>Preview</span>
              </button>
            </nav>
          </div>
          <div className="markdown-editor-views">
            <div className={`markdown-editor-raw ${editcss}`}
              style={{ display: (preview && 'none') || 'block' }}>
              <textarea {...rest}
                className="xlarge"
                component="textarea"
                defaultValue={input.value}
                onChange={({ target }) => input.onChange(target.value)} />
            </div>
            <div className={`markdown-editor-preview ${previewcss}`}
              style={{ display: (preview && 'block') || 'none' }}>
              <ReactMarkdown className="markdown-body" source={input.value} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  input: PropTypes.object.isRequired,
};

export default MarkdownEditor;
