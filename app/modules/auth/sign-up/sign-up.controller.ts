import { H3Event } from "h3";
import * as st from "simple-runtypes";
import { AppResult } from "../../../domain/types/app-result";
import { EMAIL_REGEX_MATCH } from "../../../utils/regexes";
import { SignUpUseCase } from "./sign-up.usecase";

export class SignUpController {
  constructor(private useCase: SignUpUseCase) {}

  public async execute(event: H3Event): Promise<AppResult> {
    try {
      const request = await readBody(event);

      await this.validations(request);

      const result = await this.useCase.execute(request);

      event.node.res.statusCode = 201;

      return {
        result,
      };
    } catch (error) {
      event.node.res.statusCode = 400;

      return error;
    }
  }

  private async validations(request: unknown) {
    const validation = st.record({
      name: st.string(),
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
