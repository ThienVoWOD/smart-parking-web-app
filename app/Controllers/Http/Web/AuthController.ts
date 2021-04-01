import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import User from "App/Models/User";
import _ from "lodash";

export default class AuthController {
  public async showLogin({ view }: HttpContextContract) {
    return view.render("auth/login");
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const phoneNumber = request.input("phone_number");

    const user = await User.findBy("phone_number", phoneNumber);

    if (!_.isNull(user) && _.indexOf(['admin', 'parking_owner'], user.role) != -1) {
      user.verifyCode = _.random(100000, 999999).toString();
      await user.save();

      Logger.info("Mã xác minh là: %s", user.verifyCode);

      await auth.login(user, true);

      return response.redirect().toRoute("auth.verify");
    }

    return response.redirect().back();
  }

  public async showVerify({ view }: HttpContextContract) {
    return view.render("auth/verify");
  }

  public async verify({ request, response, auth }: HttpContextContract) {
    const verifyCode = request.input("verify_code");

    if (!_.isUndefined(auth.user)) {
      const user = auth.user;

      if (_.isEqual(user.verifyCode, verifyCode)) {
        user.verifyCode = null;
        await user.save();

      }

      if (_.isEqual(user.role, "admin")) {

        return response.redirect().toRoute("admin.dashboard");
      } else if (_.isEqual(user.role, "parking_owner")) {

        return response.redirect().toRoute("parking.index");
      }
    }

    return response.redirect().back();
  }

  public async logout({view,auth}:HttpContextContract){

    await auth.logout();
    return view.render("auth.login");
    
  }
}
