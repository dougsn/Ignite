import { useEffect, useState } from "react";
import { RepositoryItem } from "./RepositoryItem";

import "../styles/repositories.scss";

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]); // Tipando o estado, que é salvo com os dados da API

  // Toda vez que repositories mudar, o useEffect será disparado. Que no caso é a sua 'dependencia'
  // Caso o array esteja vazio, o useEffect sera executado uma unica vez, assim que o componente foi renderizado.

  useEffect(() => {
    // Consumindo a API do github
    fetch("https://api.github.com/orgs/rocketseat/repos")
      .then((response) => response.json())
      .then((data) => setRepositories(data)); // Passando os dados consultados para o estado.
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositóros</h1>
      <ul>
        {repositories.map((repository) => {
          return <RepositoryItem key={repository.name} repository={repository} />;
        })}
      </ul>
    </section>
  );
}
