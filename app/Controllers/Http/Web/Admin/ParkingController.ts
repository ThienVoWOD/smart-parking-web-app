import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Parking from "App/Models/Parking";
import Vehicle from "App/Models/Vehicle";
import _ from "lodash";

import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class ParkingController {
  public async index({ view }: HttpContextContract) {
    const state = {
      parkings: await Parking.all(),
    };
    return view.render("admin.pages.parkings.index", state);
  }

  public async create({ view }: HttpContextContract) {
    const state = {
      vehicles: await Vehicle.all(),
    };
    return view.render("admin.pages.parkings.create", state);
  }

  public async store({ request, response, session }: HttpContextContract) {
    const payload = request.only(["name", "phoneNumber", "email", "address"]);
    // const payload = request.only(["name", "address"]);
    const vehicleIds = request.input("vehicles", []);
    const isActive = _.isEqual(request.input("isActive"), "on");

    await request.validate({
      schema: schema.create({
        name: schema.string({ trim: true }),
        address: schema.string({ trim: true }),
        email: schema.string({ trim: true }, [
          rules.email(),
          rules.unique({
            table: 'parkings',
            column: 'email',

          })
        ]),
        phoneNumber: schema.string({ trim: true }, [
          rules.regex(/((09|03|07|08|05)+([0-9]{8})\b)/g),
          rules.unique({
            table: 'parkings',
            column: 'phone_number',
          })
        ]),
      }),
      messages: {
        required: 'Không để trống',
        'name.string': 'Nhập tên',

        'phoneNumber.regex': 'Số điện thoại có 10 số',
        'phoneNumber.unique': 'Số điện thoại đã dùng',

        'email.email': 'Nhập đúng email',
        'email.unique': 'Email đã được sử dụng',
      },
    })

    const parking = new Parking();
    parking.merge(payload);
    parking.isActive = isActive;

    await parking.save();
    await parking.related("vehicles").sync(vehicleIds);

    session.flash('success', 'Thêm thành công');

    return response.redirect().toRoute("admin.parkings.index");
  }

  public async edit({ params, view }: HttpContextContract) {
    const parking = await Parking.find(params.id);

    if (!_.isNull(parking)) {
      await parking.preload("vehicles");

      const state = {
        parking: parking.toJSON(),
        vehicles: await Vehicle.all(),
      };
      return view.render("admin.pages.parkings.edit", state);
    }
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    const payload = request.only(["name", "phoneNumber", "email", "address"]);
    const vehicleIds = request.input("vehicles", []);
    const isActive = _.isEqual(request.input("isActive"), "on");

    const parking = await Parking.find(params.id);

    if (!_.isNull(parking)) {

      await request.validate({
        schema: schema.create({
          name: schema.string({ trim: true }),
          address: schema.string({ trim: true }),
          email: schema.string({ trim: true }, [
            rules.email(),
            rules.unique({
              table: 'parkings',
              column: 'email',
              whereNot: { id: params.id }
            })
          ]),
          phoneNumber: schema.string({ trim: true }, [
            rules.regex(/((09|03|07|08|05)+([0-9]{8})\b)/g),
            rules.unique({
              table: 'parkings',
              column: 'phone_number',
              whereNot: { id: params.id }
            })
          ]),
        }),
        messages: {
          required: 'Không để trống',
          'name.string': 'Nhập tên',

          'phoneNumber.regex': 'Số điện thoại có 10 số',
          'phoneNumber.unique': 'Số điện thoại đã dùng',

          'email.email': 'Nhập đúng email',
          'email.unique': 'Email đã được sử dụng',
        },
      })

      parking.merge(payload);
      parking.isActive = isActive;

      await parking.save();
      await parking.related("vehicles").sync(vehicleIds);

      session.flash('success', 'Sửa thành công');
      return response.redirect().toRoute("admin.parkings.index");
    }

    return response.redirect().back();
  }

  public async destroy({ params }: HttpContextContract) {
    const parking = await Parking.find(params.id);

    if (!_.isNull(parking)) {
      await parking.delete();
    }

    return {
      success: true,
    };
  }
}
