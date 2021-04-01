import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import AuthException from "App/Exceptions/AuthException";
import AuthVerifyException from "App/Exceptions/AuthVerifyException";
import User from "App/Models/User";
import _ from "lodash";

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const phoneNumber = request.input("phone_number");

    const user = await User.findBy("phone_number", phoneNumber);

    if (_.isNull(user)) {
      throw new AuthException("Không tìm thấy tài khoản.", 401);
    }

    if (!_.isEqual(user.role, "employee")) {
      throw new AuthException("Tài khoản không có quyền truy cập.", 401);
    }

    user.verifyCode = _.random(100000, 999999).toString();
    await user.save();

    Logger.info("Mã xác minh là: %s", user.verifyCode);

    return auth.use("api").login(user);
  }

  public async verify({ request, auth }: HttpContextContract) {
    const verifyCode = request.input("verify_code");

    if (_.isUndefined(auth.user)) {
      throw new AuthVerifyException("Không tìm thấy tài khoản.", 401);
    }

    const user = auth.user;

    if (!_.isEqual(user.verifyCode, verifyCode)) {
      throw new AuthVerifyException("Mã xác minh không chính xác.", 401);
    }

    user.verifyCode = null;
    await user.save();
  }
}
