import { gql } from "@apollo/client";

/**
 * Consulta para obter a lista de todos os clientes.
 *
 * @returns {[Client]} Uma lista de clientes com seus IDs, nomes, e-mails e números de telefone.
 */
const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS };
