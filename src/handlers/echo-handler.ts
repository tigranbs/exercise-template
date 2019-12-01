import {HealthService, checkHealth} from "../services";
import {isInvalidHttpMethod, isInvalidQuery} from "../lib/utils";

const paths = ["echo"];

const handler = function (req, context, responseCallback) {
  // this is from health
  if (isInvalidHttpMethod(req, "get", responseCallback)) return;
  if (isInvalidQuery(req, ['q'], '', responseCallback)) return;

  responseCallback({q: req.query.q});
};
export {paths, handler};
