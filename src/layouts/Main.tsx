import React, { FC } from 'react';
// tslint:disable-next-line: no-import-side-effect
import './Main.css';

const Main: FC = ({ children }) => (
  <div className="App">
    <main className="App-main">{children}</main>
  </div>
);
export default Main;
