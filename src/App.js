import React, { useState, useEffect } from 'react';
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(res => {
        const repos = res.data;

        setRepositories(repos);
      });

  }, [])

  async function handleAddRepository() {
    const newRepository = await api.post('repositories', {
      title: `Título ${Date.now()}`,
      url: `https://github.com/Rocketseat/${Date.now()}`,
      techs: ["Node", "Web"],
    });

    setRepositories([...repositories, newRepository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id)

    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
