import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class NfcCards extends BaseSchema {
  protected tableName = "nfc_cards";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("card_code");
      table.boolean("is_lock").defaultTo(false);
      table
        .integer("parking_id")
        .unsigned()
        .references("id")
        .inTable("parkings")
        .onDelete("CASCADE");
      table
        .integer("admin_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
