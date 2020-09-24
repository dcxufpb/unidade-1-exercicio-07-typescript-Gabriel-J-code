function dados_loja_param(nome_loja: string,
  logradouro: string,
  numero: number,
  complemento: string,
  bairro: string,
  municipio: string,
  estado: string,
  cep: string,
  telefone: string,
  observacao: string,
  cnpj: string,
  inscricao_estadual: string) {

  if (nome_loja == "") {
    throw new Error(`O campo nome da loja é obrigatório`);
  }
	if (!logradouro){
		throw new Error(`O campo logradouro do endereço é obrigatório`)
	}		
	if (!municipio){
		throw new Error(`O campo município do endereço é obrigatório`)
	}
	if (!estado){
		throw new Error(`O campo estado do endereço é obrigatório`)
	} 
	if (!cnpj){
		throw new Error(`O campo CNPJ da loja é obrigatório`)
	} 
	if (!inscricao_estadual){
		throw new Error(`O campo inscrição estadual da loja é obrigatório`)
	}
	var _numero = (!numero)? "s/n" : String(numero)
	
	var _complemento = (complemento)? " " + complemento : ""	

	var _bairro = (bairro)? bairro + " - " : ""

	var _cep = (cep)? "CEP:" + cep : ""
	
	var _telefone = (telefone)? "Tel " + telefone : ""
	
	_telefone = ( cep && telefone)? " " + _telefone : _telefone

	var _observacao = (observacao)? observacao : ""

	var nota = `${nome_loja}\n`
	nota += `${logradouro}, ${_numero}${_complemento}\n`
	nota += `${_bairro}${municipio} - ${estado}\n`
	nota += `${_cep}${_telefone}\n`
	nota += `${_observacao}\n`
	nota += `CNPJ: ${cnpj}\n`
	nota += `IE: ${inscricao_estadual}\n`

	return nota;
}

module.exports = dados_loja_param;
