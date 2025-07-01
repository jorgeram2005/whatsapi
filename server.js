const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let clientReady = false;
let qrString = '';

// Configurar cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './whatsapp-session'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
        ]
    }
});

// Eventos del cliente
client.on('qr', (qr) => {
    console.log('=== CÓDIGO QR GENERADO ===');
    qrcode.generate(qr, { small: true });
    qrString = qr;
    console.log('QR String:', qr);
    console.log('=========================');
});

client.on('ready', () => {
    console.log('✅ Cliente WhatsApp listo!');
    clientReady = true;
    qrString = '';
});

client.on('authenticated', () => {
    console.log('🔐 WhatsApp autenticado exitosamente');
});

client.on('auth_failure', (msg) => {
    console.error('❌ Fallo de autenticación:', msg);
});

client.on('disconnected', (reason) => {
    console.log('🔌 Cliente desconectado:', reason);
    clientReady = false;
});

client.on('message', async (message) => {
    console.log(`📨 Mensaje de ${message.from}: ${message.body}`);
    
    // Evitar loops infinitos con mensajes propios
    if (message.fromMe) return;
    
    // Webhook para n8n
    const webhookData = {
        from: message.from,
        body: message.body,
        timestamp: message.timestamp,
        isGroup: message.from.includes('@g.us'),
        contactName: message._data.notifyName || 'Desconocido'
    };
    
    // Enviar a n8n webhook (ajustar URL según tu configuración)
    try {
        const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'http://n8n:5678/webhook/whatsapp';
        await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(webhookData)
        });
        console.log('📤 Datos enviados a n8n');
    } catch (error) {
        console.error('❌ Error enviando a webhook:', error.message);
    }
});

// API endpoints
app.get('/', (req, res) => {
    res.json({ 
        status: 'WhatsApp API Running',
        ready: clientReady,
        timestamp: new Date().toISOString()
    });
});

app.get('/status', (req, res) => {
    res.json({ 
        ready: clientReady,
        hasQR: qrString !== '',
        timestamp: new Date().toISOString()
    });
});

app.get('/qr', (req, res) => {
    if (qrString) {
        res.json({ qr: qrString });
    } else if (clientReady) {
        res.json({ message: 'Cliente ya está conectado' });
    } else {
        res.json({ message: 'QR no disponible aún' });
    }
});

app.post('/send-message', async (req, res) => {
    if (!clientReady) {
        return res.status(503).json({ error: 'Cliente no está listo' });
    }
    
    try {
        const { to, message } = req.body;
        
        if (!to || !message) {
            return res.status(400).json({ error: 'Parámetros "to" y "message" son requeridos' });
        }
        
        await client.sendMessage(to, message);
        console.log(`📤 Mensaje enviado a ${to}: ${message}`);
        res.json({ success: true, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('❌ Error enviando mensaje:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/restart', async (req, res) => {
    try {
        console.log('🔄 Reiniciando cliente WhatsApp...');
        await client.destroy();
        setTimeout(() => {
            client.initialize();
        }, 2000);
        res.json({ success: true, message: 'Cliente reiniciado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Inicializar cliente
console.log('🚀 Inicializando cliente WhatsApp...');
client.initialize();

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌐 Servidor WhatsApp API ejecutándose en puerto ${PORT}`);
});

// Manejo de señales para cierre limpio
process.on('SIGINT', async () => {
    console.log('🛑 Cerrando aplicación...');
    await client.destroy();
    process.exit(0);
});
