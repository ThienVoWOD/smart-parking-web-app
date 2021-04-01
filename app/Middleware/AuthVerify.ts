import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Parking from "App/Models/Parking";
import _ from "lodash";

export default class AuthVerify {
  public async handle(
    { request, response, auth }: HttpContextContract,
    next: () => Promise<void>,
    args: any
  ) {
    if (
      _.indexOf(request.url(), "/auth/verify") == -1 &&
      (await auth.check())
    ) {
      if (_.isUndefined(auth.user)) {
        return;
      }

      const user = auth.user;


      if (!_.isNull(user.verifyCode)) {
        return;
      }

      if (!_.isEqual(args[0], user.role)) {
        await auth.logout();

        return response.redirect().toRoute('auth.show.login');
      }

      switch (user.role) {
        case "employee":
          {
            const parking = await Parking.query()
              .whereHas("employees", (builder) => {
                if (!_.isNull(auth.user)) {
                  builder.where("employee_id", user.id);
                }
              })
              .first();

            if (_.isNull(parking)) {
              return;
            }

            request.parking = parking;
          }
          break;
        case "parking_owner":
          {
            const parking = await Parking.query()
              .whereHas("owners", (builder) => {
                if (!_.isNull(auth.user)) {
                  builder.where("owner_id", user.id);
                }
              })
              .first();

            if (_.isNull(parking)) {
              return;
            }

            request.parking = parking;
          }
          break;
        default:
          break;
      }
    }

    await next();
  }
}
