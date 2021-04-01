import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Vehicle from "App/Models/Vehicle";
import User from "App/Models/User";
import Parking from "App/Models/Parking";

export default class SampleSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        id: 1,
        name: "Hà",
        phoneNumber: "0987654321",
        role: "admin",
      },
      {
        id: 2,
        name: "Hà",
        phoneNumber: "0987654322",
        role: "parking_owner",
      },
      {
        id: 3,
        name: "Hà",
        phoneNumber: "0987654323",
        role: "employee",
      },
      {
        id: 4,
        name: "Hà",
        phoneNumber: "0987654324",
        role: "employee",
      },
    ]);

    await Vehicle.createMany([
      {
        id: 1,
        name: "Xe số",
        iconData: "111",
      },
      {
        id: 2,
        name: "Tay ga",
        iconData: "111",
      },
    ]);

    const parking = await Parking.createMany([
      {
        name: "FPT Polytechnic",
        isActive: true,
      },
    ]);

    await parking[0].related("vehicles").sync({
      1: {
        default_price: 5000,
      },
      2: {
        default_price: 6000,
      },
    });
    await parking[0].related('owners').sync([2]);
    await parking[0].related("employees").sync([3, 4]);
    await parking[0].related("nfcCards").createMany([
      {
        id: 1,
        cardCode: "1111",
      },
      {
        id: 2,
        cardCode: "2222",
      },
      {
        id: 3,
        cardCode: "3333",
      },
      {
        id: 4,
        cardCode: "24047E2B",
      },
    ]);
    await parking[0].related("sessions").createMany([
      // {
      //   id: 1,
      //   numberPlate: "47B1 000.00",
      //   thumbUrl: "uploads/thumb/demo.jpg",
      //   price: 5000,
      //   employeeId: 3,
      //   vehicleId: 1,
      //   nfcCardId: 1,
      // },
      // {
      //   id: 2,
      //   numberPlate: "47B1 000.01",
      //   thumbUrl: "uploads/thumb/demo.jpg",
      //   price: 5000,
      //   employeeId: 3,
      //   vehicleId: 2,
      //   nfcCardId: 2,
      // },
      // {
      //   id: 3,
      //   numberPlate: "47B1 000.02",
      //   thumbUrl: "",
      //   price: 5000,
      //   employeeId: 3,
      //   vehicleId: 2,
      //   nfcCardId: 3,
      // },
    ]);
  }
}
