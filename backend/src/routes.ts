import { Router } from "express";

import UsersController from "./controllers/UsersController";

const routes = Router();

routes.get("/users", UsersController.findAll);
routes.get("/users/:id", UsersController.findOne);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.delete);

export default routes;