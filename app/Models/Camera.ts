import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Parking from "App/Models/Parking";

export default class Camera extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public streamUrl: string;

  @column()
  public isActive: Boolean;

  @column()
  public parkingId: number;

  @belongsTo(() => Parking)
  public parking: BelongsTo<typeof Parking>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
