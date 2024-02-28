const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { projects, clients } = require("../sampleData.js");
const Project = require("../models/Project");
const Client = require("../models/Client");

// Definição do tipo GraphQL para Cliente
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Definição do tipo GraphQL para Projeto
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

// Definição do tipo de enumeração GraphQL para o status do projeto
const StatusEnumType = new GraphQLEnumType({
  name: "ProjectStatus",
  values: {
    NOT_STARTED: { value: "Not Started" },
    IN_PROGRESS: { value: "In Progress" },
    COMPLETED: { value: "Completed" },
  },
});

// Definição das queries GraphQL
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

// Definição das mutações GraphQL
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        // Verificar se o email já está em uso por outro usuário
        const existingUserWithEmail = await Client.findOne({
          email: args.email,
        });
        if (existingUserWithEmail) {
          throw new Error("Email já está em uso.");
        }

        // Verificar se o nome de usuário já está em uso por outro usuário
        const existingUserWithName = await Client.findOne({ name: args.name });
        if (existingUserWithName) {
          throw new Error("Nome de usuário já está em uso.");
        }

        // Criar e salvar o novo usuário
        const client = new Client(args);
        return await client.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        return await Client.findByIdAndDelete(args.id);
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: { type: StatusEnumType },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const project = new Project(args);
        return await project.save();
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        return await Project.findByIdAndDelete(args.id);
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: StatusEnumType },
      },
      async resolve(parent, args) {
        return await Project.findByIdAndUpdate(args.id, args, { new: true });
      },
    },
  },
});

// Exportação do esquema GraphQL
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
