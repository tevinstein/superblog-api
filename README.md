# article-api

Clone repository `git clone https://github.com/tevinstein/article-api.git`

#### INSTALLATION
- Install packages: `npm install`
- Run the server: `npm start`
- Server is located on: `http://localhost:8000`

#### REST API

##### Articles

| URL                     | Method | Description                 |
|-------------------------|--------|-----------------------------|
| /api/articles              | GET    | Show all article         |
| /api/articles/add          | POST   | Add an article      |
| /api/articles/:id         | GET    | Show an article          |
| /api/articles/:id/edit   | POST   | Edit an article       |
| /api/articles/:id/delete | GET    | Delete an article          |

##### Users

| URL                     | Method | Description                 |
|-------------------------|--------|-----------------------------|
| /api/users              | GET    | Show all user         |
| /api/users/add          | POST   | Add an user      |
| /api/users/:id         | GET    | Show an user          |
| /api/users/:id/edit   | POST   | Edit an user       |
| /api/users/:id/delete | GET    | Delete an user          |
