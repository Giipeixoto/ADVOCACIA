document.addEventListener("DOMContentLoaded", function () {
    // Acessar o canvas para o gráfico de progresso dos casos
    const caseProgressCanvas = document.getElementById('case-progress-chart');
    if (caseProgressCanvas) {
        const ctx = caseProgressCanvas.getContext('2d');
        const caseProgressChart = new Chart(ctx, {
            type: 'bar', // ou 'line', 'pie', etc.
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
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        console.error("Elemento canvas para casos ativos não encontrado.");
    }

    // Acessar o canvas para o gráfico de mensagens pendentes
    const pendingMessagesCanvas = document.getElementById('pending-messages-chart');
    if (pendingMessagesCanvas) {
        const ctxPending = pendingMessagesCanvas.getContext('2d');
        const pendingMessagesChart = new Chart(ctxPending, {
            type: 'line', // ou 'bar', 'pie', etc.
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
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        console.error("Elemento canvas para mensagens pendentes não encontrado.");
    }
});
