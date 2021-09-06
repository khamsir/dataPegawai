import React, { useEffect } from 'react';
import MainPage from './components/mainPage';
import { simpanData } from './actions';
import { store } from './index.js';
import { urlSatu } from './utils/url';

const App = () => {

  useEffect(() => {
    fetch(`${urlSatu}/provinsi`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        store.dispatch(simpanData(data.provinsi))
      });
  }, []);

  return (
    <div className="App">
      <MainPage />
    </div>
  )
}

export default App;