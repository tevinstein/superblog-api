//@flow

import ArticleDB from '../db';
import readJSONRequest from '../helpers/readJSONRequest';
import sendResponse from '../helpers/sendResponse';

export default {
  showUsers,
  addUser,
  showUser,
  editUser,
  deleteUser,
};

async function showUsers(req: Object, res: Object) {
  let query;
  let map = (doc) => {
    emit(doc.type);
  };
  try {
    query = await ArticleDB.query(map, {
      key: 'user',
      include_docs: true,
    });
  } catch (err) {
    sendResponse(res, 400, {success: false, message: err.message});
    return;
  }
  let {rows} = query;
  let data = rows.map((row) => {
    let {id} = row;
    let {name, email, password, avatar, date_created} = row.doc;
    return {id, name, email, password, avatar, date_created};
  });
  sendResponse(res, 200, {success: true, data});
}

async function addUser(req: Object, res: Object) {
  let data = await readJSONRequest(req);
  let doc;
  try {
    doc = await ArticleDB.post({
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
      date_created: new Date().toISOString(),
      type: 'user',
    });
  } catch (err) {
    sendResponse(res, 400, {success: false, message: err.message});
    return;
  }
  let {ok, id} = doc;
  sendResponse(res, 200, {success: ok, id});
}

async function showUser(req: Object, res: Object, userID: String) {
  let doc;
  try {
    doc = await ArticleDB.get(userID);
  } catch (err) {
    sendResponse(res, 400, {success: false, message: err.message});
    return;
  }
  let {_id, type, _rev, ...otherProps} = doc;
  sendResponse(res, 200, {success: true, data: {id: _id, ...otherProps}});
}

async function editUser(req: Object, res: Object, userID: String) {
  let data = await readJSONRequest(req);
  let doc;
  let docResponse;
  try {
    doc = await ArticleDB.get(userID);
    docResponse = await ArticleDB.put({
      _id: userID,
      _rev: doc._rev,
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
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

async function deleteUser(req: Object, res: Object, userID: String) {
  let doc;
  let docResponse;
  try {
    doc = await ArticleDB.get(userID);
    docResponse = await ArticleDB.remove(doc);
  } catch (err) {
    sendResponse(res, 400, {success: false, message: err.message});
    return;
  }
  let {ok, id} = docResponse;
  sendResponse(res, 200, {success: ok, id});
}
