import React from 'react';
import './App.css';
import MainPage from './pages/MainPage'
import DataProvider from "./providers/DataProvider";

function App() {
  return (
    <DataProvider>
      <MainPage/>
    </DataProvider>
  );
}

export default App;
