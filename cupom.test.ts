const cupom_dados_loja_param = require('./cupom');

function verificaCampoObrigatorio(mensagemEsperada: string, nome_loja: string,
  logradouro: string, numero: number, complemento: string, bairro: string,
  municipio: string, estado: string, cep: string, telefone: string,
  observacao: string, cnpj: string, inscricao_estadual: string) {
  try {
    cupom_dados_loja_param(mensagemEsperada, logradouro, numero, complemento,
      bairro, municipio, estado, cep, telefone, observacao, cnpj,
      inscricao_estadual);
  } catch (e) {
    expect(e.message).toBe(mensagemEsperada);
  }
}

// Todas as variáveis preenchidas
const NOME_LOJA = "Loja 1"
const LOGRADOURO = "Log 1"
const NUMERO = 10
const COMPLEMENTO = "C1"
const BAIRRO = "Bai 1"
const MUNICIPIO = "Mun 1"
const ESTADO = "E1"
const CEP = "11111-111"
const TELEFONE = "(11) 1111-1111"
const OBSERVACAO = "Obs 1"
const CNPJ = "11.111.111/1111-11"
const INSCRICAO_ESTADUAL = "123456789"

const TEXTO_ESPERADO_LOJA_COMPLETA: string = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_NUMERO: string = `Loja 1
Log 1, s/n C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_COMPLEMENTO: string = `Loja 1
Log 1, 10
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_BAIRRO: string = `Loja 1
Log 1, 10 C1
Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_CEP: string = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_TELEFONE: string = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
`;

const TEXTO_ESPERADO_SEM_OBSERVACAO: string = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111

CNPJ: 11.111.111/1111-11
IE: 123456789
`;

test('Loja Completa', () => {
  expect(cupom_dados_loja_param(NOME_LOJA, LOGRADOURO, NUMERO, COMPLEMENTO,
    BAIRRO, MUNICIPIO, ESTADO, CEP, TELEFONE, OBSERVACAO, CNPJ, 
    INSCRICAO_ESTADUAL)).toBe(TEXTO_ESPERADO_LOJA_COMPLETA);
});

test('Nome vazio', () => {
  verificaCampoObrigatorio(`O campo nome da loja é obrigatório`, "", 
    LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP, TELEFONE,
    OBSERVACAO, CNPJ, INSCRICAO_ESTADUAL);
});

test('Logradouro vazio', () => {
  verificaCampoObrigatorio(`O campo logradouro do endereço é obrigatório`, 
    NOME_LOJA, "", NUMERO, COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP,
    TELEFONE, OBSERVACAO, CNPJ, INSCRICAO_ESTADUAL);
});

test('Número zero', () => {
  expect(cupom_dados_loja_param(NOME_LOJA, LOGRADOURO, 0, COMPLEMENTO, BAIRRO,
    MUNICIPIO, ESTADO, CEP, TELEFONE, OBSERVACAO, CNPJ, INSCRICAO_ESTADUAL))
    .toBe(TEXTO_ESPERADO_SEM_NUMERO, );
});

test('Complemento vazio', () => {
  expect(cupom_dados_loja_param(NOME_LOJA, LOGRADOURO, NUMERO, "", BAIRRO,
    MUNICIPIO, ESTADO, CEP, TELEFONE, OBSERVACAO, CNPJ, INSCRICAO_ESTADUAL))
    .toBe(TEXTO_ESPERADO_SEM_COMPLEMENTO);
});

test('Bairro vazio', () => {
  expect(cupom_dados_loja_param(NOME_LOJA, LOGRADOURO, NUMERO, COMPLEMENTO, "",
    MUNICIPIO, ESTADO, CEP, TELEFONE, OBSERVACAO, CNPJ, INSCRICAO_ESTADUAL))
    .toBe(TEXTO_ESPERADO_SEM_BAIRRO);
});

test('Município vazio', () => {
  verificaCampoObrigatorio(`O campo município do endereço é obrigatório`, 
    NOME_LOJA, LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO, "", ESTADO, CEP,
    TELEFONE, OBSERVACAO, CNPJ, INSCRICAO_ESTADUAL);
});

test('Estado vazio', () => {
  verificaCampoObrigatorio(`O campo estado do endereço é obrigatório`,
    NOME_LOJA, LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO,MUNICIPIO, "", CEP,
    TELEFONE, OBSERVACAO, CNPJ, INSCRICAO_ESTADUAL);
});

test('CEP vazio', () => {
  expect(cupom_dados_loja_param(NOME_LOJA, LOGRADOURO, NUMERO, COMPLEMENTO, 
    BAIRRO, MUNICIPIO, ESTADO, "", TELEFONE, OBSERVACAO, CNPJ, 
    INSCRICAO_ESTADUAL)).toBe(TEXTO_ESPERADO_SEM_CEP);
});

test('Telefone vazio', () => {
  expect(cupom_dados_loja_param(NOME_LOJA, LOGRADOURO, NUMERO, COMPLEMENTO, 
    BAIRRO, MUNICIPIO, ESTADO, CEP, "", OBSERVACAO, CNPJ, INSCRICAO_ESTADUAL))
    .toBe(TEXTO_ESPERADO_SEM_TELEFONE);
});

test('Observação vazia', () => {
  expect(cupom_dados_loja_param(NOME_LOJA, LOGRADOURO, NUMERO, COMPLEMENTO, 
    BAIRRO, MUNICIPIO, ESTADO, CEP, TELEFONE, "", CNPJ, INSCRICAO_ESTADUAL))
    .toBe(TEXTO_ESPERADO_SEM_OBSERVACAO);
});

test('CNPJ vazio', () => {
  verificaCampoObrigatorio(`O campo CNPJ da loja é obrigatório`, NOME_LOJA,
    LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP, TELEFONE, 
    OBSERVACAO, "", INSCRICAO_ESTADUAL);
});

test('Inscrição estadual vazia', () => {
  verificaCampoObrigatorio(`O campo inscrição estadual da loja é obrigatório`,
    NOME_LOJA, LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP,
    TELEFONE, OBSERVACAO, CNPJ, "");
});

test('Exercício 2 - customizado', () => {

  // Defina seus próprios valores para as variáveis a seguir
  let nome_loja = "";
  let logradouro = "";
  let numero = 0;
  let complemento = "";
  let bairro = "";
  let municipio = "";
  let estado = "";
  let cep = "";
  let telefone = "";
  let observacao = "";
  let cnpj = "";
  let inscricao_estadual = "";

  //E atualize o texto esperado abaixo
  expect(cupom_dados_loja_param(nome_loja, logradouro, numero, complemento,
    bairro, municipio, estado, cep, telefone, observacao, cnpj, 
    inscricao_estadual)).toBe(
    `
`);
});
