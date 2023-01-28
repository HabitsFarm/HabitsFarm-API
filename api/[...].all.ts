import { AppResult } from "../app/domain/types/app-result";
import { $st } from "../i18n/$st";

export default defineEventHandler((event): AppResult => {
  event.node.res.statusCode = 404;

  return {
    error: {
      code: 404,
      message: $st("errors.404"),
    },
  };
});
