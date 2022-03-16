import repositorio from "../repositorio/filmes.repositorio";

function adicionarFilme(filme) {
  const anoCorrente = new Date().getFullYear();
  const filmesAtuais = repositorio.getFilmes();
  // Existe um filme igual já registrado?
  const idFilme = filmesAtuais.findIndex(
    (filmeRegistrado) =>
      filme.ano === filmeRegistrado.ano &&
      filme.titulo === filmeRegistrado.titulo
  );
  if (idFilme > -1) {
    throw Error("Não são permitidos filmes iguais");
  }

  if (filme.ano > anoCorrente) {
    throw Error("Não são permitidos filmes em datas futuras");
  }
  repositorio.adicionarFilme(filme);
}

function removerFilme(filmeARemover) {
  const idFilme = repositorio.getId(filmeARemover);
  repositorio.removerFilme(idFilme);
}

function getQtdeFilmes() {
  return repositorio.getQtdeFilmes();
}

export default {
  adicionarFilme,
  removerFilme,
  getQtdeFilmes,
};
