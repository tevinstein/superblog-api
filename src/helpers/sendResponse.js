// @flow

type Res = {
  writeHead: (status: number, data: Object) => void;
  write: (param: any) => void;
  end: () => void;
};

function sendResponse(res: Res, status: number, data: Object) {
  res.writeHead(status, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(data, null, 2) + '\n');
  res.end();
}

export default sendResponse;
