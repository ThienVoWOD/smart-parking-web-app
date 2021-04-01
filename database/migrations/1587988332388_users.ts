import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Users extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("email");
      table.string("phone_number");
      table.string("password");
      table.string("verify_code");
      table.string("remember_me_token").nullable();
      table.enum("role", ["admin", "parking_owner", "employee"]);
      table.boolean("is_active").defaultTo(false);
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
