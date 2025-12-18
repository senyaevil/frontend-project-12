const SERVER_PATH = '/api/v1';

const routes = {
  loginPath: () => [SERVER_PATH, 'login'].join('/'),
  signupPath: () => [SERVER_PATH, 'signup'].join('/'),
  channelsPath: () => [SERVER_PATH, 'channels'].join('/'),
  messagesPath: () => [SERVER_PATH, 'messages'].join('/'),
  anyPage: () => '*',
  rootPage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
};

export default routes;
