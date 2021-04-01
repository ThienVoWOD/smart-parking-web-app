import Route from "@ioc:Adonis/Core/Route";


Route.group(() => {

    Route.get("/", "HomeController.index").as("index");
    Route.resource("/sessions", "SessionController");

    Route.get("/holding", "SessionController.holding").as("sessions.holding");

    Route.resource("/users", "UsersController");

    Route.get("/card", "CardsController.index").as("card");
    Route.post("/card/lost/:id", "CardsController.lost").as("lost");
    Route.post("/card/open/:id", "CardsController.open").as("open");

    Route.get("/camera", "CamerasController.index").as("camera");
    Route.get("/camera/:id", "CamerasController.detail").as("camera.detail")

    Route.get("/profile", "ProfilesController.index").as("profile");
    Route.put("/profile/edit/:id", "ProfilesController.update").as("profile.edit");
})
    .namespace("App/Controllers/Http/Web/Parking")
    .prefix("/parking")
    .middleware(["auth", "verify:parking_owner"])
    .as("parking");