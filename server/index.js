const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema.js");
const connectDB = require("./config/db.js");
require("dotenv").config();
const colors = require("colors");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

//Conectando ao Banco de dados.
connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// const express = require("express");
// require("dotenv").config();
// const { graphqlHTTP } = require("express-graphql");
// const schema = require("./schema/schema.js");
// const port = process.env.PORT || 5000;

// const app = express();
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: process.env.NODE_ENV === "development",
//   })
// );

// app.listen(port, console.log(`Servidor rodando na porta ${port}`));
