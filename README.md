# WhatsApp Chatbot 🤖💬

Un chatbot inteligente para WhatsApp que permite automatizar conversaciones y brindar respuestas automáticas a tus contactos.

## 📋 Características

- ✅ Respuestas automáticas personalizables
- ✅ Integración completa con WhatsApp Web
- ✅ Detección de palabras clave
- ✅ Horarios de funcionamiento configurables
- ✅ Lista de contactos permitidos/bloqueados
- ✅ Logs detallados de conversaciones
- ✅ Interfaz web para configuración
- ✅ Respuestas multimedia (imágenes, documentos)

## 🚀 Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Chrome/Chromium instalado
- Cuenta de WhatsApp

### Pasos de instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/whatsapp-chatbot.git
   cd whatsapp-chatbot
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Edita el archivo `.env` con tus configuraciones:
   ```env
   PORT=3000
   CHROME_PATH=/usr/bin/google-chrome
   SESSION_NAME=whatsapp-session
   ```

4. **Inicia el bot**
   ```bash
   npm start
   ```

5. **Escanea el código QR**
   - Abre tu navegador en `http://localhost:3000`
   - Escanea el código QR con tu WhatsApp
   - ¡El bot estará listo para funcionar!

## ⚙️ Configuración

### Archivo de configuración (`config.json`)

```json
{
  "botName": "Mi ChatBot",
  "welcomeMessage": "¡Hola! Soy un bot automático. ¿En qué puedo ayudarte?",
  "workingHours": {
    "enabled": true,
    "start": "09:00",
    "end": "18:00",
    "timezone": "America/Santiago"
  },
  "autoReply": {
    "enabled": true,
    "delay": 2000
  },
  "allowedContacts": [],
  "blockedContacts": [],
  "keywords": {
    "hola": "¡Hola! ¿Cómo estás?",
    "ayuda": "Puedo ayudarte con información sobre nuestros servicios.",
    "horario": "Nuestro horario de atención es de 9:00 a 18:00 hrs."
  }
}
```

### Comandos disponibles

- `!help` - Muestra la lista de comandos
- `!status` - Estado del bot
- `!restart` - Reinicia el bot
- `!stop` - Detiene el bot
- `!stats` - Estadísticas de uso

## 📂 Estructura del proyecto

```
whatsapp-chatbot/
├── src/
│   ├── bot/
│   │   ├── WhatsAppBot.js
│   │   ├── MessageHandler.js
│   │   └── ResponseManager.js
│   ├── web/
│   │   ├── server.js
│   │   └── public/
│   ├── config/
│   │   └── config.js
│   └── utils/
│       ├── logger.js
│       └── helpers.js
├── sessions/
├── logs/
├── config.json
├── .env.example
├── package.json
└── README.md
```

## 🔧 Uso

### Iniciar el bot
```bash
npm start
```

### Modo desarrollo
```bash
npm run dev
```

### Ejecutar tests
```bash
npm test
```

### Generar build
```bash
npm run build
```

## 📊 Características avanzadas

### Respuestas inteligentes
El bot puede detectar el contexto de la conversación y responder de manera apropiada:

```javascript
// Ejemplo de configuración de respuestas
const responses = {
  greetings: ['hola', 'buenos días', 'buenas tardes'],
  farewells: ['adiós', 'hasta luego', 'nos vemos'],
  questions: ['¿cómo?', '¿qué?', '¿cuándo?', '¿dónde?']
};
```

### Integración con APIs externas
```javascript
// Ejemplo de integración con API del clima
app.get('/weather', async (req, res) => {
  const weather = await getWeatherData(req.query.city);
  res.json(weather);
});
```

### Base de datos
El bot puede integrarse con diferentes bases de datos:
- SQLite (por defecto)
- MySQL
- PostgreSQL
- MongoDB

## 🛡️ Seguridad

- Todas las sesiones se almacenan de forma segura
- Encriptación de datos sensibles
- Validación de contactos permitidos
- Rate limiting para evitar spam
- Logs de seguridad detallados

## 📱 Funcionalidades móviles

- Respuestas automáticas 24/7
- Detección de mensajes multimedia
- Reenvío de mensajes importantes
- Notificaciones push configurables

## 🔍 Monitoreo y logs

Los logs se almacenan en la carpeta `logs/` con diferentes niveles:
- `info.log` - Información general
- `error.log` - Errores del sistema
- `chat.log` - Historial de conversaciones

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📋 Roadmap

- [ ] Integración con ChatGPT/AI
- [ ] Soporte para grupos de WhatsApp
- [ ] Dashboard web mejorado
- [ ] Integración con CRM
- [ ] Análisis de sentimientos
- [ ] Respuestas de voz
- [ ] Soporte multi-idioma

## ⚠️ Limitaciones

- Requiere WhatsApp Web activo
- No funciona con cuentas de WhatsApp Business API
- Limitado por las políticas de WhatsApp
- Requiere conexión a internet estable

## 🐛 Problemas conocidos

- **QR Code no aparece**: Verificar que Chrome esté instalado correctamente
- **Bot no responde**: Comprobar conexión a internet y estado de WhatsApp Web
- **Sesión expirada**: Regenerar el código QR desde el panel web

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollador Principal* - [@tu-usuario](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - Librería principal
- [qrcode-terminal](https://github.com/gtanner/qrcode-terminal) - Generación de QR
- [express](https://expressjs.com/) - Framework web

## 📞 Soporte

Si tienes algún problema o pregunta:

- 📧 Email: tu-email@ejemplo.com
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/whatsapp-chatbot/issues)
- 💬 Telegram: [@tu-usuario](https://t.me/tu-usuario)

## ⭐ ¿Te gustó el proyecto?

¡Dale una estrella al repositorio! ⭐

---

**Nota importante**: Este proyecto es solo para fines educativos y de automatización personal. Úsalo responsablemente y respeta los términos de servicio de WhatsApp.
