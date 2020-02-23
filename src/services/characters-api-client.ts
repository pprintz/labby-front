import { Character, CharacterDescription } from 'MyModels';
import axios, { AxiosResponse } from 'axios';

export function loadCharacters(): Promise<AxiosResponse<CharacterDescription[]>> {
  return axios.get<CharacterDescription[]>('http://localhost:4000/characters');
}
export function loadCharacter(name: string): Promise<AxiosResponse<Character>> {
  return axios.get<Character>(`http://localhost:4000/characters/${name}`);
}
