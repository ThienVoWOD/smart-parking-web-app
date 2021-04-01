import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sessions from "App/Models/Session";
import _ from "lodash";
import moment from "moment";

export default class SessionController {
  public async index({ view, request }: HttpContextContract) {
    const sessions = await Sessions.query().select('*').where("parking_id", request.parking.id);


    return view.render('parking.pages.session.index', {
      sessions: sessions,
    })

  }

  public async create(ctx: HttpContextContract) {
  }

  public async store(ctx: HttpContextContract) {
  }

  public async show(ctx: HttpContextContract) {
  }

  public async edit(ctx: HttpContextContract) {
  }

  public async update(ctx: HttpContextContract) {
  }

  public async destroy(ctx: HttpContextContract) {
  }

  public async holding({ view, request }: HttpContextContract) {
    const sessions = await Sessions.query().select('*').where({ "status": "hold", "parking_id": request.parking.id });

    return view.render('parking.pages.session.holding', {
      sessions: sessions,
    })
  }
}
