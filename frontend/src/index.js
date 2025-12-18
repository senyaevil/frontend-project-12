import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const app = async () => {
  const chat = ReactDOM.createRoot(document.querySelector('#chat'));
  chat.render(await init());
};

app();
