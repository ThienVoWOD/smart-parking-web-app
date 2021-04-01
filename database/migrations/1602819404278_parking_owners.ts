import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ParkingOwners extends BaseSchema {
  protected tableName = "parking_has_owners";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("owner_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
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
