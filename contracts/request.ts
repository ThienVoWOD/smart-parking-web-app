import Parking from "App/Models/Parking";

declare module "@ioc:Adonis/Core/Request" {
  interface RequestContract {
    parking: Parking;
  }
}
