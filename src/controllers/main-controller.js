//@flow

export default {
  onNotFound: (request: Object, response: Object) => {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({message: 'Resource not found!'}));
  },
};
