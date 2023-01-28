import { H3Event } from "h3";
import * as st from "simple-runtypes";
import { AppResult } from "../../../domain/types/app-result";
import { EMAIL_REGEX_MATCH } from "../../../utils/regexes";
import { $st } from "../../../../i18n/$st";
import { ForgotPasswordUseCase } from "./forgot-password.usecase";

export class ForgotPasswordController {
  constructor(private useCase: ForgotPasswordUseCase) {}

  public async execute(event: H3Event): Promise<AppResult> {
    try {
      const request = await readBody(event);

      await this.validations(request);

      await this.useCase.execute(request);

      return {
        result: {
          message: $st(
            "auth.forgot-password.an_email_with_a_reset_link_was_sent_to_your_mail"
          ),
        },
      };
    } catch (error) {
      event.node.res.statusCode = 400;

      return {
        message: (error as AppResult).message,
      };
    }
  }

  private async validations(request: unknown) {
    const validation = st.record({
      email: st.string({ match: EMAIL_REGEX_MATCH, trim: true }),
    });

    const result = st.use(validation, request);

    if (result.ok === false) {
      throw new Error(st.getFormattedError(result.error));
    }
  }
}
