// Mascara para o input de visualização do CNPJ
const inputCNPJView = document.getElementById('cnpjView');
const inputCNPJ = document.getElementById('cnpjInput');

inputCNPJView.addEventListener('input', () => {
    let cnpj = inputCNPJView.value;

    // Remove caracteres que não são números para formar a base do CNPJ não formatado
    const cleanCNPJ = cnpj.replace(/\D/g, '');

    // Atualiza o valor oculto do campo com o CNPJ não formatado
    inputCNPJ.value = cleanCNPJ;

    // Aplica a máscara de CNPJ (XX.XXX.XXX/XXXX-XX) para visualização
    cnpj = cleanCNPJ.replace(/^(\d{2})(\d)/, "$1.$2");
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
    cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");

    // Atualiza o valor do campo de visualização com a máscara
    inputCNPJView.value = cnpj;
});

// Esta função será chamada com os dados da API
function handleResponse(data) {
    console.log(data);

    // Estruture os dados recebidos em um formato mais legível ou conforme necessário
    const dadosFormatados = {
        'CNPJ': data.cnpj,
        'Data de abertura': data.abertura,
        'Situação': data.situacao,
        'Data da Situação': data.data_situacao,
        'Tipo': data.tipo,
        'Nome': data.nome,
        'Fantasia': data.fantasia,
        'Porte': data.porte,
        'Natureza jurídica': data.natureza_juridica,
        'Status': data.status,
        'Atividade Principal': data.atividade_principal ? data.atividade_principal.map(ap => `${ap.text} (${ap.code})`).join(', ') : '',
        'Atividades Secundárias': data.atividades_secundarias ? data.atividades_secundarias.map(as => `${as.text} (${as.code})`).join(', ') : '',
        'Sócios': data.qsa ? data.qsa.map(person => `${person.nome} (${person.qual})`).join(', ') : '',
        'Endereço': `${data.logradouro}, ${data.numero} ${data.complemento ? '- ' + data.complemento : ''} - ${data.bairro}, ${data.municipio} - ${data.uf}, ${data.cep}`,
        'Email': data.email,
        'Telefone': data.telefone,
        'Data da última atualização': data.ultima_atualizacao ? new Date(data.ultima_atualizacao).toLocaleDateString() : '',
        'Capital Social': `R$ ${parseFloat(data.capital_social).toFixed(2)}`,
        // Verificar se há campos adicionais a serem incluídos
        'Situação Especial': data.situacao_especial || 'Não informada',
        'Data da Situação Especial': data.data_situacao_especial || 'Não informada'
        // Adicione mais campos conforme necessário
    };

    // Chama a função para atualizar o HTML com os dados formatados
    renderizarDados(dadosFormatados);
}

// Esta função atualiza o HTML com os dados fornecidos
function renderizarDados(dados) {
    const container = document.getElementById('resultado');
    container.innerHTML = ''; // Limpa o conteúdo anterior

    // Itera sobre cada par chave-valor no objeto de dados e os adiciona ao contêiner
    for (const [chave, valor] of Object.entries(dados)) {
        const elemento = document.createElement('p');
        const chaveNegrito = document.createElement('b');
        chaveNegrito.textContent = `${chave}: `;
       
        elemento.appendChild(chaveNegrito);
     
        elemento.appendChild(document.createTextNode(valor));
      
        container.appendChild(elemento);
    }
}

document.getElementById('SubmitButtonSearch').addEventListener('click', function () {
    // Usa o valor não formatado para a chamada da API
    const cnpj = inputCNPJ.value; 
    const script = document.createElement('script');
    script.src = `https://receitaws.com.br/v1/cnpj/${cnpj}?callback=handleResponse`;
    document.body.appendChild(script);
});