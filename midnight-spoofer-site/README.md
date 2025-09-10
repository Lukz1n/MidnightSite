# 🌙 Midnight Spoofer - Site de Vendas

Um site de vendas elegante e moderno para o produto "Midnight Spoofer" com integração completa ao Mercado Pago.

## ✨ Características

### Design
- **Tema**: Preto e branco elegante
- **Estilo**: Moderno, minimalista e profissional
- **Animações**: Suaves e sofisticadas
- **Responsivo**: Funciona em desktop e mobile

### Funcionalidades
- 🎯 Landing page atrativa com hero section
- 💳 Integração completa com Mercado Pago
- 📱 Design responsivo
- ⚡ Animações fluidas e efeitos visuais
- 🛡️ Modal de pagamento seguro
- 📊 Três planos de preços
- 📞 Seção de contato
- 🔄 Loading screen animado

### Seções do Site
1. **Hero Section**: Apresentação principal com terminal animado
2. **Recursos**: Cards com funcionalidades do produto
3. **Preços**: Três planos (Básico, Premium, Enterprise)
4. **Contato**: Informações de suporte
5. **Footer**: Links e copyright

## 🚀 Como Usar

### 1. Configuração Inicial
```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

### 2. Configurar Mercado Pago
1. Acesse [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
2. Crie uma aplicação
3. Copie suas chaves (Public Key e Access Token)
4. Configure no arquivo `.env` e nos arquivos JavaScript

### 3. Executar o Site
```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

O site estará disponível em: `http://localhost:3001`

## 📁 Estrutura do Projeto

```
midnight-spoofer-site/
├── index.html              # Página principal
├── server.js               # Servidor backend
├── package.json            # Dependências
├── .env.example           # Exemplo de variáveis
├── SETUP.md               # Guia de configuração
├── README.md              # Este arquivo
└── assets/
    ├── css/
    │   └── style.css      # Estilos principais
    ├── js/
    │   └── script.js      # JavaScript principal
    └── images/            # Imagens (vazio)
```

## 🎨 Personalização

### Alterar Cores
Edite as variáveis CSS no arquivo `assets/css/style.css`:
```css
/* Cores principais */
background-color: #000000; /* Preto */
color: #ffffff;            /* Branco */
border-color: #333333;     /* Cinza escuro */
```

### Alterar Preços
Edite o objeto `plans` no arquivo `assets/js/script.js`:
```javascript
const plans = {
    basic: {
        name: 'Plano Básico',
        price: 49.00,  // Altere aqui
        description: 'Proteção básica para 1 dispositivo'
    },
    // ...
};
```

### Alterar Textos
Edite diretamente no arquivo `index.html` para alterar:
- Títulos e descrições
- Nomes dos planos
- Informações de contato
- Recursos do produto

## 💳 Integração Mercado Pago

### Recursos Implementados
- ✅ Checkout Pro integrado
- ✅ Modal de pagamento personalizado
- ✅ Páginas de retorno (sucesso, erro, pendente)
- ✅ Webhook para notificações
- ✅ Suporte a múltiplos planos
- ✅ Ambiente de teste configurado

### Fluxo de Pagamento
1. Usuário escolhe um plano
2. Modal de pagamento abre
3. Sistema cria preferência no Mercado Pago
4. Usuário é redirecionado para checkout
5. Após pagamento, retorna para página de status
6. Webhook processa notificações

## 🔧 Tecnologias Utilizadas

### Frontend
- HTML5 semântico
- CSS3 com animações avançadas
- JavaScript ES6+ vanilla
- Design responsivo
- Fontes Google (Inter)

### Backend
- Node.js
- Express.js
- Mercado Pago SDK
- CORS habilitado

### Dependências
- `express`: Servidor web
- `cors`: Cross-origin requests
- `mercadopago`: SDK oficial
- `dotenv`: Variáveis de ambiente

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (até 767px)

### Breakpoints
- Mobile: `max-width: 768px`
- Tablet: `768px - 1199px`
- Desktop: `1200px+`

## 🎯 Recursos Avançados

### Animações
- Loading screen com barra de progresso
- Efeitos de hover nos cards
- Transições suaves
- Terminal animado com efeito de digitação
- Parallax sutil
- Animações de entrada (fade in, slide in)

### Interatividade
- Modal de pagamento responsivo
- Navegação suave entre seções
- Efeitos visuais nos botões
- Feedback visual para ações
- Menu mobile funcional

### Performance
- CSS otimizado
- JavaScript modular
- Imagens otimizadas
- Loading assíncrono

## 🔒 Segurança

### Boas Práticas Implementadas
- Chaves privadas apenas no backend
- Validação de dados
- CORS configurado
- HTTPS recomendado para produção
- Sanitização de inputs

## 📊 Métricas e Analytics

Para adicionar analytics, você pode integrar:
- Google Analytics
- Facebook Pixel
- Hotjar
- Mixpanel

## 🚀 Deploy

### Opções Recomendadas
1. **Heroku**: Deploy fácil e gratuito
2. **Vercel**: Ideal para frontend
3. **DigitalOcean**: VPS completo
4. **AWS**: Escalabilidade máxima

### Checklist de Deploy
- [ ] Configurar variáveis de ambiente
- [ ] Configurar HTTPS
- [ ] Configurar domínio personalizado
- [ ] Testar pagamentos em produção
- [ ] Configurar webhook no Mercado Pago
- [ ] Configurar monitoramento

## 📞 Suporte

Para dúvidas sobre:
- **Mercado Pago**: [Documentação oficial](https://www.mercadopago.com.br/developers)
- **Node.js**: [Documentação Node.js](https://nodejs.org/docs)
- **Express**: [Documentação Express](https://expressjs.com)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**🌙 Desenvolvido para Midnight Spoofer**

*Site elegante, seguro e profissional para vendas online.*

