import { DateTime } from "luxon";
import { column, BaseModel, afterUpdate } from "@ioc:Adonis/Lucid/Orm";
import Config from "@ioc:Adonis/Core/Config";
import Logger from "@ioc:Adonis/Core/Logger";
import Env from "@ioc:Adonis/Core/Env";
import _ from "lodash";
import Axios from "axios";
import moment from "moment";

moment.locale('vi');

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public phoneNumber: string;

  @column()
  public verifyCode: string | null;

  @column()
  public role: string;

  @column()
  public email: string;

  @column()
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column()
  public isActive: Boolean;

  @column.dateTime({ autoCreate: true,
    serialize: (value?: DateTime) => {
      return moment(value).format('h:mm:ss, Do MMMM  YYYY')
    }, })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true ,
    serialize: (value?: DateTime) => {
      return moment(value).format('h:mm:ss, Do MMMM  YYYY')
    },})
  public updatedAt: DateTime;

  @afterUpdate()
  public static async afterUpdateHook(user: User) {
    if (!_.isNull(user.verifyCode)) {
      const apiKey = Config.get("esms.apiKey");
      const secretKey = Config.get("esms.secretKey");

      const res = await Axios.get(
        "http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get",
        {
          params: {
            Phone: user.phoneNumber,
            Content: `Mã xác minh SmartParking của bạn là: ${user.verifyCode}`,
            ApiKey: apiKey,
            SecretKey: secretKey,
            SmsType: 8,
            Sandbox: Env.get("NODE_ENV") == "production" ? 0 : 1,
          },
        }
      );

      switch (parseInt(res.data["CodeResult"], 10)) {
        case 100:
          Logger.info("Đã gửi mã xác minh thành công!");
          break;
        default:
          Logger.warn("Không thể gửi mã xác minh.");
          break;
      }
    }
  }
}
