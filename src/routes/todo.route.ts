import { TodoController } from "../controllers/todo.controller";

const todoController = new TodoController();

export const todoRoutes = {
  "/api/todo": {
    GET: todoController.findAll,
    POST: todoController.create,
  },

  "/api/todo/:id": {
    GET: todoController.findOne,
    PUT: todoController.update,
    DELETE: todoController.reomve,
  },
};
