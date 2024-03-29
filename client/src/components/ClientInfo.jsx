import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
import PropTypes from "prop-types";

export default function ClientInfo({ client }) {
  if (client === null)
    return (
      <p>Cliente não encontrado, ou não faz mais parte do banco de dados.</p>
    );
  return (
    <>
      <h5 className="mt-5">Informação do Cliente</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="icon" />
          {client.name}
        </li>
        <li className="list-group-item">
          <FaEnvelope className="icon" />
          {client.email}
        </li>
        <li className="list-group-item">
          <FaPhone className="icon" />
          {client.phone}
        </li>
      </ul>
    </>
  );
}

ClientInfo.propTypes = {
  client: PropTypes.shape({
    phone: PropTypes.string.isRequired, // ID do cliente (obrigatório)
    name: PropTypes.string.isRequired, // Nome do cliente (obrigatório)
    email: PropTypes.string.isRequired, // Telefone do cliente (obrigatório)
  }).isRequired, // A propriedade client é obrigatória
};
