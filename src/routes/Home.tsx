import React from 'react';
import Main from '../layouts/Main';
import CharacterList from '../features/characters/components/CharacterList';
import { loadCharactersAsync } from '../features/characters/actions';
import { connect } from 'react-redux';

const dispatchProps = {
  loadCharactersAsync: () => loadCharactersAsync.request(),
};

type Props = typeof dispatchProps;

const Home = ({ loadCharactersAsync }: Props) => {
  loadCharactersAsync();
  return (
    <Main>
      <CharacterList />
    </Main>
  );
};

export default connect(null, dispatchProps)(Home);
