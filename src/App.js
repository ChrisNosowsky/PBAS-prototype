import React from 'react';
import './App.css';
import { Route, Switch  } from 'react-router-dom';
import Error from './components/Error';
import ScrollIntoView from './components/ScrollIntoView';
import Prototype from './components/Prototype';
import Bib from './components/Bib';
import Credit from './components/Credit';

function App() {
  return (
    <div className="App">
      <ScrollIntoView>
          <Switch>
              <Route onUpdate={() => window.scrollTo(0, 0)} path="/PBAS/Prototype" component={Prototype} exact/>
              <Route onUpdate={() => window.scrollTo(0, 0)} path="/PBAS/Bib" component={Bib} />
              <Route onUpdate={() => window.scrollTo(0, 0)} path="/PBAS/Credits" component={Credit} />
              <Route component={Error} />
          </Switch>
        </ScrollIntoView>
    </div>
  );
}

export default App;
