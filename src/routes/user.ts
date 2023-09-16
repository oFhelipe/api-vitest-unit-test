import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/users", userController.create);
userRoutes.get("/users", userController.index);
userRoutes.get("/users/:id", userController.show);
userRoutes.delete("/users/:id", userController.delete);
userRoutes.put("/users/:id", userController.update);

export { userRoutes };
