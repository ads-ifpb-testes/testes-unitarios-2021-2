const colecao = [];

function adicionarFilme(filme) {
  colecao.push(filme);
}

function removerFilme(indiceFilme) {
  colecao.splice(indiceFilme, 1);
}

function getId(filme) {
  return colecao.findIndex(
    (filmeNaColecao) =>
      filmeNaColecao.nome === filmeARemover.nome &&
      filmeNaColecao.ano === filmeARemover.ano
  );
}

function getFilmes() {
  return colecao;
}

function getQtdeFilmes() {
  return colecao.length;
}

export default {
  adicionarFilme,
  removerFilme,
  getId,
  getFilmes,
  getQtdeFilmes,
};
