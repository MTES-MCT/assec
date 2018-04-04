import React from 'react';
import { Mutation } from 'react-apollo';

// application
import { createPerson } from './graph';

const PersonForm = () => {
  let email;
  let lastname;
  let firstname;
  return (
    <Mutation mutation={createPerson}>
      {(addPerson, { data }) => {
        console.log('data', data);
        return (
          <form onSubmit={(evt) => {
            evt.preventDefault();
            console.log('email', email);
            console.log('lastname', lastname);
            console.log('firstname', firstname);
            addPerson({
              variables: {
                email: email.value,
                lastname: lastname.value,
                firstname: firstname.value,
              },
            });
            email.value = '';
            lastname.value = '';
            firstname.value = '';
          }}>
            <fieldset>
              <legend>Add new person</legend>
              <p>
                <label htmlFor="firstname">
                  <span>Firstname</span>
                  <input id="firstname"
                    name="firstname"
                    type="text"
                    ref={(node) => {
                      firstname = node;
                    }} />
                </label>
              </p>
              <p>
                <label htmlFor="lastname">
                  <span>Lastname</span>
                  <input id="lastname"
                    name="lastname"
                    type="text"
                    ref={(node) => {
                      lastname = node;
                    }} />
                </label>
              </p>
              <p>
                <label htmlFor="email">
                  <span>eMail</span>
                  <input id="email"
                    name="email"
                    type="text"
                    ref={(node) => {
                      email = node;
                    }} />
                </label>
              </p>
              <p>
                <button type="submit">
                  <span>Submit</span>
                </button>
              </p>
            </fieldset>
          </form>
        );
      }}
    </Mutation>
  );
};

export default PersonForm;
