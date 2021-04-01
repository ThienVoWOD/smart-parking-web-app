import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Parkings extends BaseSchema {
  protected tableName = "parkings";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name");
      table.text("phone_number");
      table.text("email");
      table.text("address");
      table.boolean("is_active").defaultTo(false);
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
