import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ApiTokens extends BaseSchema {
  protected tableName = "api_tokens";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("name");
      table.string("type");
      table.string("token");
      table.timestamp("expires_at").nullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
