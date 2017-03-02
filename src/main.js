// @flow

import {createServer} from 'http';
import createRouter from './helpers/createRouter';
import articleController from './controllers/article-controller';
import userController from './controllers/user-controller';
import mainController from './controllers/main-controller';

const PORT = 8000;

let server = createServer();

server.on('listening', () => {
  console.log(`The HTTP server listening on http://localhost:${PORT}`);
});

server.on('request', (request: Request, response: {[setHeader: string]: (key: string, val: string) => void}) => {
  let router = createRouter(request, response);
  let {showArticles, showArticle, addArticle, editArticle, deleteArticle} = articleController;
  let {showUsers, showUser, addUser, editUser, deleteUser} = userController;

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  router.addRoute('/api/articles', showArticles);
  router.addRoute('/api/articles/add', addArticle);
  router.addRoute('/api/articles/:articleid', showArticle);
  router.addRoute('/api/articles/:articleid/edit', editArticle);
  router.addRoute('/api/articles/:articleid/delete', deleteArticle);

  router.addRoute('/api/users', showUsers);
  router.addRoute('/api/users/add', addUser);
  router.addRoute('/api/users/:userID', showUser);
  router.addRoute('/api/users/:userID/edit', editUser);
  router.addRoute('/api/users/:userID/delete', deleteUser);

  router.onNotFound(mainController.onNotFound);
  router.route(request.url);
});

server.listen(PORT);
