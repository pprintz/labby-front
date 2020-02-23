import React from 'react';
import Main from '../layouts/Main';
import { match } from 'react-router-dom';
import { connect } from 'react-redux';
import CharacterView from '../features/characters/components/CharacterView';
import { loadCharacterAsync } from '../features/characters/actions';

type OwnProps = {
  match: match<{ character: string }>;
};

const dispatchProps = {
  loadCharacterAsync: (charName: string) => loadCharacterAsync.request(charName),
};

type Props = OwnProps & typeof dispatchProps;

const ViewCharacter = ({ match, loadCharacterAsync }: Props) => {
  loadCharacterAsync(match.params.character);
  return (
    <Main>
      <CharacterView />
    </Main>
  );
};

export default connect(null, dispatchProps)(ViewCharacter);
