import servicoFilmes from "./filmes.servico";
import repositorio from "../repositorio/filmes.repositorio";

jest.mock("../repositorio/filmes.repositorio", () => ({
  adicionarFilme: jest.fn(),
  removerFilme: jest.fn(),
  getId: jest.fn().mockReturnValue(1),
  getQtdeFilmes: jest.fn().mockReturnValue([].length),
  getFilmes: jest.fn().mockReturnValue([]),
}));

describe("Gerenciamento de filmes", () => {
  beforeEach(() => {});

  test("Deve inserir um filme", () => {
    servicoFilmes.adicionarFilme({ nome: "Miranha 3", ano: 2021 });

    repositorio.getQtdeFilmes.mockReturnValue(1);

    const qtdeFilmes = servicoFilmes.getQtdeFilmes();
    expect(qtdeFilmes).toBe(1);
  });

  test("Deve inserir vários filmes", () => {
    const filme1 = {
      nome: "A Fuga das Galinhas",
      ano: 2000,
    };
    const filme2 = {
      nome: "As vantagens de ser invisível",
      ano: 2012,
    };
    servicoFilmes.adicionarFilme(filme1);
    servicoFilmes.adicionarFilme(filme2);

    repositorio.getQtdeFilmes.mockReturnValue(2);

    const qtdeFilmes = servicoFilmes.getQtdeFilmes();
    expect(qtdeFilmes).toBe(2);
  });

  test("Não deve permitir filmes futuros", () => {
    const filme = {
      nome: "Doutor Estranho no Multiverso da Loucura",
      ano: 2022,
    };
    expect(() => {
      servicoFilmes.adicionarFilme(filme);
    }).toThrow(Error);
  });

  test("Deve remover um filme", () => {
    const filme = {
      nome: "Matrix",
      ano: 1999,
    };

    servicoFilmes.adicionarFilme(filme);
    repositorio.getQtdeFilmes.mockReturnValue(1);

    let qtdeFilmes = servicoFilmes.getQtdeFilmes();
    expect(qtdeFilmes).toBe(1);

    servicoFilmes.removerFilme(filme);
    repositorio.getQtdeFilmes.mockReturnValue(0);

    qtdeFilmes = servicoFilmes.getQtdeFilmes();
    expect(qtdeFilmes).toBe(0);
  });

  test("Deve remover vários filmes", () => {
    const filme1 = {
      nome: "A Fuga das Galinhas",
      ano: 2000,
    };
    const filme2 = {
      nome: "As vantagens de ser invisível",
      ano: 2012,
    };
    servicoFilmes.adicionarFilme(filme1);
    servicoFilmes.adicionarFilme(filme2);

    repositorio.getQtdeFilmes.mockReturnValue(2);

    let qtdeFilmes = servicoFilmes.getQtdeFilmes();
    expect(qtdeFilmes).toBe(2);

    servicoFilmes.removerFilme(filme1);
    servicoFilmes.removerFilme(filme2);

    repositorio.getQtdeFilmes.mockReturnValue(0);

    qtdeFilmes = servicoFilmes.getQtdeFilmes();
    expect(qtdeFilmes).toBe(0);
  });

  test("Não deve permitir dois filmes iguais", () => {
    const filme1 = {
      nome: "A Fuga das Galinhas",
      ano: 2000,
    };

    repositorio.getFilmes.mockReturnValue([filme1]);

    expect(() => {
      servicoFilmes.adicionarFilme(filme1);
    }).toThrow(Error);
  });
});
