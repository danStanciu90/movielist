import { ThemeProvider } from '@material-ui/styles';
import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../../components/Header';
import { theme } from '../../theme/theme';
import { AddMovie } from '../AddMovie';
import { MovieList } from '../MovieList';

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <div style={{ marginTop: 20, padding: 20, paddingTop: 0 }}>
          <Routes>
            <Route element={<MovieList />} path="/" />
            <Route element={<AddMovie />} path="/add" />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};
