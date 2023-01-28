import { H3Event } from "h3";
import * as st from "simple-runtypes";
import { AppResult } from "../../../domain/types/app-result";
import { $st } from "../../../../i18n/$st";
import { ResetPasswordUseCase } from "./reset-password.usecase";

export class ResetPasswordController {
  constructor(private useCase: ResetPasswordUseCase) {}

  public async execute(event: H3Event): Promise<AppResult> {
    try {
      const request = await readBody(event);

      await this.validations(request);

      await this.useCase.execute(request);

      event.node.res.statusCode = 201;

      return {
        result: {
          message: $st(
            "auth.reset-password.your_password_has_been_successfully_reseted"
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
      token: st.string({ trim: true }),
      password: st.string({ minLength: 8, trim: true }),
    });

    const result = st.use(validation, request);

    if (result.ok === false) {
      throw new Error(st.getFormattedError(result.error));
    }
  }
}
