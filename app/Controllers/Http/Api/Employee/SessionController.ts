import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";
import _ from "lodash";

export default class SessionController {
  public async list({ request }: HttpContextContract) {
    const parking = request.parking;

    const keyword = request.input("keyword");

    await parking.preload("sessions", (builder) => {
      builder
        .where("status", "hold")
        .where((builder) => {
          if (keyword) {
            builder.where("number_plate", "like", `%${keyword}%`);
          }
        })
        .preload("nfcCard")
        .preload("vehicle")
        .orderBy("updated_at", "desc")
        .limit(100);
    });

    return parking.sessions;
  }

  public async detail({ request, params }: HttpContextContract) {
    const parking = request.parking;

    await parking.preload("nfcCards", (builder) => {
      builder
        .where("card_code", params.id)
        .where("is_lock", false)
        .preload("sessions", (builder) => {
          builder
            .where("status", "hold")
            .orderBy("updated_at", "desc")
            .preload("vehicle")
            .preload("nfcCard")
            .first();
        })
        .first();
    });

    return parking.nfcCards;
  }

  public async addNew({ request, params, auth }: HttpContextContract) {
    const parking = request.parking;

    const vehiceId = request.input("vehicle_id");
    const payload = request.only(["number_plate", "price"]);
    const thumb = request.file("thumb", {
      extnames: ["webp"],
      size: "1mb",
    });

    if (_.isNil(auth.user)) {
      return;
    }

    await parking.preload("nfcCards", (builder) => {
      builder
        .where("card_code", params.id)
        .where("is_lock", false)
        .whereDoesntHave("sessions", (builder) => {
          builder.where("status", "hold");
        })
        .first();
    });
    await parking.preload("vehicles", (builder) => {
      builder.where("vehicle_id", vehiceId).first();
    });

    const nfcCard = parking.nfcCards[0];
    const vehice = parking.vehicles[0];

    if (_.isNil(nfcCard) || _.isNil(vehice)) {
      return;
    }

    const session = await parking.related("sessions").create(payload);

    await session.related("nfcCard").associate(nfcCard);
    await session.related("vehicle").associate(vehice);
    await session.related("employee").associate(auth.user);

    if (!_.isNil(thumb) && !thumb.hasErrors) {
      const folder = "uploads/thumb";
      const fileName = `${nfcCard.cardCode}_${new Date().getTime()}`;

      await thumb.move(Application.publicPath(folder), {
        name: `${fileName}.${thumb.extname}`,
        overwrite: true,
      });

      session.thumbUrl = `${folder}/${fileName}.${thumb.extname}`;
      await session.save();
    }

    return session;
  }

  public async change({ request, params }: HttpContextContract) {
    const parking = request.parking;

    const action = request.input("action");

    await parking.preload("nfcCards", (builder) => {
      builder
        .where("card_code", params.id)
        .where("is_lock", false)
        .preload("sessions", (builder) => {
          builder.orderBy("updated_at", "desc").limit(1);
        })
        .first();
    });

    const nfcCard = parking.nfcCards[0];

    if (_.isNil(nfcCard)) {
      return;
    }

    const session = nfcCard.sessions[0];

    if (_.isNil(session)) {
      return;
    }

    switch (action) {
      case "paid":
        if (_.isEqual(session.status, "hold")) {
          session.status = "paid";
          await session.save();
        }
        break;
      case "lock":
        if (!nfcCard.isLock) {
          nfcCard.isLock = true;
          await nfcCard.save();
        }
        break;
      default:
        break;
    }
  }
}
