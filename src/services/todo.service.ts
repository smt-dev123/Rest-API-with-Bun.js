export class TodoService {
  findAll() {
    return "This is find all todo.";
  }

  findOne(id: string) {
    return `This is find todo by id: ${id}.`;
  }

  create(body: any) {
    return {
      id: crypto.randomUUID(),
      ...body,
    };
  }

  update(id: string, body: any) {
    return {
      id: id,
      ...body,
      updated: true,
    };
  }

  remove(id: string) {
    return `This is deleted todo by id: ${id}.`;
  }
}
