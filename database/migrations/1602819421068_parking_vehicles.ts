import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ParkingVehicles extends BaseSchema {
  protected tableName = "parking_has_vehicles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("default_price").defaultTo(0);
      table
        .integer("vehicle_id")
        .unsigned()
        .references("id")
        .inTable("vehicles")
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
