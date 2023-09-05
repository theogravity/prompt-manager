import { NextFunction } from "express";
import { RequestContext } from "../utils/request-context.js";
import { IRequest, IResponse } from "../interfaces/index.js";

export function requestContextMiddleware() {
  return (req: IRequest, res: IResponse, next: NextFunction) => {
    res.apifire = {
      disableAutoSend: false,
    };
    req.context = new RequestContext(req, res);
    req.context.logger.info(
      `Request ${req.method} ${req.path} id: ${req.context.getReqId()}`,
    );
    next();
  };
}
