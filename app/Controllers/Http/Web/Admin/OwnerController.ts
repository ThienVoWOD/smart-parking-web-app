import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Parking from "App/Models/Parking";
import User from "App/Models/User";
import _ from "lodash";
import { schema, rules } from '@ioc:Adonis/Core/Validator';


export default class OwnerController {
  public async index({ params, view }: HttpContextContract) {
    const parking = await Parking.find(params.parking_id);

    if (!_.isNull(parking)) {
      await parking.preload("owners");

      const state = {
        parking: parking.toJSON(),
      };
      return view.render("admin.pages.owners.index", state);
    }
  }

  public async create({ view, params }: HttpContextContract) {
    const parking = await Parking.find(params.parking_id);

    if (!_.isNull(parking)) {
      const state = {
        parking: parking.toJSON(),
      };
      return view.render("admin.pages.owners.create", state);
    }
  }

  public async store({ request, response, params, session }: HttpContextContract) {
    const payload = request.only(["name", "phoneNumber"]);
    const isActive = _.isEqual(request.input("isActive"), "on");

    const parking = await Parking.find(params.parking_id);

    if (!_.isNull(parking)) {
      await parking.preload("owners");
      if (parking.owners != null) {

        session.flash('message', 'Bãi xe đã có người quản lý (Mỗi bãi xe chỉ có 1 tài khoản quản lý! Không thể thêm.)');

        return response.redirect().back();
      }
    }

    //validate
    await request.validate({
      schema: schema.create({

        name: schema.string({ trim: true }, [
          rules.minLength(2),
          rules.maxLength(50),
        ]),
        phoneNumber: schema.string({ trim: true }, [
          rules.regex(/((09|03|07|08|05)+([0-9]{8})\b)/g),
          rules.unique({
            table: 'users',
            column: 'phone_number',
          })
        ]),
      }),
      messages: {
        required: 'Không để trống',

        'name.minLength': 'Tên tối thiểu 2 ký tự',
        'name.maxLength': 'Tên tối đa 50 ký tự',

        'phoneNumber.regex': 'Số điện thoại có 10 số',
        'phoneNumber.unique': 'Số điện thoại đã được sử dụng',
      },
    });
    //

    if (!_.isNull(parking)) {
      const owner = await parking.related("owners").create(payload);
      owner.isActive = isActive;
      owner.role = "parking_owner";
      await owner.save();

      session.flash('success', 'Thêm thành công');

      return response.redirect().toRoute("admin.parkings.owners.index", {
        parking_id: parking.id,
      });
    }
  }

  public async edit({ params, view }: HttpContextContract) {
    const parking = await Parking.find(params.parking_id);

    if (!_.isNull(parking)) {
      const owner = await parking
        .related("owners")
        .query()
        .where("owner_id", params.id)
        .first();

      if (!_.isNull(owner)) {
        const state = {
          parking: parking.toJSON(),
          owner: owner.toJSON(),
        };
        return view.render("admin.pages.owners.edit", state);
      }
    }
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    const payload = request.only(["name", "phoneNumber"]);
    const isActive = _.isEqual(request.input("isActive"), "on");

    const parking = await Parking.find(params.parking_id);

    //validate
    await request.validate({
      schema: schema.create({

        name: schema.string({ trim: true }, [
          rules.minLength(2),
          rules.maxLength(50),
        ]),
        phoneNumber: schema.string({ trim: true }, [
          rules.regex(/((09|03|07|08|05)+([0-9]{8})\b)/g),

          rules.unique({
            table: 'users',
            column: 'phone_number',
            whereNot: { id: params.id }
          })
        ]),
      }),
      messages: {
        required: 'Không để trống',

        'name.minLength': 'Tên tối thiểu 2 ký tự',
        'name.maxLength': 'Tên tối đa 50 ký tự',

        'phoneNumber.regex': 'Số điện thoại có 10 số',
        'phoneNumber.unique': 'Số điện thoại đã được sử dụng',
      },
    });
    //

    if (!_.isNull(parking)) {
      const owner = await parking
        .related("owners")
        .query()
        .where("owner_id", params.id)
        .first();

      if (!_.isNull(owner)) {
        owner.merge(payload);
        owner.isActive = isActive;

        await owner.save();

        session.flash('success', 'Sửa thành công');

        return response.redirect().toRoute("admin.parkings.owners.index", {
          parking_id: parking.id,
        });
      }
    }

    return response.redirect().back();
  }

  public async destroy({ params }: HttpContextContract) {
    const parking = await Parking.find(params.parking_id);

    if (!_.isNull(parking)) {

      const user = await User.find(params.id);

      if (!_.isNull(user)) {

        await parking.related("owners").detach([user.id]);
        await user.delete();

        return {
          success: true,
        };
      }
    }
  }
}
