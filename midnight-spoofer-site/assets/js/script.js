// Configuração do Mercado Pago
const mp = new MercadoPago('YOUR_PUBLIC_KEY', {
    locale: 'pt-BR'
});

// Variáveis globais
let selectedPlan = null;
let selectedPrice = null;

// Planos disponíveis
const plans = {
    basic: {
        name: 'Plano Básico',
        price: 49.00,
        description: 'Proteção básica para 1 dispositivo'
    },
    premium: {
        name: 'Plano Premium',
        price: 99.00,
        description: 'Proteção avançada para 3 dispositivos'
    },
    enterprise: {
        name: 'Plano Enterprise',
        price: 199.00,
        description: 'Proteção máxima para dispositivos ilimitados'
    }
};

// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simular carregamento
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
    
    // Inicializar outras funcionalidades
    initializeNavigation();
    initializeAnimations();
    initializeModal();
    initializePricingButtons();
    initializeScrollEffects();
});

// Navegação
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect na navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.borderBottom = '1px solid #555555';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.borderBottom = '1px solid #333333';
        }
    });
    
    // Menu mobile toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Smooth scroll para links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Fechar menu mobile
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Animações
function initializeAnimations() {
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Animação do terminal
    animateTerminal();
    
    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Animação do terminal
function animateTerminal() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, (index + 1) * 500);
    });
}

// Modal de pagamento
function initializeModal() {
    const modal = document.getElementById('payment-modal');
    const modalClose = document.querySelector('.modal-close');
    
    // Fechar modal
    modalClose.addEventListener('click', closeModal);
    
    // Fechar modal clicando fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function openModal(plan, price) {
    const modal = document.getElementById('payment-modal');
    const selectedPlanElement = document.getElementById('selected-plan');
    const selectedPriceElement = document.getElementById('selected-price');
    const totalPriceElement = document.getElementById('total-price');
    
    selectedPlan = plan;
    selectedPrice = price;
    
    selectedPlanElement.textContent = plans[plan].name;
    selectedPriceElement.textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;
    totalPriceElement.textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Inicializar checkout do Mercado Pago
    initializeMercadoPagoCheckout();
}

function closeModal() {
    const modal = document.getElementById('payment-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Botões de preços
function initializePricingButtons() {
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', () => {
            const plan = button.getAttribute('data-plan');
            const price = plans[plan].price;
            openModal(plan, price);
        });
    });
    
    // Botão "Comprar Agora" do hero
    buyNowBtn.addEventListener('click', () => {
        openModal('premium', plans.premium.price);
    });
}

// Efeitos de scroll
function initializeScrollEffects() {
    // Smooth reveal animations
    const revealElements = document.querySelectorAll('.feature-card, .pricing-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });
    
    // Contador animado para preços
    animateCounters();
}

// Animação de contadores
function animateCounters() {
    const priceElements = document.querySelectorAll('.amount');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateCounter(target, 0, finalValue, 1000);
            }
        });
    }, { threshold: 0.5 });
    
    priceElements.forEach(el => {
        counterObserver.observe(el);
    });
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * easeOutQuart(progress));
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// Integração com Mercado Pago
function initializeMercadoPagoCheckout() {
    // Criar preferência de pagamento
    const preference = {
        items: [
            {
                title: plans[selectedPlan].name,
                description: plans[selectedPlan].description,
                quantity: 1,
                currency_id: 'BRL',
                unit_price: selectedPrice
            }
        ],
        payer: {
            email: 'test@test.com'
        },
        back_urls: {
            success: window.location.origin + '/success',
            failure: window.location.origin + '/failure',
            pending: window.location.origin + '/pending'
        },
        auto_return: 'approved',
        payment_methods: {
            excluded_payment_methods: [],
            excluded_payment_types: [],
            installments: 12
        },
        shipments: {
            cost: 0,
            mode: 'not_specified'
        }
    };
    
    // Criar checkout
    const checkout = mp.checkout({
        preference: preference
    });
    
    // Renderizar checkout
    checkout.render({
        container: '#mercadopago-checkout',
        label: 'Finalizar Compra'
    });
}

// Efeitos visuais adicionais
document.addEventListener('mousemove', (e) => {
    // Efeito de cursor personalizado
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
    
    // Parallax sutil nos cards
    const cards = document.querySelectorAll('.feature-card, .pricing-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        }
    });
});

// Adicionar efeitos de hover nos botões
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efeito de digitação no terminal
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicializar efeitos de partículas (opcional)
function initializeParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Função para criar preferência de pagamento no backend
async function createPaymentPreference(planData) {
    try {
        const response = await fetch('/create-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: planData.name,
                price: planData.price,
                quantity: 1
            })
        });
        
        const preference = await response.json();
        return preference.id;
    } catch (error) {
        console.error('Erro ao criar preferência:', error);
        alert('Erro ao processar pagamento. Tente novamente.');
    }
}

// Validação de formulário (se necessário)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.email || !formData.email.includes('@')) {
        errors.push('Email inválido');
    }
    
    if (!formData.name || formData.name.length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    return errors;
}

// Feedback visual para ações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#00ff00' : '#ff0000'};
        color: #000000;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Inicializar partículas quando a página carregar
// initializeParticles(); // Descomente se quiser o efeito de partículas

// Debug mode (remover em produção)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🌙 Midnight Spoofer - Debug Mode');
    console.log('Planos disponíveis:', plans);
    
    // Adicionar botão de teste
    const debugBtn = document.createElement('button');
    debugBtn.textContent = 'Test Payment';
    debugBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 10px;
        background: #ff0000;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        z-index: 10000;
    `;
    debugBtn.onclick = () => openModal('premium', plans.premium.price);
    document.body.appendChild(debugBtn);
}

