import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TodoList from './components/TodoList';
import { useTranslation } from 'react-i18next';

function App() {
  return (
    <Provider store={store}>
      <div >
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;