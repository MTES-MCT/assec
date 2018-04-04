import React from 'react';
import { Mutation } from 'react-apollo';
import { Form, Field } from 'react-final-form';

// application
import { CREATE_PERSON, UPDATE_PERSONS } from './../../graphql';

const PersonForm = () => (
  <Mutation mutation={CREATE_PERSON} update={UPDATE_PERSONS}>
    {createPerson => (
      <Form onSubmit={variables => createPerson({ variables })}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Add new person</legend>
              <p>
                <label htmlFor="firstname">
                  <span>Firstname</span>
                  <Field type="text"
                    id="firstname"
                    name="firstname"
                    component="input" />
                </label>
              </p>
              <p>
                <label htmlFor="lastname">
                  <span>Lastname</span>
                  <input id="lastname" name="lastname" type="text" />
                </label>
              </p>
              <p>
                <label htmlFor="email">
                  <span>eMail</span>
                  <input id="email" name="email" type="text" />
                </label>
              </p>
              <p>
                <button type="submit"
                  className="button-big"
                  disabled={pristine || invalid}>
                  <span>Submit</span>
                </button>
              </p>
            </fieldset>
          </form>
        )} />
    )}
  </Mutation>
);

export default PersonForm;
