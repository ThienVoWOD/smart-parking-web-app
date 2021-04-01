import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Sessions extends BaseSchema {
  protected tableName = "sessions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("number_plate");
      table.text("thumb_url");
      table.integer("price").defaultTo(0);
      table.enum("status", ["hold", "paid"]).defaultTo("hold");
      table
        .integer("vehicle_id")
        .unsigned()
        .references("id")
        .inTable("vehicles")
        .onDelete("CASCADE");
      table
        .integer("nfc_card_id")
        .unsigned()
        .references("id")
        .inTable("nfc_cards")
        .onDelete("CASCADE");
      table
        .integer("parking_id")
        .unsigned()
        .references("id")
        .inTable("parkings")
        .onDelete("CASCADE");
      table
        .integer("employee_id")
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
