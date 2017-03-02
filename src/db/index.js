// @flow

import PouchDB from 'pouchdb';
import {join} from 'path';

let ArticleDB = new PouchDB(join(__dirname, '../db/articles'));

export default ArticleDB;
