
import * as routes from "./handlers/handlers";
import * as response from "./lib/http-responses";


let handlers = {};

Object.keys(routes).forEach(key => {
    let item = {};
    routes[key].paths.forEach(path => {
        handlers[path] = routes[key].handler;
    });
    return item;
});
export const echo = function (context, req) {
  // Constructing request object, because it seems it is different between Azure and Offline local versions
  const request = {
    method: req.method || context.httpMethod,
    query: req.query || context.queryStringParameters,
    params: req.params || context.pathParameters,
    done: req.done || context.done,
  };

  let resourcePath = request.params.action;

  if (resourcePath in handlers) {
      handlers[resourcePath](request, context, responseCallback);
  } else {
      responseCallback(response.ERROR_404);
  }

  function responseCallback(response) {
    request.done(null, { body: JSON.stringify(response), status: response.code });
  }
};
