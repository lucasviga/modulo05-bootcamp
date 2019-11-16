import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

// import { Container } from './styles';

export default function Repository({ navigation }) {
  return (
    <WebView
      source={{ uri: navigation.getParam('repo').html_url }}
      style={{ flex: 1 }}
    />
  );
}

Repository.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repo').full_name,
});

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
