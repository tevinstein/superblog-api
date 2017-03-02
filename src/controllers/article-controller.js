//@flow

import ArticleDB from '../db';
import readJSONRequest from '../helpers/readJSONRequest';
import sendResponse from '../helpers/sendResponse';

export default {
  showArticles,
  addArticle,
  showArticle,
  editArticle,
  deleteArticle,
};

async function showArticles(req: Object, res: Object) {
  let query: Object;
  let map = (doc) => {
    emit(doc.type);
  };
  try {
    query = await ArticleDB.query(map, {
      key: 'article',
      include_docs: true,
    });
  } catch (err) {
    sendResponse(res, 400, {success: false, message: err.message});
    return;
  }
  let {rows} = query;
  let data = rows.map((row) => {
    let {id} = row;
    let {author, title, content, image, date_created} = row.doc;
    return {id, author, title, content, image, date_created};
  });
  sendResponse(res, 200, {success: true, data});
}

async function addArticle(req: Object, res: Object) {
  let data: Object = await readJSONRequest(req);
  let doc;
  try {
    let dateNow = new Date();
    doc = await ArticleDB.post({
      author: data.author,
      title: data.title,
      content: data.content,
      image: data.image,
      date_created: dateNow.toISOString(),
      type: 'article',
    });
  } catch (err) {
    sendResponse(res, 400, {success: false, message: err.message});
    return;
  }
  let {ok, id} = doc;
  sendResponse(res, 200, {success: ok, id});
}

async function showArticle(req: Object, res: Object, articleid: string) {
  let doc: Object;
  try {
    doc = await ArticleDB.get(articleid);
  } catch (err) {
    sendResponse(res, 400, {success: false, message: err.message});
    return;
  }
  let {_id, type, _rev, ...otherProps} = doc;
  sendResponse(res, 200, {success: true, data: {id: _id, ...otherProps}});
}

async function editArticle(req: Object, res: Object, articleid: string) {
  let data: Object = await readJSONRequest(req);
  let doc;
  let docResponse: Object;
  try {
    doc = await ArticleDB.get(articleid);
    docResponse = await ArticleDB.put({
      _id: articleid,
      _rev: doc._rev,
      author: data.author,
      title: data.title,
      content: data.content,
      image: data.image,
      date_created: doc.date_created,
      type: doc.type,
    });
  } catch (err) {
    sendResponse(res, 400, {success: false, message: err.message});
    return;
  }
  let {ok, id} = docResponse;
  sendResponse(res, 200, {success: ok, id});
}

async function deleteArticle(req: Object, res: Object, articleid: string) {
  let doc: Object;
  let docResponse: Object;
  try {
    doc = await ArticleDB.get(articleid);
    docResponse = await ArticleDB.remove(doc);
  } catch (err) {
    sendResponse(res, 400, {success: false, message: err.message});
    return;
  }
  let {ok, id} = docResponse;
  sendResponse(res, 200, {success: ok, id});
}
