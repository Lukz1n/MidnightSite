# 🌟 Midnight Spoofer Site

Bem-vindo ao **Midnight Spoofer Site**, um projeto de site moderno que integra a **API do Mercado Pago** para processar pagamentos de forma rápida e segura. Desenvolvido usando **HTML, CSS e JavaScript**, este site oferece uma experiência fluida para o usuário final.

---

## 🔹 Tecnologias Utilizadas

- **HTML5** – Estrutura e semântica das páginas
- **CSS3** – Layout responsivo e design estilizado
- **JavaScript** – Funcionalidades interativas
- **Mercado Pago API** – Pagamentos online seguros

---

## 🔹 Funcionalidades

- 💳 Integração completa com a API do Mercado Pago  
- 📲 Formulário de pagamento totalmente funcional  
- 🌐 Layout responsivo e moderno  
- ⚡ Rápido e leve, com otimizações em CSS e JS  
- 🔒 Pagamentos seguros e confiáveis

---

## 🔹 Instalação e Uso

1. Clone o repositório:
```bash
git clone https://github.com/Lukz1n/MidnightSite.git

# 🌙 Midnight Spoofer - Guia de Configuração

Este guia irá te ajudar a configurar e executar o site de vendas do Midnight Spoofer com integração ao Mercado Pago.

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- Conta no Mercado Pago
- Editor de código (VS Code recomendado)

## 🚀 Instalação

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Mercado Pago

#### 2.1. Criar Conta no Mercado Pago
1. Acesse [https://www.mercadopago.com.br/developers](https://www.mercadopago.com.br/developers)
2. Faça login ou crie uma conta
3. Vá para "Suas integrações" > "Criar aplicação"
4. Escolha "Pagamentos online" como solução
5. Preencha os dados da aplicação

#### 2.2. Obter Chaves de API
1. No painel do desenvolvedor, acesse sua aplicação
2. Vá para "Credenciais"
3. Copie as chaves:
   - **Public Key** (começa com `APP_USR`)
   - **Access Token** (começa com `APP_USR`)

#### 2.3. Configurar Variáveis de Ambiente
1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e substitua as chaves:
   ```env
   MERCADOPAGO_ACCESS_TOKEN=SEU_ACCESS_TOKEN_AQUI
   MERCADOPAGO_PUBLIC_KEY=SEU_PUBLIC_KEY_AQUI
   ```

### 3. Configurar Chaves no Frontend

Edite o arquivo `assets/js/script.js` e substitua:
```javascript
const mp = new MercadoPago('YOUR_PUBLIC_KEY', {
    locale: 'pt-BR'
});
```

Por:
```javascript
const mp = new MercadoPago('SUA_PUBLIC_KEY_AQUI', {
    locale: 'pt-BR'
});
```

### 4. Configurar Chaves no Backend

Edite o arquivo `server.js` e substitua:
```javascript
const client = new MercadoPagoConfig({
    accessToken: 'YOUR_ACCESS_TOKEN',
    // ...
});
```

Por:
```javascript
const client = new MercadoPagoConfig({
    accessToken: 'SEU_ACCESS_TOKEN_AQUI',
    // ...
});
```

## 🏃‍♂️ Executando o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```

### Modo Produção
```bash
npm start
```

O site estará disponível em: `http://localhost:3000`

## 🧪 Testando Pagamentos

### Ambiente de Teste (Sandbox)

O Mercado Pago oferece um ambiente de teste para você testar os pagamentos sem cobranças reais.

#### Cartões de Teste:
- **Visa**: 4013 5406 8274 6260
- **Mastercard**: 5031 7557 3453 0604
- **CVV**: 123
- **Vencimento**: 11/25
- **Nome**: APRO (para aprovado) ou CONT (para rejeitado)

#### CPFs de Teste:
- **Aprovado**: 12345678909
- **Rejeitado**: 12345678901

### Fluxo de Teste:
1. Acesse o site
2. Escolha um plano
3. Clique em "Escolher Plano"
4. Use os dados de teste acima
5. Complete o pagamento
6. Verifique as páginas de retorno

## 🔧 Personalização

### Alterar Preços
Edite o arquivo `assets/js/script.js`:
```javascript
const plans = {
    basic: {
        name: 'Plano Básico',
        price: 49.00, // Altere aqui
        description: 'Proteção básica para 1 dispositivo'
    },
    // ...
};
```

### Alterar Cores
Edite o arquivo `assets/css/style.css` e modifique as variáveis de cor.

### Alterar Textos
Edite o arquivo `index.html` para alterar textos, títulos e descrições.

## 📧 Configuração de Email (Opcional)

Para enviar emails de confirmação, você pode integrar um serviço como:
- Nodemailer + Gmail
- SendGrid
- Mailgun

Exemplo com Nodemailer:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

## 🌐 Deploy em Produção

### Opções de Deploy:
1. **Heroku** (gratuito com limitações)
2. **Vercel** (para frontend + serverless)
3. **DigitalOcean** (VPS)
4. **AWS** (EC2 ou Lambda)

### Configurações Importantes:
1. Configure as URLs de retorno no Mercado Pago
2. Use HTTPS em produção
3. Configure variáveis de ambiente no servidor
4. Configure webhook para notificações

## 🔒 Segurança

### Boas Práticas:
1. **Nunca** exponha suas chaves privadas no frontend
2. Use HTTPS em produção
3. Valide todos os dados no backend
4. Configure CORS adequadamente
5. Use rate limiting para APIs

## 📱 Webhook do Mercado Pago

O webhook está configurado em `/webhook` e processa:
- Notificações de pagamento
- Atualizações de status
- Estornos e cancelamentos

Para configurar no Mercado Pago:
1. Acesse sua aplicação no painel
2. Vá para "Webhooks"
3. Adicione a URL: `https://seudominio.com/webhook`

## 🐛 Solução de Problemas

### Erro: "Public key inválida"
- Verifique se copiou a chave correta
- Certifique-se de usar a chave do ambiente correto (teste/produção)

### Erro: "Access token inválido"
- Verifique se o access token está correto
- Certifique-se de que a aplicação está ativa

### Pagamentos não funcionam
- Verifique se está usando dados de teste válidos
- Confirme se as URLs de retorno estão corretas
- Verifique os logs do servidor

### Site não carrega
- Verifique se todas as dependências foram instaladas
- Confirme se a porta 3000 está disponível
- Verifique os logs de erro no console

## 📞 Suporte

- **Documentação Mercado Pago**: [https://www.mercadopago.com.br/developers](https://www.mercadopago.com.br/developers)
- **Comunidade**: [https://www.mercadopago.com.br/developers/community](https://www.mercadopago.com.br/developers/community)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**🌙 Midnight Spoofer Team**

