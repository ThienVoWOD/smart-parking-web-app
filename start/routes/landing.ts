import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.on('/').render('landing.pages.home');
  Route.on('/home.html').render('landing.pages.home');
  Route.on("/nhom.html").render("landing.pages.team");
  Route.on("/lien-he.html").render("landing.pages.contact");
  Route.on("/bang-gia.html").render("landing.pages.price");
});
