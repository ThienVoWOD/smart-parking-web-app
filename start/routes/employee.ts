import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/me", "UserController.me");
  Route.delete("/me", "UserController.logout");

  Route.get("/vehicles", "VehicleController.index");

  Route.get("/sessions", "SessionController.list");
  Route.post("/sessions/:id", "SessionController.addNew");
  Route.get("/sessions/:id", "SessionController.detail");
  Route.put("/sessions/:id", "SessionController.change");
})
  .namespace("App/Controllers/Http/Api/Employee")
  .prefix("/api/employee")
  .middleware(["auth:api", "verify:api"]);
