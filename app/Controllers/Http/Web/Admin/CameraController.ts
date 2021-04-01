import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Parking from "App/Models/Parking";
import Camera from "App/Models/Camera";
import _ from "lodash";
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class CameraController {
  public async index({ params, view }: HttpContextContract) {
    const parking = await Parking.query()
      .where("id", params.parking_id)
      .preload("cameras")
      .first();

    if (!_.isNull(parking)) {
      const state = {
        parking: parking.toJSON(),
      };
      return view.render("admin.pages.cameras.index", state);
    }
  }

  public async create({ params, view }: HttpContextContract) {
    const parking = await Parking.find(params.parking_id);

    if (!_.isNull(parking)) {
      const state = {
        parking: parking.toJSON(),
      };
      return view.render("admin.pages.cameras.create", state);
    }
  }

  public async store({ request, response, params, session }: HttpContextContract) {
    const payload = request.only(["name", "streamUrl"]);
    const isActive = _.isEqual(request.input("isActive"), "on");

    const parking = await Parking.find(params.parking_id);

    //validate
    await request.validate({
      schema: schema.create({

        name: schema.string({ trim: true }, [
          rules.minLength(2),
          rules.maxLength(50),
        ]),
        streamUrl: schema.string({ trim: true }, [
          rules.unique({
            table: 'cameras',
            column: 'stream_url',
          }),
        ]),
      }),
      messages: {
        required: 'Không để trống',

        'name.minLength': 'Tên tối thiểu 2 ký tự',
        'name.maxLength': 'Tên tối đa 50 ký tự',

        'streamUrl.unique': 'Luồng trực tiếp đã được dùng',
      },
    });
    //

    if (!_.isNull(parking)) {
      const camera = await parking.related("cameras").create(payload);
      camera.isActive = isActive;

      await camera.save();

      session.flash('success', 'Thêm thành công');

      return response.redirect().toRoute("admin.parkings.cameras.index", {
        parking_id: parking.id,
      });
    }
  }

  public async edit({ view, params }: HttpContextContract) {
    const parking = await Parking.find(params.parking_id);


    if (!_.isNull(parking)) {
      const camera = await Camera.query()
        .where("parking_id", parking.id)
        .where("id", params.id)
        .first();

      if (!_.isNull(camera)) {
        const state = {
          parking: parking.toJSON(),
          camera: camera.toJSON(),
        };
        return view.render("admin.pages.cameras.edit", state);
      }
    }
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    const payload = request.only(["name", "streamUrl"]);
    const isActive = _.isEqual(request.input("isActive"), "on");

    const parking = await Parking.find(params.parking_id);

    //validate
    await request.validate({
      schema: schema.create({

        name: schema.string({ trim: true }, [
          rules.minLength(2),
          rules.maxLength(50),
        ]),
        streamUrl: schema.string({ trim: true }, [
          rules.unique({
            table: 'cameras',
            column: 'stream_url',
            whereNot: { id: params.id },
          }),
        ]),
      }),
      messages: {
        required: 'Không để trống',

        'name.minLength': 'Tên tối thiểu 2 ký tự',
        'name.maxLength': 'Tên tối đa 50 ký tự',

        'streamUrl.unique': 'Luồng trực tiếp đã được dùng',
      },
    });
    //

    if (!_.isNull(parking)) {
      const camera = await Camera.query()
        .where("parking_id", parking.id)
        .where("id", params.id)
        .first();

      if (!_.isNull(camera)) {
        camera.merge(payload);
        camera.isActive = isActive;

        await camera.save();

        session.flash('success', 'Sửa thành công');
        
        return response.redirect().toRoute("admin.parkings.cameras.index", {
          parking_id: parking.id,
        });
      }
    }

    return response.redirect().back();
  }

  public async destroy({ params }: HttpContextContract) {
    const parking = await Parking.find(params.parking_id);

    if (!_.isNull(parking)) {
      const camera = await Camera.query()
        .where("parking_id", parking.id)
        .where("id", params.id)
        .first();

      if (!_.isNull(camera)) {
        await camera.delete();

        return {
          success: true,
        };
      }
    }
  }
}
