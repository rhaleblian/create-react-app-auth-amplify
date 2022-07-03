import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Amplify, Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

async function getTokens() {
  const session = await Auth.currentSession();
  return { id: session.idToken.jwtToken,
           access: session.accessToken.jwtToken };
}

async function logTokens() {
  const tokens = await getTokens()
  // console.log(tokens.id);
  // console.log(tokens.access);
  console.log(tokens);
}

async function fetchEndpoint(endpoint) {
  // Sends Amplify/Cognito JWT token.
  
  const tokens = await getTokens();
  // console.log(tokens);

  const resource = 'http://localhost/api/v1/cognito/' + endpoint;
  const init = {
    headers: {
      'Authorization': tokens.id,
      // 'accessToken': tokens.access
    },
  };
  await fetch(resource, init)
  .then(response => response.json())
  .then(data => console.log(data));
}

function decode() {
  fetchEndpoint('decode');
}

function validate() {
  fetchEndpoint('validate');
}

class App extends Component {
  render() {
    logTokens();
    return (
      <div className="App">
        <AmplifySignOut />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          <p>
            <button onClick={decode}>
              Decode (Console)
            </button>
          </p>

          <p>
            <button onClick={validate}>
              Validate (Console)
            </button>
          </p>

        </header>
      </div>
    );
  }
}

export default withAuthenticator(App);
