import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import _ from "lodash";

import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class AdminController {
  public async index({ view }: HttpContextContract) {
    const state = {
      admins: await User.query().where("role", "admin"),
    };
    return view.render("admin.pages.admins.index", state);
  }

  public async create({ view }: HttpContextContract) {
    return view.render("admin.pages.admins.create");
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only(["name", "phoneNumber"]);
    const isActive = _.isEqual(request.input("isActive"), "on");

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

    const user = new User();
    user.merge(payload);
    user.role = "admin";
    user.isActive = isActive;
    await user.save();

    return response.redirect().toRoute("admin.admins.index");
  }

  public async edit({ view, params }: HttpContextContract) {
    const state = {
      admin: await User.find(params.id),
    };
    return view.render("admin.pages.admins.edit", state);
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = request.only(["name", "phoneNumber"]);
    const isActive = _.isEqual(request.input("isActive"), "on");

    const user = await User.find(params.id);

    if (!_.isNull(user)) {

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

      user.merge(payload);
      user.isActive = isActive;

      await user.save();

      return response.redirect().toRoute("admin.admins.index");
    }
    return response.redirect().back();
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.find(params.id);

    if (!_.isNull(user)) {
      const total = await User.query()
        .where("role", "admin")
        .count("* as total");

      if (total[0].total > 1) {
        await user.delete();

        return {
          success: true,
        };
      }
    }
  }
}
