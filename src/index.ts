import figlet from "figlet";
import { todoRoutes } from "./routes/todo.route";

const server = Bun.serve({
  routes: {
    ...todoRoutes,
  },
  fetch(req) {
    return new Response("404! Not Found", { status: 404 });
  },
  port: 3001,
});

console.log(figlet.textSync("Bun.js"));
console.log(`Listening on http://localhost:${server.port}`);
