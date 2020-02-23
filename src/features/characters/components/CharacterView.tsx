import React from 'react';

import { RootState } from 'MyTypes';
import { Spin, Icon, List, Card } from 'antd';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.characters.isLoadingCharacter,
  character: state.characters.character,
});

const dispatchProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const CharacterView: React.FC<Props> = ({ isLoading, character }) => {
  if (isLoading) {
    return (
      <Spin
        className={'center'}
        indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
      ></Spin>
    );
  }
  return (
    <p>
      <h1>{character.name}</h1>
      <List
        dataSource={character.moves}
        renderItem={move => (
          <List.Item>
            <Card hoverable>{move.command.join(',')}</Card>
          </List.Item>
        )}
      ></List>
    </p>
  );
};

export default connect(mapStateToProps, dispatchProps)(CharacterView);
