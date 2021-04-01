import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Parking from "App/Models/Parking";
import Session from "App/Models/Session";
import moment from "moment";

moment.locale('vi');

export default class NfcCard extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public cardCode: string;

  @column()
  public isLock: Boolean;

  @column()
  public parkingId: number;

  @belongsTo(() => Parking)
  public parking: BelongsTo<typeof Parking>;

  @hasMany(() => Session)
  public sessions: HasMany<typeof Session>;

  @column.dateTime({
    autoCreate: true, serialize: (value?: DateTime) => {
      return moment(value).format('h:mm:ss, Do MMMM  YYYY')
    },
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true, autoUpdate: true, serialize: (value?: DateTime) => {
      return moment(value).format('h:mm:ss, Do MMMM  YYYY')
    },
  })
  public updatedAt: DateTime;
}
