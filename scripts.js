// Função principal que será executada quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
    configurarGraficoCasos();
    configurarGraficoMensagensPendentes();
    configurarMascarasCPFouCNPJ();
    configurarFormularioLogin();
    configurarModais();
});

// Função para configurar o gráfico de progresso dos casos
function configurarGraficoCasos() {
    const caseProgressCanvas = document.getElementById('case-progress-chart');
    if (caseProgressCanvas) {
        const ctx = caseProgressCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Casos Ativos', 'Casos Encerrados'],
                datasets: [{
                    label: 'Progresso dos Casos',
                    data: [12, 19],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    } else {
        console.error("Elemento canvas para casos ativos não encontrado.");
    }
}

// Função para configurar o gráfico de mensagens pendentes
function configurarGraficoMensagensPendentes() {
    const pendingMessagesCanvas = document.getElementById('pending-messages-chart');
    if (pendingMessagesCanvas) {
        const ctxPending = pendingMessagesCanvas.getContext('2d');
        new Chart(ctxPending, {
            type: 'line',
            data: {
                labels: ['Novas Mensagens', 'Mensagens Lidas'],
                datasets: [{
                    label: 'Mensagens Pendentes',
                    data: [5, 10],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    } else {
        console.error("Elemento canvas para mensagens pendentes não encontrado.");
    }
}

// Função para configurar a máscara de CPF/CNPJ
function configurarMascarasCPFouCNPJ() {
    document.getElementById('cpf').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove não numéricos
        value = aplicarMascaraCPFouCNPJ(value);
        e.target.value = value;
    });
}

// Função para aplicar a máscara de CPF ou CNPJ
function aplicarMascaraCPFouCNPJ(value) {
    if (value.length <= 11) { // CPF
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else { // CNPJ
        value = value.replace(/(\d{2})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1/$2');
        value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
    return value;
}

// Função para configurar o formulário de login
function configurarFormularioLogin() {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Previne o envio do formulário

        const identifier = document.getElementById('identifier').value;
        const password = document.getElementById('password').value;

        if (!validarFormularioLogin(identifier, password)) {
            return; // Se a validação falhar, sai da função
        }

        this.submit(); // Envia o formulário se tudo estiver correto
    });
}

// Função para validar os campos do formulário de login
function validarFormularioLogin(identifier, password) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Padrão para email
    const cpfPattern = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/; // Padrão para CPF
    const cnpjPattern = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/; // Padrão para CNPJ

    if (!identifier || !password) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    // Verifica se o identificador é um email ou um CPF/CNPJ válido
    if (!emailPattern.test(identifier) && !cpfPattern.test(identifier) && !cnpjPattern.test(identifier)) {
        alert('Por favor, insira um email ou CPF/CNPJ válido.');
        return false;
    }

    return true; // Se tudo estiver correto
}
// Funções para exibir detalhes do caso em um modal
function mostrarDetalhesCaso(cliente, tipoCaso, status) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h5>Detalhes do Caso</h5>
        <p><strong>Cliente:</strong> ${escapeHTML(cliente)}</p>
        <p><strong>Tipo de Caso:</strong> ${escapeHTML(tipoCaso)}</p>
        <p><strong>Status:</strong> ${escapeHTML(status)}</p>
    `;
    $('#detalhesModal').modal('show');
}

// Função para escapar HTML (para prevenir XSS)
function escapeHTML(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

// Exemplo de JavaScript para injetar dados no modal de detalhes do caso
document.querySelectorAll('#casosCliente .btn-info').forEach(button => {
    button.addEventListener('click', () => {
        const cliente = 'Nome do Cliente'; // substituir pelo valor real
        const tipoCaso = 'Tipo de Caso'; // substituir pelo valor real
        const status = 'Status do Caso'; // substituir pelo valor real
        mostrarDetalhesCaso(cliente, tipoCaso, status);
    });
});

// Função para mostrar detalhes do caso
function mostrarDetalhesCaso(cliente, tipoCaso, status) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h5>Detalhes do Caso</h5>
        <p><strong>Cliente:</strong> ${cliente}</p>
        <p><strong>Tipo de Caso:</strong> ${tipoCaso}</p>
        <p><strong>Status:</strong> ${status}</p>
    `;
    $('#detalhesModal').modal('show');
}



// Função para responder a mensagens
function responderMensagem(cliente, mensagem) {
    const modalBody = document.getElementById('modalBodyResposta');
    modalBody.innerHTML = `
        <h5>Responder a ${escapeHTML(cliente)}</h5>
        <p><strong>Mensagem:</strong> ${escapeHTML(mensagem)}</p>
        <textarea id="resposta" class="form-control" rows="3" placeholder="Escreva sua resposta..."></textarea>
    `;
    $('#responderModal').modal('show');

    // Adicionando evento para o botão de envio de resposta
    document.getElementById('enviarResposta').onclick = function () {
        const resposta = document.getElementById('resposta').value;
        // Aqui você pode implementar a lógica para enviar a resposta ao servidor
        alert(`Resposta enviada para ${cliente}: ${resposta}`);
        $('#responderModal').modal('hide');
    };
}

// Função para escapar a entrada do usuário
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (match) {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };
        return escapeMap[match];
    });
}

// Função para configurar os modais
function configurarModais() {
    // Adicionando eventos aos botões de ação
    const detalhesBotao = document.querySelectorAll('.btn-info');
    detalhesBotao.forEach(botao => {
        botao.addEventListener('click', function () {
            const listItem = this.parentElement;
            const cliente = listItem.querySelector('strong').textContent.split(': ')[1];
            const tipoCaso = listItem.querySelector('strong:nth-of-type(2)').textContent.split(': ')[1];
            const status = listItem.querySelector('strong:nth-of-type(3)').textContent.split(': ')[1];
            mostrarDetalhesCaso(cliente, tipoCaso, status);
        });
    });

    const responderBotao = document.querySelectorAll('.btn-warning');
    responderBotao.forEach(botao => {
        botao.addEventListener('click', function () {
            const listItem = this.parentElement;
            const cliente = listItem.querySelector('strong').textContent.split(': ')[1];
            const mensagem = listItem.querySelector('strong:nth-of-type(2)').textContent.split(': ')[1];
            responderMensagem(cliente, mensagem);
        });
    });
}
// Aguarde o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Dados para o gráfico de casos
    const ctxCasos = document.getElementById('graficoCasos').getContext('2d');
    const graficoCasos = new Chart(ctxCasos, {
        type: 'bar', // Tipo de gráfico: barra
        data: {
            labels: ['Aguardando', 'Em andamento', 'Concluído'], // Rótulos do eixo x
            datasets: [{
                label: 'Status dos Casos',
                data: [3, 5, 2], // Dados do gráfico
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

     // Dados para o gráfico de mensagens
     const ctxMensagens = document.getElementById('graficoMensagens').getContext('2d');
     const graficoMensagens = new Chart(ctxMensagens, {
         type: 'pie', // Tipo de gráfico: pizza
         data: {
             labels: ['Mensagens Respondidas', 'Mensagens Pendentes'], // Rótulos do gráfico
             datasets: [{
                 label: 'Mensagens',
                 data: [8, 2], // Dados do gráfico
                 backgroundColor: [
                     'rgba(153, 102, 255, 0.2)',
                     'rgba(255, 99, 132, 0.2)',
                 ],
                 borderColor: [
                     'rgba(153, 102, 255, 1)',
                     'rgba(255, 99, 132, 1)',
                 ],
                 borderWidth: 1
             }]
         },
         options: {
             responsive: true,
             plugins: {
                 legend: {
                     position: 'top',
                 },
                 title: {
                     display: true,
                     text: 'Mensagens Pendentes e Respondidas'
                 }
             }
         }
     });
    });

    // scripts.js

// Função para abrir o modal de detalhes do caso
$(document).ready(function() {
    $('#casosAdvogado .btn-info').click(function() {
        const casoIndex = $(this).closest('li').index();
        const casos = [
            {
                cliente: "João Silva",
                tipo: "Direito Civil",
                status: "Em andamento",
                detalhes: "Detalhes adicionais do caso de João Silva."
            },
            {
                cliente: "Maria Oliveira",
                tipo: "Direito Penal",
                status: "Finalizado",
                detalhes: "Detalhes adicionais do caso de Maria Oliveira."
            },
            {
                cliente: "Ana Costa",
                tipo: "Direito da Família",
                status: "Em andamento",
                detalhes: "Detalhes adicionais do caso de Ana Costa."
            }
        ];

        $('#modalBody').html(casos[casoIndex].detalhes);
        $('#detalhesModal').modal('show');
    });
});

// Função para abrir o modal de responder mensagem
$('#mensagensPendentes .btn-warning').click(function() {
    const mensagemIndex = $(this).closest('li').index();
    const mensagens = [
        {
            de: "Cliente - João Silva",
            texto: "Quais são os próximos passos do meu caso?",
        },
        {
            de: "Cliente - Ana Costa",
            texto: "Preciso de uma atualização sobre o processo.",
        }
    ];

    $('#modalBodyResposta').html(`De: ${mensagens[mensagemIndex].de}<br>Mensagem: ${mensagens[mensagemIndex].texto}`);
    $('#responderModal').modal('show');
});
