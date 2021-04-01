import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import NfcCard from "App/Models/NfcCard";
import Camera from "App/Models/Camera";
import Session from "App/Models/Session";
import User from "App/Models/User";
import Vehicle from "App/Models/Vehicle";
import moment from "moment";

moment.locale('vi');

export default class Parking extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public phoneNumber: string;

  @column()
  public email: string;

  @column()
  public address: string;

  @column()
  public isActive: Boolean;

  @hasMany(() => NfcCard)
  public nfcCards: HasMany<typeof NfcCard>;

  @hasMany(() => Camera)
  public cameras: HasMany<typeof Camera>;

  @hasMany(() => Session)
  public sessions: HasMany<typeof Session>;

  @manyToMany(() => User, {
    pivotTable: "parking_has_owners",
    pivotRelatedForeignKey: "owner_id",
  })
  public owners: ManyToMany<typeof User>;

  @manyToMany(() => User, {
    pivotTable: "parking_has_employees",
    pivotRelatedForeignKey: "employee_id",
  })
  public employees: ManyToMany<typeof User>;

  @manyToMany(() => Vehicle, {
    pivotTable: "parking_has_vehicles",
    pivotColumns: ["default_price"],
  })
  public vehicles: ManyToMany<typeof Vehicle>;

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
