import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Parking from "App/Models/Parking";
import NfcCard from "App/Models/NfcCard";
import Vehicle from "App/Models/Vehicle";
import User from "./User";
import moment from "moment";

moment.locale('vi');

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public numberPlate: string;

  @column()
  public thumbUrl: string | null;

  @column()
  public price: number;

  @column()
  public status: string;

  @column()
  public parkingId: number;

  @belongsTo(() => Parking)
  public parking: BelongsTo<typeof Parking>;

  @column()
  public nfcCardId: number;

  @belongsTo(() => NfcCard)
  public nfcCard: BelongsTo<typeof NfcCard>;

  @column()
  public vehicleId: number;

  @belongsTo(() => Vehicle)
  public vehicle: BelongsTo<typeof Vehicle>;

  @column()
  public employeeId: number;

  @belongsTo(() => User, {
    foreignKey: "employeeId",
  })
  public employee: BelongsTo<typeof User>;

  @column.dateTime({
    autoCreate: true,
    serialize: (value?: DateTime) => {
      return moment(value).format('h:mm:ss, Do MMMM  YYYY')
    },
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true, autoUpdate: true,
    serialize: (value?: DateTime) => {
      return moment(value).format('h:mm:ss, Do MMMM  YYYY')
    },
  })
  public updatedAt: DateTime;
}
