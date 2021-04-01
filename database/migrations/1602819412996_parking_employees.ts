import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ParkingEmployees extends BaseSchema {
  protected tableName = "parking_has_employees";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("employee_id")
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
