import { LogLayer } from "loglayer";
import { getLogger, generateId } from "@internal/utils";
import { IRequest, IRequestContext, IResponse } from "../interfaces/index.js";

export class RequestContext implements IRequestContext {
  reqId: string;
  logger: LogLayer;
  req: IRequest;
  res: IResponse;

  constructor(req: IRequest, res: IResponse) {
    this.reqId = generateId();
    this.logger = getLogger().withContext({
      reqId: this.reqId,
    });

    this.req = req;
    this.res = res;
  }

  getLogger() {
    return this.logger;
  }

  getReqId(): string {
    return this.reqId;
  }
}
