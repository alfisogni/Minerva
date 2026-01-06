# 🤖 Minerva - Automatización de Documentación de Proyectos

Minerva es un sistema inteligente de automatización de documentación que utiliza IA para generar documentación estructurada y profesional a partir de archivos de proyecto.

## ✨ Características

- 📂 **Carga múltiple de archivos**: Soporta PDF, DOC, DOCX, TXT, MD y archivos de código
- 🤖 **Procesamiento con IA**: Análisis inteligente de contenido mediante APIs de IA
- 📄 **Generación de .docx**: Exporta documentación en formato Word editable
- 📋 **Template estructurado**: Sigue una estructura profesional de documentación iterativa
- 🔍 **Gestión de documentaciones**: Busca, visualiza y descarga documentaciones guardadas
- 📊 **Historial de actividad**: Seguimiento de accesos y modificaciones por usuario
- 🎨 **Interfaz moderna**: Construida con React, TypeScript y Ant Design

## 🏗️ Estructura del Proyecto

```
Minerva/
├── src/
│   ├── pages/
│   │   └── Minerva/
│   │       ├── Minerva.tsx              # Componente principal con layout
│   │       └── components/
│   │           ├── NuevaDocumentacion.tsx    # Upload y procesamiento
│   │           ├── VerDocumentaciones.tsx    # Lista de docs guardadas
│   │           └── Historial.tsx             # Historial de actividad
│   ├── services/
│   │   ├── docxGenerator.service.ts     # Generación de archivos .docx
│   │   └── ia.service.ts                # Integración con APIs de IA
│   ├── types/
│   │   └── documentacion.types.ts       # Tipos TypeScript
│   ├── Hooks/
│   │   ├── useDocumentTitle.ts          # Hook para títulos de página
│   │   └── usePlazos.ts                 # Hook reutilizable
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

## 📋 Template de Documentación

El sistema genera documentación siguiendo este template estructurado:

1. **Portada del Documento**: Metadatos del proyecto e iteración
2. **TL;DR Ejecutivo**: Resumen para stakeholders
3. **Alcance del Proyecto**: Funcionalidades incluidas/excluidas
4. **Historial de Iteraciones**: Registro de cambios por versión
5. **Requerimientos Funcionales**: Casos de uso detallados
6. **Requerimientos No Funcionales**: Performance, seguridad, etc.
7. **Diseño Técnico**: Arquitectura y decisiones clave (ADR)
8. **Modelo de Datos**: Entidades y relaciones
9. **Flujo del Sistema**: Flujos felices y con error
10. **Testing y Validación**: Casos de prueba
11. **Riesgos y Deuda Técnica**: Transparencia sobre limitaciones
12. **Anexos**: Logs, configuraciones, referencias

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview de producción
npm run preview
```

### Desarrollo

El servidor de desarrollo se inicia en `http://localhost:3000`

## 🛠️ Tecnologías

- **Frontend**: React 19, TypeScript
- **UI**: Ant Design 6, Tailwind CSS
- **Build**: Vite
- **Documentos**: docx library
- **IA**: APIs mock (preparado para OpenAI, Claude, Gemini)

## 📝 Roadmap

### MVP Actual ✅
- [x] Estructura base del proyecto
- [x] Componentes de interfaz (Nueva Doc, Ver Docs, Historial)
- [x] Tipos TypeScript completos
- [x] Servicio de generación .docx
- [x] Mock de servicio de IA

### Próximas Iteraciones 🚧
- [ ] Integración real con API de IA (OpenAI/Claude)
- [ ] Implementación de OCR (Azure Form Recognizer / Tesseract.js)
- [ ] Backend con API REST
- [ ] Base de datos para persistencia
- [ ] Sistema de autenticación y usuarios
- [ ] Editor de documentación inline
- [ ] Versionado de documentos
- [ ] Exportación a múltiples formatos (PDF, HTML, Markdown)
- [ ] Templates personalizables
- [ ] Colaboración en tiempo real

## 🔧 Configuración de IA

Para usar APIs de IA reales, configura las variables de entorno:

```bash
# .env
VITE_IA_PROVIDER=openai  # openai | claude | gemini
VITE_IA_API_KEY=tu-api-key
VITE_IA_MODEL=gpt-4
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

ISC License

## 👥 Autores

Proyecto desarrollado como sistema de automatización de documentación profesional.

---

**Minerva** - *Porque la documentación no debería ser manual* 🚀
 
