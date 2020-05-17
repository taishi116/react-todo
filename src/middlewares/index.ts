import { applyMiddleware } from "redux";
import logger from "./logger";

const middleware = applyMiddleware(logger);

export default middleware;
