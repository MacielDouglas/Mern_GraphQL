import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutations"; // Importação da mutação DELETE_CLIENT
import PropTypes from "prop-types";

// Componente ClientRow responsável por renderizar uma linha na tabela de clientes
export default function ClientRow({ client }) {
  // Utilização do hook useMutation para executar a mutação de exclusão de cliente
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    onError: (error) => {
      // Log de erro no console em caso de falha na exclusão
      console.error("Erro ao excluir cliente:", error);
      // Alerta de erro para o usuário
      alert("Erro ao excluir cliente. Por favor, tente novamente mais tarde.");
    },
    onCompleted: () => {
      // Alerta de sucesso para o usuário
      alert("Cliente excluído com sucesso!");
      // Adicione qualquer ação adicional aqui, se necessário, após a exclusão do cliente
    },
    // refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECT }],
    update(cache) {
      // Modifica a cache local para refletir a exclusão do cliente
      cache.modify({
        fields: {
          // Filtra os clientes existentes para remover o cliente excluído
          clients(existingClients = [], { readField }) {
            return existingClients.filter(
              (existingClient) => client.id !== readField("id", existingClient)
            );
          },
        },
      });
    },
  });

  // Função para lidar com a exclusão de um cliente
  const handleDeleteClient = () => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      deleteClient(); // Chama a mutação deleteClient para excluir o cliente
    }
  };

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={handleDeleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

// Definição das propTypes para validar as propriedades passadas para o componente
ClientRow.propTypes = {
  // Propriedade client deve ser um objeto com id, name, email e phone, todos obrigatórios
  client: PropTypes.shape({
    id: PropTypes.string.isRequired, // ID do cliente (obrigatório)
    name: PropTypes.string.isRequired, // Nome do cliente (obrigatório)
    email: PropTypes.string.isRequired, // Email do cliente (obrigatório)
    phone: PropTypes.string.isRequired, // Telefone do cliente (obrigatório)
  }).isRequired, // A propriedade client é obrigatória
};
