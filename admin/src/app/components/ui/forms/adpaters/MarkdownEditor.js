import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import { convertToRaw, EditorState } from 'draft-js';
import { stateFromMarkdown } from 'draft-js-import-markdown';

const setEditorState = (value) => {
  const rawvalue = value || '';
  const content = stateFromMarkdown(rawvalue);
  return EditorState.createWithContent(content);
};

const editorToolbar = {
  options: ['inline', 'blockType'],
  inline: {
    options: ['bold', 'italic', 'underline', 'strikethrough'],
  },
  blockType: {
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
  },
};

class MarkdownEditor extends React.PureComponent {
  constructor (props) {
    super(props);
    this.editorReference = null;
    this.showEditor = this.showEditor.bind(this);
    this.showPreview = this.showPreview.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    const rawvalue = props.input.value || '';
    this.state = {
      rawvalue,
      preview: true,
      editorState: setEditorState(rawvalue),
    };
  }

  componentWillReceiveProps (next) {
    if (next.input.value !== this.state.rawvalue) {
      const rawvalue = next.input.value;
      this.setState({
        rawvalue,
        editorState: setEditorState(rawvalue),
      });
    }
  }

  onEditorStateChange (editorState) {
    const { input } = this.props;
    const rawvalue =
      editorState &&
      draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState, rawvalue }, () => input.onChange(rawvalue));
  }

  showEditor () {
    this.setState({ preview: false });
  }

  showPreview () {
    this.setState({ preview: true });
  }

  render () {
    const { label, disabled } = this.props;
    const { preview, rawvalue, editorState } = this.state;
    const editcss = (!preview && 'active') || '';
    const previewcss = (preview && 'active') || '';
    return (
      <div className="markdown-editor">
        <div className="markdown-editor-container">
          <div className="markdown-editor-header flex-columns flex-between">
            <span>
              <b>{label}</b>
            </span>
            <nav className="markdown-editor-views">
              <button type="button"
                disabled={preview}
                className={previewcss}
                onClick={this.showPreview}>
                <span>
                  Preview <i className="icon icon-eye" />
                </span>
              </button>
              <button type="button"
                disabled={!preview}
                className={editcss}
                onClick={this.showEditor}>
                <span>
                  Text <i className="icon icon-code" />
                </span>
              </button>
            </nav>
          </div>
          <div className="markdown-editor-views">
            <div className={`markdown-editor-preview ${previewcss}`}
              style={{ display: (preview && 'block') || 'none' }}>
              <Editor readOnly={disabled}
                toolbar={editorToolbar}
                editorState={editorState}
                editorClassName="markdown-draft-editor"
                wrapperClassName="markdown-draft-wrapper"
                toolbarClassName="markdown-draft-toolbar"
                onEditorStateChange={this.onEditorStateChange} />
            </div>
            <div className={`markdown-editor-raw ${editcss}`}
              style={{ display: (preview && 'none') || 'block' }}>
              <textarea disabled
                value={rawvalue}
                className="xlarge"
                component="textarea" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MarkdownEditor.defaultProps = {
  disabled: false,
};

MarkdownEditor.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
};

export default MarkdownEditor;
