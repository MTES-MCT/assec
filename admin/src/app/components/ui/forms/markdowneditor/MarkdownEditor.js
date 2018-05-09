import React from 'react';
import PropTypes from 'prop-types';

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
    return (
      <div className="markdown-editor">
        <div className="markdown-editor-container">
          <nav className="markdown-editor-navs">
            <button className={(!preview && 'active') || ''}
              onClick={this.showPreview}>
              <span>Text</span>
            </button>
            <button className={(preview && 'active') || ''}
              onClick={this.showPreview}>
              <span>Preview</span>
            </button>
          </nav>
          <div className="markdown-editor-views">
            <div className={`markdown-editor-editor ${(!preview && 'active') ||
                ''}`}>
              <textarea>Hello World</textarea>
            </div>
            <div className={`markdown-editor-preview ${(preview && 'active') ||
                ''}`} />
          </div>
        </div>
      </div>
    );
  }
}

MarkdownEditor.propTypes = {};

export default MarkdownEditor;
