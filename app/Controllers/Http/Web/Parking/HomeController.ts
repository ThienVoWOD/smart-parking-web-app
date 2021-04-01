import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sessions from "App/Models/Session";
import Cards from "App/Models/NfcCard";
import Database from "@ioc:Adonis/Lucid/Database";
import _ from "lodash";
import moment from "moment";

export default class HomeController {
    public async index({ view, auth, request }: HttpContextContract) {
        const parkingId = request.parking.toJSON().id;

        const data = {
            price: await Sessions.query().sum("price as price").where("parking_id", parkingId).first(),
            session: await Sessions.query().count("id as session").where("parking_id", parkingId).first(),
            card: await Cards.query().count("id as card").where("parking_id", parkingId).first(),

        }//lấy dữ liệu doanh thu, lượt gửi, thẻ nfc

        const now = moment().subtract(7, 'days').format("YYYY-MM-DD");//lấy ngày -7

        const results = await Database
            .rawQuery('SELECT DATE_FORMAT(created_at, "%Y-%m-%d") as date1, count(*) as total FROM `sessions` WHERE created_at > ? and parking_id = ?  group by date1', [now,parkingId]);//lấy dữ liệu lưu lượng gửi xe

        const revenu = await Database
            .rawQuery('SELECT DATE_FORMAT(created_at, "%Y-%m-%d") as date1, sum(price) as total FROM `sessions` WHERE created_at > ? and parking_id = ?  group by date1', [now,parkingId]); //lấy dữ liệu doanh thu

        const result_final = {
            labels: _.map(results[0], 'date1'),
            sessions: _.map(results[0], 'total')
        }

        const revenu_final = {
            labels: _.map(revenu[0], 'date1'),
            sessions: _.map(revenu[0], 'total')
        }
        
        return view.render('parking.pages.home', { data, result: result_final, revenu: revenu_final });
        
    }

}
