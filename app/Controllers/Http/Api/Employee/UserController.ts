import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import _ from "lodash";

export default class UserController {
  public async me({ request, auth }: HttpContextContract) {
    const parking = request.parking;

    if (_.isNil(auth.user)) {
      return;
    }

    const user = auth.user;

    const totalSession = await parking
      .related("sessions")
      .query()
      .where("employee_id", user.id)
      .count("* as total")
      .first();
    const totalPaid = await parking
      .related("sessions")
      .query()
      .where("employee_id", user.id)
      .where("status", "paid")
      .count("* as total")
      .first();
    const totalLostCard = await parking
      .related("nfcCards")
      .query()
      .where("is_lock", true)
      .whereHas("sessions", (builder) => {
        builder.where("employee_id", user.id);
      })
      .count("* as total")
      .first();

    return {
      ...auth.user.toJSON(),
      stats: {
        total_session: parseInt(totalSession.total, 10),
        total_paid: parseInt(totalPaid.total, 10),
        total_lost_card: parseInt(totalLostCard.total, 10),
      },
    };
  }

  public async logout({ auth }: HttpContextContract) {
    return auth.logout();
  }
}
