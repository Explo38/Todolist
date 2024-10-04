import React from 'react';
import Tache from './components/tache/tache'; 

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>Ma TodoList</h1>
      </header>
      <main>
        <Tache />   
      </main>
    </div>
  );
};

export default App;
