import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import _ from "lodash";
import Card from "App/Models/NfcCard";
import moment from "moment";

export default class CardsController {

    public async index({ view, request }: HttpContextContract) {
        const parking = request.parking;

        if (!_.isNull(parking)) {
            const card = await Card.query().select("*").where("parking_id", parking.id);

            return view.render('parking.pages.card.index', { card });
        }

    };

    public async lost({ view, params, request }: HttpContextContract) {
        const card = await Card.query().where({ "id": params.id, "parking_id": request.parking.id }).first();
        if (!_.isNull(card)) {
            card.isLock = true;
            await card.save();
        }
        return { result: true };
    }
    public async open({ view, params, request }: HttpContextContract) {
        const card = await Card.query().where({ "id": params.id, "parking_id": request.parking.id }).first();
        if (!_.isNull(card)) {
            const a = moment(card.createdAt).format('LLL');
            // card.createdAt = a;

            card.isLock = false;
            await card.save();
        }
        return { result: true };
    }
}
