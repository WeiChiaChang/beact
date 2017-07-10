import React from 'react';
// import MuiThemeProvider from '../../node_modules/material-ui/styles/MuiThemeProvider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DrumMachine from './DrumMachine';

const App = () => (
  <MuiThemeProvider>
    <DrumMachine />
  </MuiThemeProvider>
);

export default App;
