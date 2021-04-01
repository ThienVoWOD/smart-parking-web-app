import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "DashboardController.index").as("dashboard");
  Route.resource("parkings", "ParkingController");
  Route.resource("parkings.owners", "OwnerController");
  Route.resource("parkings.nfc-cards", "NfcCardController");
  Route.resource("parkings.cameras", "CameraController");
  Route.resource("admins", "AdminController");
})
  .namespace("App/Controllers/Http/Web/Admin")
  .prefix("/admin")
  .middleware(["auth", "verify:admin"])
  .as("admin");
