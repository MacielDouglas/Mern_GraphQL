import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECT } from "../queries/projectQueries";
import PropTypes from "prop-types";

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Adicione todos os campos!!!");
    }

    updateProject(name, description, status);
  };

  return (
    <div className="mt-5">
      <h3>Modificar Projeto</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="NOT_STARTED">Não Iniciado</option>
            <option value="IN_PROGRESS">Em Produção</option>
            <option value="COMPLETED">Completado</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}

// Definição das propTypes para validar as propriedades passadas para o componente
EditProjectForm.propTypes = {
  // Propriedade client deve ser um objeto com id, name, email e phone, todos obrigatórios
  project: PropTypes.shape({
    id: PropTypes.string.isRequired, // ID do cliente (obrigatório)
    name: PropTypes.string.isRequired, // Nome do cliente (obrigatório)
    description: PropTypes.string.isRequired, // Telefone do cliente (obrigatório)
  }).isRequired, // A propriedade client é obrigatória
};
