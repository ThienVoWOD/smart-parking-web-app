import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Parking from "App/Models/Parking";
import NfcCard from "App/Models/NfcCard";
import Sessions from "App/Models/Session";
export default class DashboardController {
  public async index({ view }: HttpContextContract) {
    const SoLuong={
      SLBai:await Parking.query().count('* as SLBai').first(),
      SLThe:await NfcCard.query().count('* as SLThe').first(),
      SLLuot:await Sessions.query().count('* as SLLuot').first(),
    };
           return view.render("admin.pages.dashboard",SoLuong);
  }
}
