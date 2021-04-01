import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Parking from "App/Models/Parking";
import User from "App/Models/User";
import _ from "lodash";
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UsersController {
  public async index({ request, view }: HttpContextContract) {

    const parking = request.parking;
    await parking.preload("employees");

    const employees = parking.employees;
    // return parking.employees;
    return view.render("parking.pages.user.index", { employees: employees });
  }

  public async create({ view }: HttpContextContract) {

    return view.render("parking.pages.user.create");
  }

  public async store({ view, request, response, session }: HttpContextContract) {

    const payload = request.only(["name", "phone_number"]);
    const isActive = _.isEqual(request.input("isActive"), "on");
    const parking = await Parking.find(request.parking.id);
    //validate
    await request.validate({
      schema: schema.create({

        name: schema.string({ trim: true }, [
          rules.minLength(2),
          rules.maxLength(50),
        ]),
        phone_number: schema.string({ trim: true }, [
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
        
        'phone_number.regex': 'Số điện thoại có 10 số',
        'phone_number.unique': 'Số điện thoại đã được sử dụng',
      },
    });
    //
    if (!_.isNull(parking)) {

      const employees = parking.related("employees").create(payload);
      (await employees).isActive = isActive;
      (await employees).role = "employee";
      (await employees).save();

      session.flash('create_success', 'Thêm thành công!');
      return response.redirect().toRoute("parking.users.index");
    }
    return response.redirect().back();
  }

  public async show(ctx: HttpContextContract) {
  }

  public async edit({ view, params, request, response }: HttpContextContract) {

    const parking = request.parking;

    if (!_.isNull(parking)) {
      const employee = await parking
        .related("employees")
        .query()
        .where("employee_id", params.id)
        .first();

      if (!_.isNull(employee)) {
        return view.render('parking.pages.user.edit', {
          employee
        });
        // return employee.phoneNumber;
      }
      return response.redirect().back();
    }
    return response.redirect().back();

  }

  public async update({ params, request, response, session }: HttpContextContract) {

    const payload = request.only(["name", "phoneNumber"]);
    const isActive = _.isEqual(request.input("isActive"), "on");
    const parking = request.parking;
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

      const employee = await parking
        .related("employees")
        .query()
        .where("employee_id", params.id)
        .first();

      if (!_.isNull(employee)) {
        employee.merge(payload);
        employee.isActive = isActive;
        await employee.save();

        session.flash('update_success', 'Sửa thành công!');
        return response.redirect().toRoute("parking.users.index");
      }
      return response.redirect().back();
    }
    return response.redirect().back();
  }

  public async destroy({ request, params }: HttpContextContract) {
    const parking = request.parking;

    if (!_.isNull(parking)) {
      const employee = await parking
        .related("employees")
        .query()
        .where("employee_id", params.id)
        .first();
      if (!_.isNull(employee)) {

        await parking.related('employees').detach([params.id]);
        await employee.delete();

        return { success: true };
      }
    }

    return null;
  }
}
