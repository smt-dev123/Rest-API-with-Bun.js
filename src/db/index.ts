import { Database } from "bun:sqlite";
import { model } from "./post.model";
import type { postType } from "./type";

const db = new Database("mydb.sqlite");
model();

const server = Bun.serve({
  routes: {
    "/api/post": {
      GET: () => {
        try {
          const posts = db.query("SELECT * FROM posts").all();

          if (posts.length === 0 || posts.length === null) {
            return new Response(JSON.stringify({ message: "Not found." }), {
              status: 404,
            });
          }
          return Response.json({ posts });
        } catch (error) {
          return new Response(
            JSON.stringify({ message: "Internal server error." }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },

      POST: async (req: Request) => {
        try {
          const { name, sex } = (await req.json()) as postType;

          if (!name || !sex) {
            return new Response(
              JSON.stringify({ message: "Name and sex are required." }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          const query = db.query(
            "INSERT INTO posts (name, sex) VALUES (?, ?) RETURNING id, name, sex"
          );
          const post = query.get(name, sex);

          return new Response(JSON.stringify(post), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ message: "Internal server error." }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },

    "/api/post/:id": {
      GET: async (req: Request) => {
        try {
          const url = new URL(req.url);
          const id = url.pathname.split("/").pop() || "";

          const query = db.query("SELECT * FROM posts WHERE id = ?");
          const post = await query.get(id);

          if (!post || post === null) {
            return new Response(JSON.stringify({ message: "Not found." }), {
              status: 404,
            });
          }
          return Response.json(post);
        } catch (error) {
          return new Response(
            JSON.stringify({ message: "Internal server error." }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },

      PUT: async (req: Request) => {
        try {
          const url = new URL(req.url);
          const id = url.pathname.split("/").pop() || "";
          const { name, sex } = (await req.json()) as postType;

          if (!name || !sex) {
            return new Response(
              JSON.stringify({ message: "Name and sex are required." }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          const query = db.query(
            "UPDATE posts SET name = ?, sex = ? WHERE id = ? RETURNING id, name, sex"
          );
          const post = query.get(name, sex, id);

          if (!post || post === null) {
            return new Response(JSON.stringify({ message: "Not found." }), {
              status: 404,
            });
          }

          return new Response(
            JSON.stringify({ message: "posts updated successfully.", post }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (error) {
          return new Response(
            JSON.stringify({ message: "Internal server error." }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },

      DELETE: async (req: Request) => {
        try {
          const url = new URL(req.url);
          const id = url.pathname.split("/").pop() || "";

          const query = db.query("DELETE FROM posts WHERE id = ? RETURNING id");
          const result = query.get(id);

          if (!result || result === null) {
            return new Response(JSON.stringify({ message: "Not found." }), {
              status: 404,
            });
          }

          return Response.json({ message: "posts deleted successfully." });
        } catch (error) {
          return new Response(
            JSON.stringify({ message: "Internal server error." }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
  fetch() {
    return new Response("404! Not Found", { status: 404 });
  },
  port: 3001,
});

console.log(`Listening on http://localhost:${server.port}`);
