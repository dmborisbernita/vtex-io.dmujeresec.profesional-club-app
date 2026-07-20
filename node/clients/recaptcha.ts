import type { InstanceOptions, IOContext } from "@vtex/api";
import { ExternalClient } from "@vtex/api";

interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
}

export class RecaptchaClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super("https://www.google.com", context, options);
  }

  public verify(secret: string, token: string) {
    return this.http.post<RecaptchaVerifyResponse>(
      `/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      null
    );
  }
}
