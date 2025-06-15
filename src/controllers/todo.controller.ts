import { TodoService } from "../services/todo.service";

const todoService = new TodoService();

export class TodoController {
  findAll() {
    const todos = todoService.findAll();
    return new Response(todos);
  }

  findOne(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop() || "";
    const todo = todoService.findOne(id);
    return new Response(todo);
  }

  async create(req: Request) {
    const body = await req.json();
    const newTodo = todoService.create(body);
    return Response.json(newTodo);
  }

  async update(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop() || "";
    const body = await req.json();
    const updatedTodo = todoService.update(id, body);
    return Response.json(updatedTodo);
  }

  reomve(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop() || "";
    const result = todoService.remove(id);
    return new Response(result);
  }
}
