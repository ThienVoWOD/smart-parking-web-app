import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Parking from "App/Models/Parking";
import NfcCard from "App/Models/NfcCard";
import _ from "lodash";
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class NfcCardController {
  public async index({ params, view }: HttpContextContract) {
    const parking = await Parking.query()
      .where("id", params.parking_id)
      .preload("nfcCards")
      .first();

    if (!_.isNull(parking)) {
      const state = {
        parking: parking.toJSON(),
      };
      return view.render("admin.pages.nfc-cards.index", state);
    }
  }

  public async create({ view, params }: HttpContextContract) {
    const parking = await Parking.find(params.parking_id);

    if (!_.isNull(parking)) {
      const state = {
        parking: parking.toJSON(),
      };
      return view.render("admin.pages.nfc-cards.create", state);
    }
  }

  public async store({ request, response, params, session }: HttpContextContract) {
    const payload = request.only(["cardCode"]);

    const parking = await Parking.find(params.parking_id);
    //validate
    await request.validate({
      schema: schema.create({
        cardCode: schema.string({ trim: true }, [
          rules.minLength(2),
          rules.maxLength(50),
          rules.unique({
            table: 'nfc_cards',
            column: 'card_code'
          })
        ]),
      }),
      messages: {
        required: 'Không để trống',

        'cardCode.unique': 'Thẻ đã được sử dụng',
        'cardCode.minLength': 'Mã thẻ có tối thiểu 2 ký tự',
        'cardCode.maxLength': 'Mã thẻ có tối đa 50 ký tự',
      }
    })
    //
    if (!_.isNull(parking)) {
      await parking.related("nfcCards").create(payload);

      session.flash('success', 'Thêm thành công');

      return response.redirect().toRoute("admin.parkings.nfc_cards.index", {
        parking_id: parking.id,
      });
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const nfcCard = await NfcCard.query()
      .where("parkingId", params.parking_id)
      .where("id", params.id)
      .first();

    if (!_.isNull(nfcCard)) {
      
      nfcCard.isLock = !nfcCard.isLock;
      await nfcCard.save();
    }

    return {
      success: true,
    };
  }
}
