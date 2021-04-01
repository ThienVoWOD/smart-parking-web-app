import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Cameras extends BaseSchema {
  protected tableName = "cameras";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name");
      table.text("stream_url");
      table.boolean("is_active").defaultTo(false);
      table
        .integer("parking_id")
        .unsigned()
        .references("id")
        .inTable("parkings")
        .onDelete("CASCADE");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
