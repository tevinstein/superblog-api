// @flow

function readRequest<T: Object | events$EventEmitter>(request: T): Promise<Buffer> {
  let promise = new Promise((resolve, reject) => {
    let chunks = [];
    request.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });
    request.on('error', (error: Error) => {
      reject(error);
    });
    request.on('end', () => {
      let data = Buffer.concat(chunks);
      resolve(data);
    });
  });
  return promise;
}

async function readJSONRequest(request: Object): Object {
  let rawData = await readRequest(request);
  let data: Object = JSON.parse(rawData.toString());
  return data;
}

export default readJSONRequest;
