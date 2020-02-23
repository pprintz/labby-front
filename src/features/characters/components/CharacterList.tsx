import { RootState } from 'MyTypes';
import React from 'react';
import { connect } from 'react-redux';
import { Spin, Icon, List, Card } from 'antd';
import { Link } from 'react-router-dom';
import { getPath } from '../../../router-paths';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.characters.isLoadingCharacters,
  characters: state.characters.characters,
});

const dispatchProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const CharacterList: React.FC<Props> = ({ characters = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <Spin
        className={'center'}
        indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
      ></Spin>
    );
  }
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 3,
      }}
      dataSource={characters}
      renderItem={character => (
        <Link to={getPath('viewCharacter', character)}>
          <List.Item>
            <Card hoverable>{capitalizeNames(character)}</Card>
          </List.Item>
        </Link>
      )}
    />
  );
};

const capitalizeNames = (s: string) =>
  s
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

export default connect(mapStateToProps, dispatchProps)(CharacterList);
