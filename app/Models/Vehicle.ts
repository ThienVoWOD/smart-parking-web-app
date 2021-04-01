import { DateTime } from "luxon";
import { BaseModel, column, computed } from "@ioc:Adonis/Lucid/Orm";
import moment from "moment";

moment.locale('vi');

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public iconData: string;

  @computed()
  public get price() {
    return this.$extras.pivot_default_price;
  }

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
