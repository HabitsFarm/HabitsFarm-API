import { H3Event } from "h3";
import { $st } from "../../../i18n/$st";
import { AppResult } from "../../domain/types/app-result";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated.middleware";

export class ProtectedController {
  async execute(event: H3Event): Promise<AppResult> {
    try {
      const { error } = await ensureAuthenticated(event, [1, 2]);

      if (error) {
        throw error;
      }

      return {
        result: {
          message: $st("protected.this_is_a_protected_data_from_the_server"),
        },
      };
    } catch (error) {
      event.node.res.statusCode = 400;

      return {
        message: (error as AppResult).message,
      };
    }
  }
}
