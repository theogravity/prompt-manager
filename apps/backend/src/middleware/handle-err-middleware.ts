import { BaseError } from "new-error";
import { generateId } from "@internal/utils";
import { NextFunction } from "express";
import { getErrRegistry } from "../utils/errors.js";
import { IRequest, IResponse } from "../interfaces/index.js";

export function handleErrorMiddleware() {
  return (err: any, req: IRequest, res: IResponse, next: NextFunction) => {
    const errs = getErrRegistry();

    if (err && err instanceof BaseError) {
      err.withErrorId(generateId());

      switch (err.getErrorType()) {
        case "INVALID_REQ_PARAMS":
          // don't really care, don't log
          break;
        default:
          // log the error for internal purposes
          req.context.logger.errorOnly(err.toJSON());
      }

      res.status(err.getStatusCode() ?? 500);
      return res.json({
        reqId: req.context.getReqId(),
        err: err.toJSONSafe(),
      });
    } else if (err) {
      const newErr = errs
        .newError("INTERNAL_SERVER_ERROR", "UNCATEGORIZED")
        .withErrorId(err.errId);

      res.status(500);

      req.context.logger.errorOnly(err);

      return res.json({
        reqId: req.context.getReqId(),
        err: newErr.toJSONSafe(),
      });
    }

    next();
  };
}
