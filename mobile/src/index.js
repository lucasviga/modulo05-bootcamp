import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import './config/ReactotronConfig'

import Routes from './routes';

export default class App extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor='#0089FF' />
        <Routes />
      </>
    )
  }
}
