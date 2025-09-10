const express = require('express');
const cors = require('cors');
const path = require('path');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração do Mercado Pago
// IMPORTANTE: Substitua pela sua chave de acesso
const client = new MercadoPagoConfig({
    accessToken: 'YOUR_ACCESS_TOKEN', // Substitua pela sua chave de acesso do Mercado Pago
    options: {
        timeout: 5000,
        idempotencyKey: 'abc'
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Servir arquivos estáticos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Criar preferência de pagamento
app.post('/create-preference', async (req, res) => {
    try {
        const { title, price, quantity = 1 } = req.body;

        const preference = new Preference(client);

        const preferenceData = {
            items: [
                {
                    title: title,
                    quantity: quantity,
                    unit_price: price,
                    currency_id: 'BRL'
                }
            ],
            back_urls: {
                success: `${req.protocol}://${req.get('host')}/success`,
                failure: `${req.protocol}://${req.get('host')}/failure`,
                pending: `${req.protocol}://${req.get('host')}/pending`
            },
            auto_return: 'approved',
            payment_methods: {
                excluded_payment_methods: [],
                excluded_payment_types: [],
                installments: 12
            },
            notification_url: `${req.protocol}://${req.get('host')}/webhook`,
            external_reference: `midnight-${Date.now()}`,
            expires: false,
            expiration_date_from: null,
            expiration_date_to: null
        };

        const result = await preference.create({ body: preferenceData });
        
        res.json({
            id: result.id,
            init_point: result.init_point,
            sandbox_init_point: result.sandbox_init_point
        });

    } catch (error) {
        console.error('Erro ao criar preferência:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor',
            details: error.message 
        });
    }
});

// Webhook para notificações do Mercado Pago
app.post('/webhook', (req, res) => {
    const { type, data } = req.body;
    
    console.log('Webhook recebido:', { type, data });
    
    if (type === 'payment') {
        // Processar notificação de pagamento
        console.log('Pagamento recebido:', data.id);
        
        // Aqui você pode:
        // 1. Verificar o status do pagamento
        // 2. Atualizar o banco de dados
        // 3. Enviar email de confirmação
        // 4. Ativar a licença do produto
        
        // Exemplo de processamento:
        processPayment(data.id);
    }
    
    res.status(200).send('OK');
});

// Função para processar pagamento
async function processPayment(paymentId) {
    try {
        // Aqui você implementaria a lógica para:
        // 1. Consultar detalhes do pagamento no Mercado Pago
        // 2. Validar o pagamento
        // 3. Ativar a licença do produto
        // 4. Enviar email de confirmação
        
        console.log(`Processando pagamento: ${paymentId}`);
        
        // Exemplo de log
        console.log('✅ Pagamento processado com sucesso');
        
    } catch (error) {
        console.error('Erro ao processar pagamento:', error);
    }
}

// Páginas de retorno
app.get('/success', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pagamento Aprovado - Midnight Spoofer</title>
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    background: #000000;
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                .container {
                    max-width: 500px;
                    padding: 2rem;
                    background: #111111;
                    border-radius: 12px;
                    border: 1px solid #333333;
                }
                .success-icon {
                    font-size: 4rem;
                    color: #00ff00;
                    margin-bottom: 1rem;
                }
                h1 {
                    color: #00ff00;
                    margin-bottom: 1rem;
                }
                .btn {
                    display: inline-block;
                    padding: 15px 30px;
                    background: #ffffff;
                    color: #000000;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 600;
                    margin-top: 1rem;
                    transition: all 0.3s ease;
                }
                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="success-icon">✅</div>
                <h1>Pagamento Aprovado!</h1>
                <p>Seu pagamento foi processado com sucesso. Você receberá as instruções de download por email em breve.</p>
                <p><strong>Obrigado por escolher o Midnight Spoofer!</strong></p>
                <a href="/" class="btn">Voltar ao Site</a>
            </div>
        </body>
        </html>
    `);
});

app.get('/failure', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pagamento Rejeitado - Midnight Spoofer</title>
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    background: #000000;
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                .container {
                    max-width: 500px;
                    padding: 2rem;
                    background: #111111;
                    border-radius: 12px;
                    border: 1px solid #333333;
                }
                .error-icon {
                    font-size: 4rem;
                    color: #ff0000;
                    margin-bottom: 1rem;
                }
                h1 {
                    color: #ff0000;
                    margin-bottom: 1rem;
                }
                .btn {
                    display: inline-block;
                    padding: 15px 30px;
                    background: #ffffff;
                    color: #000000;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 600;
                    margin-top: 1rem;
                    transition: all 0.3s ease;
                }
                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="error-icon">❌</div>
                <h1>Pagamento Rejeitado</h1>
                <p>Houve um problema com seu pagamento. Por favor, verifique seus dados e tente novamente.</p>
                <p>Se o problema persistir, entre em contato conosco.</p>
                <a href="/" class="btn">Tentar Novamente</a>
            </div>
        </body>
        </html>
    `);
});

app.get('/pending', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pagamento Pendente - Midnight Spoofer</title>
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    background: #000000;
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                .container {
                    max-width: 500px;
                    padding: 2rem;
                    background: #111111;
                    border-radius: 12px;
                    border: 1px solid #333333;
                }
                .pending-icon {
                    font-size: 4rem;
                    color: #ffbd2e;
                    margin-bottom: 1rem;
                }
                h1 {
                    color: #ffbd2e;
                    margin-bottom: 1rem;
                }
                .btn {
                    display: inline-block;
                    padding: 15px 30px;
                    background: #ffffff;
                    color: #000000;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 600;
                    margin-top: 1rem;
                    transition: all 0.3s ease;
                }
                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="pending-icon">⏳</div>
                <h1>Pagamento Pendente</h1>
                <p>Seu pagamento está sendo processado. Você receberá uma confirmação em breve.</p>
                <p>Acompanhe o status do seu pagamento por email.</p>
                <a href="/" class="btn">Voltar ao Site</a>
            </div>
        </body>
        </html>
    `);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🌙 Midnight Spoofer Server rodando na porta ${PORT}`);
    console.log(`📱 Acesse: http://localhost:${PORT}`);
    console.log('');
    console.log('⚠️  IMPORTANTE: Configure suas chaves do Mercado Pago antes de usar!');
    console.log('📖 Veja o arquivo SETUP.md para instruções detalhadas');
});

module.exports = app;

