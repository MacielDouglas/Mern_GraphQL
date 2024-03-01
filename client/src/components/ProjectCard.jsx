export default function ProjectCard({ project }) {
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between  align-content-center ">
            <h5 className="card-title">{project.name}</h5>
            <a className="btn btn-light " href={`/project/${project.id}`}>
              Acessar
            </a>
          </div>
          <p className="small">
            Status: <strong>{project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
