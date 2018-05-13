import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import {
  DELETE_QUESTION,
  GET_DEPARTMENT_QUESTIONS,
  UPDATE_DEPARTMENT_QUESTIONS,
} from './../../apolloql';
import NoContent from './../ui/NoContent';
import TinyLoader from './../ui/TinyLoader';
import DataTable from './../ui/datatable/DataTable';
import QuestionPopin from './../popins/QuestionPopin';
import { openPopin, openDeletePopin } from './../../actions';

class QuestionTable extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onEditClick ({ id, label }) {
    const popin = { id, label, Type: QuestionPopin };
    this.props.dispatch(openPopin(popin));
  }

  onDeleteClick ({ id, label }) {
    const opts = {
      id,
      name: label,
      deleteAction: DELETE_QUESTION,
      updateAction: UPDATE_DEPARTMENT_QUESTIONS,
    };
    this.props.dispatch(openDeletePopin(opts));
  }

  render () {
    const { selected } = this.props;
    return (
      <Query query={GET_DEPARTMENT_QUESTIONS}
        variables={{ department: selected }}>
        {({ loading, error, data }) => {
          if (error) return <p>Error </p>;
          const provider = data.departmentQuestions || null;
          const hasentities = provider && provider.length > 0;
          return (
            <React.Fragment>
              {loading && <TinyLoader />}
              {!hasentities && (
                <div id="page-main-column">
                  <NoContent description="Ajouter un question en utilisant le formulaire ci-contre" />
                </div>
              )}
              {hasentities && (
                <DataTable provider={provider}
                  actions={{
                    edit: this.onEditClick,
                    delete: this.onDeleteClick,
                  }}
                  cols={[
                    {
                      key: 'title',
                      label: 'Questions',
                    },
                    {
                      key: 'order',
                      label: 'Ordre',
                      cssclass: 'small align-center',
                    },
                  ]} />
              )}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

QuestionTable.defaultProps = {
  selected: null,
};

QuestionTable.propTypes = {
  selected: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(QuestionTable);
