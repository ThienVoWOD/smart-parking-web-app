import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Camera from "App/Models/Camera"
import _ from "lodash";


export default class CamerasController {
    public async index({ view, request }: HttpContextContract) {

        const camera = await Camera.query().where("parking_id", request.parking.id);

        return view.render("parking.pages.camera.index", { cameras: camera });

    }
    public async detail({ view, params, request }: HttpContextContract) {
        const parking = request.parking;

        await parking.preload("cameras", (buider) => {
            buider.where("id", params.id)
                .where("is_active", true).first();
        });

        const cameras = parking.cameras[0];

        return view.render('parking.pages.camera.detail', { cameras });
    }

}
