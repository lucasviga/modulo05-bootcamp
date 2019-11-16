/* eslint-disable react/static-property-placement */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 1,
    loading: true,
    refreshing: false,
  };

  // loading ja inicia o componente carregado...

  async componentDidMount() {
    this.load();
  }

  // inicia com a page = 1
  load = async (page = 1) => {
    const { stars } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
    });
  };

  loadMore = async () => {
    const { page } = this.state;

    const nextPage = page + 1;

    this.load(nextPage);
  };

  // reset page count
  refreshList = () => {
    this.setState({ refreshing: true });

    this.setState({ page: 1, refreshing: false });
    this.componentDidMount();
  };

  handleOpenWebView = repo => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repo });
  };

  render() {
    const { stars, loading, refreshing } = this.state;
    const { navigation } = this.props;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <Stars
            data={stars}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            ListFooterComponent={<Loading />}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleOpenWebView(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
