import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/login", "AuthController.showLogin").as("show.login");
  Route.post("/login", "AuthController.login").as("login");

  Route.group(() => {
    Route.get("/verify", "AuthController.showVerify").as("show.verify");
    Route.post("/verify", "AuthController.verify").as("verify");

    Route.get("/logout","AuthController.logout").as("logout")

  }).middleware(["auth"]);
})
  .namespace("App/Controllers/Http/Web")
  .prefix("/auth")
  .as("auth");

Route.group(() => {
  Route.post("/login", "AuthController.login");

  Route.group(() => {
    Route.post("/verify", "AuthController.verify");
  }).middleware(["auth:api"]);
})
  .namespace("App/Controllers/Http/Api")
  .prefix("/api/auth");
