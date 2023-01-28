import { H3Event } from "h3";
import * as st from "simple-runtypes";
import { AppResult } from "../../../domain/types/app-result";
import { EMAIL_REGEX_MATCH } from "../../../utils/regexes";
import { SignInUseCase } from "./sign-in.usecase";

export class SignInController {
  constructor(private useCase: SignInUseCase) {}

  public async execute(event: H3Event): Promise<AppResult> {
    try {
      const request = await readBody(event);

      await this.validations(request);

      const result = await this.useCase.execute(request);

      return {
        result,
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
      email: st.string({
        match: EMAIL_REGEX_MATCH,
        trim: true,
      }),
      password: st.string({ minLength: 8, trim: true }),
    });

    const result = st.use(validation, request);

    if (result.ok === false) {
      throw new Error(st.getFormattedError(result.error));
    }
  }
}
