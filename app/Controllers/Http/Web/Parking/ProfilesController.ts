import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import _ from "lodash";

export default class ProfilesController {
    public async index({ view, request, auth }: HttpContextContract) {

        const user = auth.user;
        return view.render("parking.pages.profile", { user });
        // return user;
    }

    public async update({ view, request, auth, params,session,response }: HttpContextContract) {
        const payload = request.only(["name"]);
        const parking = request.parking;

        if (!_.isNull(parking)) {

            const owner = await parking
                .related("owners")
                .query()
                .where("owner_id", params.id)
                .first();

            if(!_.isNull(owner)){
                owner.merge(payload);
                await owner.save();

                session.flash('success', 'Sửa thành công');
                return response.redirect().toRoute('parking.profile');
            }
        }

    }
}
