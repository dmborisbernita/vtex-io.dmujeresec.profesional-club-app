import { IOClients } from '@vtex/api'

import { RecaptchaClient } from "./recaptcha";
//import { RegistrationsClient } from "./registrations";
import Status from './status'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }
  public get recaptcha() {
    return this.getOrSet("recaptcha", RecaptchaClient);
  }
 /*  public get registrations() {
    return this.getOrSet("registrations", RegistrationsClient);
  } */
}
