import cors from "cors";
import { Application, json } from "express";
import { requestContextMiddleware } from "./middleware/req-context-middleware.js";
import { handleErrorMiddleware } from "./middleware/handle-err-middleware.js";
// import personaRouter from './routers/persona.router'
// import thoughtRouter from './routers/thoughts.router'

export async function initApp(app: Application) {
  app.use(
    json({
      strict: true,
    }),
  );

  app.use(
    cors({
      preflightContinue: true,
      credentials: true,
    }),
  );

  // @ts-ignore
  app.use(requestContextMiddleware());

  // Add routes here
  // app.use('/account', accountRouter)
  // app.use('/persona', personaRouter)
  // app.use('/thoughts', thoughtRouter)

  // this needs to be the last item in the chain to catch errors
  // @ts-ignore
  app.use(handleErrorMiddleware());
}
