// Esta função será chamada com os dados da API
function handleResponse(data) {
    console.log(data);

    // Estruture os dados recebidos em um formato mais legível ou conforme necessário
    const dadosFormatados = {
        'CNPJ': data.cnpj,
        'Nome': data.nome,
        // Verifique se 'atividade_principal' existe para evitar erros
        'Atividade Principal': data.atividade_principal ? data.atividade_principal.map(ap => ap.text).join(', ') : '',
        'Data de abertura': data.abertura,

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
        elemento.textContent = `${chave}: ${valor}`;
        container.appendChild(elemento);
    }
}

document.getElementById('SubmitButtonSearch').addEventListener('click', function () {
    alert("Botão foi clicado!");

    const cnpj = document.getElementById('cnpjInput').value;
    const script = document.createElement('script');
    script.src = `https://receitaws.com.br/v1/cnpj/${cnpj}?callback=handleResponse`;
    document.body.appendChild(script);
});