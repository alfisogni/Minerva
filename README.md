# Minerva — Automatización de Documentación de Proyectos

Minerva es una aplicación web que utiliza IA para generar documentación técnica estructurada a partir de archivos de proyecto. El usuario carga sus archivos, proporciona contexto y Minerva produce un documento `.docx` con una estructura profesional e iterativa lista para usar.

> **Estado actual:** MVP funcional con servicio de IA en modo mock. La integración real con proveedores de IA (OpenAI, Claude, Gemini) está en desarrollo.

---

## Características

- **Carga múltiple de archivos** — PDF, DOC, DOCX, TXT, MD y código fuente
- **Procesamiento con IA** — Análisis inteligente del contenido (mock listo para reemplazar)
- **Generación de .docx** — Exporta documentación en formato Word editable
- **Template estructurado** — Sigue una estructura profesional de documentación iterativa
- **Gestión de documentaciones** — Busca, visualiza y descarga documentos guardados
- **Historial de actividad** — Seguimiento de accesos y modificaciones

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + TypeScript |
| UI | Ant Design 6 |
| Build | Vite 7 |
| Generación de docs | `docx` |
| IA | Mock (preparado para OpenAI / Claude / Gemini) |

---

## Instalación

### Requisitos

- Node.js 18+
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/alfisogni/Minerva.git
cd Minerva

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 4. Iniciar en modo desarrollo
npm run dev
```

El servidor arranca en `http://localhost:5173`.

---

## Configuración de IA

Copia `.env.example` a `.env` y completa los valores:

```env
# Proveedor de IA: mock | openai | claude | gemini
VITE_IA_PROVIDER=mock

# Tu API key del proveedor elegido (dejar vacío si usas mock)
VITE_IA_API_KEY=

# Modelo a utilizar
VITE_IA_MODEL=gpt-4
```

> **Nunca subas tu archivo `.env` al repositorio.** Ya está incluido en `.gitignore`.

---

## Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Compilar para producción
npm run preview   # Preview del build de producción
npm run lint      # Verificar tipos TypeScript
```

---

## Estructura del proyecto

```
src/
├── pages/
│   └── Minerva/
│       ├── Minerva.tsx                  # Layout principal
│       └── components/
│           ├── NuevaDocumentacion.tsx   # Carga y procesamiento
│           ├── VerDocumentaciones.tsx   # Lista de docs guardadas
│           ├── VisorDocumentacion.tsx   # Visualizador de documentos
│           └── Historial.tsx            # Historial de actividad
├── services/
│   ├── ia.service.ts                   # Integración con IA
│   └── docxGenerator.service.ts        # Generación de .docx
├── types/
│   └── documentacion.types.ts          # Tipos TypeScript
└── hooks/
    └── useDocumentTitle.ts
```

---

## Template de documentación

El sistema genera documentos con la siguiente estructura:

1. Portada — Metadatos del proyecto e iteración
2. TL;DR Ejecutivo — Resumen para stakeholders
3. Alcance — Funcionalidades incluidas/excluidas
4. Historial de iteraciones
5. Requerimientos funcionales
6. Requerimientos no funcionales
7. Diseño técnico y decisiones de arquitectura (ADR)
8. Modelo de datos
9. Flujos del sistema (happy path y errores)
10. Testing y validación
11. Riesgos y deuda técnica
12. Anexos

---

## Roadmap

### MVP ✅
- [x] Estructura base y componentes de interfaz
- [x] Tipos TypeScript completos
- [x] Servicio de generación `.docx`
- [x] Mock de servicio de IA

### En desarrollo 🚧
- [ ] Integración real con APIs de IA (OpenAI / Claude / Gemini)
- [ ] OCR para extracción de texto de imágenes y PDF escaneados
- [ ] Backend con API REST y base de datos
- [ ] Autenticación y gestión de usuarios
- [ ] Exportación a PDF, HTML y Markdown
- [ ] Colaboración en tiempo real

---

## Contribuir

1. Haz fork del repositorio
2. Crea una rama: `git checkout -b feature/mi-feature`
3. Commitea tus cambios: `git commit -m 'feat: descripción del cambio'`
4. Push a tu rama: `git push origin feature/mi-feature`
5. Abre un Pull Request

---

## Licencia

[ISC](LICENSE)

---

*Porque la documentación no debería ser manual.*
