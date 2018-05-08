import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Query, Mutation } from 'react-apollo';

// application
import EditPopin from './EditPopin';

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withEditPopin = (
  WrappedComponent,
  {
    entityname, suptitle, query, mutation, validator,
  },
) => {
  const PopinHOC = props => (
    <Query query={query} variables={{ id: props.id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error </p>;
        const entity = data[entityname];
        return (
          <Mutation mutation={mutation}>
            {(update, result) => (
              <Form initialValues={entity}
                onSubmit={() => {}}
                validate={validator}
                mutators={{ ...arrayMutators }}
                render={formprops => (
                  <EditPopin {...props}
                    entity={entity}
                    suptitle={suptitle}
                    loading={result.loading}
                    formprops={formprops}>
                    <WrappedComponent formprops={formprops}
                      disabled={formprops.pristine || result.loading} />
                  </EditPopin>
                )} />
            )}
          </Mutation>
        );
      }}
    </Query>
  );

  PopinHOC.propTypes = {
    id: PropTypes.string.isRequired,
  };

  PopinHOC.displayName = `withEditPopin(${getDisplayName(WrappedComponent)})`;

  return PopinHOC;
};

export default withEditPopin;
