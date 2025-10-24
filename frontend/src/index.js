import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store'; // 1. Import store
import { Provider } from 'react-redux'; // 2. Import Provider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* 3. Bọc <App /> bằng <Provider> và truyền 'store' vào */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// ... (phần reportWebVitals)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
