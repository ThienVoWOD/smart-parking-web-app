import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class VehicleController {
  public async index({ request }: HttpContextContract) {
    const parking = request.parking;

    await parking.preload("vehicles");

    return parking.vehicles;
  }
}
