// ========================================
// FUNÇÕES DE UTILIDADE
// ========================================

/**
 * Mostra mensagem de sucesso
 */
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('hidden');
    
    // Esconde a mensagem após 5 segundos
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000);
}

/**
 * Mostra notificação de erro
 */
function showErrorNotification(message) {
    alert('Erro: ' + message);
}

/**
 * Valida se o email é válido
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Limpa o formulário
 */
function clearForm() {
    const form = document.getElementById('denunciaForm');
    form.reset();
}

// ========================================
// MANIPULAÇÃO DO FORMULÁRIO
// ========================================

/**
 * Função principal de envio do formulário
 */
async function handleSubmit(event) {
    event.preventDefault();

    // Obter valores do formulário
    const denunciante = document.getElementById('denunciante').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value.trim();

    // Validação básica
    if (!email || !descricao) {
        showErrorNotification('Por favor, preencha todos os campos obrigatórios (E-mail e Descrição)');
        return;
    }

    if (!isValidEmail(email)) {
        showErrorNotification('Por favor, insira um e-mail válido');
        return;
    }

    // Desabilitar botão de envio
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
        // IMPORTANTE: Substitua 'YOUR_FORM_ID' pelo ID do seu formulário Formspree
        // Para obter o ID:
        // 1. Acesse https://formspree.io/
        // 2. Crie uma nova conta ou faça login
        // 3. Crie um novo formulário
        // 4. Copie o ID do formulário (ex: f/abc123xyz)
        // 5. Substitua 'YOUR_FORM_ID' abaixo pelo ID que você copiou
        
        const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';

        // Preparar dados para envio
        const formData = new FormData();
        formData.append('name', denunciante || 'Anônimo');
        formData.append('email', email);
        formData.append('phone', telefone);
        formData.append('address', endereco);
        formData.append('type', tipo);
        formData.append('message', descricao);
        formData.append('_subject', 'Nova Denúncia - Fale pelos Animais');
        formData.append('_replyto', email);

        // Enviar para Formspree
        const response = await fetch(formspreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Sucesso!
            showSuccessMessage();
            clearForm();
            console.log('Denúncia enviada com sucesso!');
        } else {
            // Erro na resposta
            const data = await response.json();
            showErrorNotification('Erro ao enviar denúncia. Tente novamente. Detalhes: ' + (data.error || 'Erro desconhecido'));
        }
    } catch (error) {
        // Erro de conexão ou outro erro
        console.error('Erro:', error);
        showErrorNotification('Erro ao enviar denúncia. Verifique sua conexão de internet e tente novamente.');
    } finally {
        // Reabilitar botão de envio
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================

/**
 * Função executada quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada com sucesso!');
    
    // Você pode adicionar mais inicializações aqui se necessário
    // Por exemplo: validação em tempo real, etc.
});

// ========================================
// INSTRUÇÕES DE CONFIGURAÇÃO
// ========================================

/*
COMO CONFIGURAR O ENVIO DE E-MAILS:

1. Acesse https://formspree.io/
2. Clique em "Sign Up" para criar uma conta (ou faça login se já tiver)
3. Após criar a conta, clique em "New Form"
4. Preencha os detalhes:
   - Email: falepelosanimais@gmail.com
   - Name: Fale pelos Animais
5. Clique em "Create"
6. Você receberá um ID do formulário (algo como: f/abc123xyz)
7. Copie esse ID
8. Volte a este arquivo (script.js)
9. Procure pela linha: const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
10. Substitua 'YOUR_FORM_ID' pelo ID que você copiou
    Exemplo: const formspreeEndpoint = 'https://formspree.io/f/xyzabc123';
11. Salve o arquivo
12. Pronto! Agora os formulários serão enviados para falepelosanimais@gmail.com

ALTERNATIVA (se preferir usar outro serviço):

Você também pode usar:
- EmailJS (https://www.emailjs.com/)
- Netlify Forms (https://www.netlify.com/products/forms/)
- Basin (https://usebasin.com/)

Cada um tem suas próprias instruções de configuração.
*/
