import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function startServer() {
  const app = express();
  const Port = Number(process.env.PORT) || 8000;
  app.use(express.json());

  //create GraphQL Server
  const gqlserver = new ApolloServer({
      typeDefs: `
        type Query{
            hello: String
            say(name: String): String
            }`,
      resolvers: {
          Query: {
              hello: () => "Hello I am GraphQL Server",
              say: (_, {name}: {name: String}) => `Hey ${name}, How are you?`,
        },
    },
  });
  await gqlserver.start();

  app.use("/graphql", expressMiddleware(gqlserver));

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and Running" });
  });

  app.listen(Port, () => console.log(`Server started at Port: ${Port}`));
}

startServer();
