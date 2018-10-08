import React, { Component } from 'react';
import App from './App';
import Error from './Error';

export default class Wrapper extends React.Component {
 
      render() {
          return (
            <div>
                yooooo
                <Error>
                    <App />
                </Error>
            </div>
          );

      }
    }

