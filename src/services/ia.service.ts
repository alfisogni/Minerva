import type { DocumentacionProyecto } from '../types/documentacion.types';

/**
 * Servicio Mock para integración con APIs de IA
 * En producción, esto se reemplazará con llamadas reales a OpenAI, Claude, etc.
 */
export class IAService {
  /**
   * Genera documentación estructurada a partir del contenido de archivos
   * @param filesContent - Array de contenidos de archivos extraídos
   * @param context - Contexto adicional del usuario
   */
  static async generateDocumentation(
    _filesContent: string[],
    context?: string
  ): Promise<DocumentacionProyecto> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock de respuesta estructurada
    return {
      portada: {
        proyecto: 'Proyecto Generado por IA',
        codigoId: `PROJ-${Date.now()}`,
        estadoActual: 'En desarrollo',
        iteracionActual: 'v1.0',
        fechaUltimaActualizacion: new Date().toISOString().split('T')[0],
        responsableTecnico: 'Por definir',
        responsableFuncional: 'Por definir'
      },
      tldrEjecutivo: {
        objetivoProyecto: context || 'Automatización de procesos mediante análisis de archivos',
        queSeResolvioEnEstaIteracion: 'Configuración inicial del proyecto y estructura base',
        queNoSeToco: 'Integraciones con sistemas externos',
        riesgosAbiertos: [
          'Validar requisitos con stakeholders',
          'Definir arquitectura de escalabilidad'
        ],
        proximoPaso: 'Implementar funcionalidades core'
      },
      alcanceProyecto: {
        funcionalidadesIncluidas: [
          'Procesamiento de archivos',
          'Generación de documentación',
          'Gestión de usuarios'
        ],
        funcionalidadesExcluidas: [
          'Integración con sistemas legados',
          'Reportes avanzados'
        ]
      },
      historialIteraciones: [
        {
          iteracion: 'v1.0',
          fecha: new Date().toISOString().split('T')[0],
          queCambio: 'Creación inicial del proyecto',
          motivo: 'Setup inicial',
          impacto: 'Base para desarrollo futuro'
        }
      ],
      requerimientosFuncionales: [
        {
          id: 'RF-001',
          nombre: 'Procesamiento de Archivos',
          descripcion: 'El sistema debe permitir la carga y procesamiento de múltiples tipos de archivos',
          actor: 'Usuario',
          flujoPrincipal: [
            'Usuario selecciona archivos',
            'Sistema valida formato y tamaño',
            'Sistema procesa contenido',
            'Sistema muestra resultados'
          ],
          casosAlternativos: [
            'Archivo con formato inválido: mostrar error',
            'Archivo muy grande: rechazar y notificar'
          ],
          resultadoEsperado: 'Archivos procesados correctamente'
        }
      ],
      requerimientosNoFuncionales: {
        performance: 'Tiempo de respuesta menor a 3 segundos para procesamiento',
        seguridad: 'Encriptación de datos en tránsito y reposo',
        disponibilidad: '99.5% uptime',
        escalabilidad: 'Soporte para hasta 1000 usuarios concurrentes',
        compatibilidad: 'Compatible con navegadores modernos (Chrome, Firefox, Edge)'
      },
      disenoTecnico: {
        arquitecturaGeneral: {
          stack: ['React', 'TypeScript', 'Ant Design', 'Vite'],
          servicios: ['Frontend SPA', 'API Gateway', 'Servicio de Procesamiento'],
          integracionesExternas: ['API de IA (OpenAI/Claude)', 'Servicio de OCR']
        },
        decisionesClaveADR: [
          {
            problema: 'Elección de framework frontend',
            opcionesEvaluadas: ['React', 'Vue', 'Angular'],
            decisionTomada: 'React con TypeScript',
            consecuencia: 'Mayor comunidad, mejor tipado, más recursos'
          }
        ]
      },
      modeloDatos: {
        entidadesPrincipales: [
          {
            nombre: 'Documentacion',
            camposCriticos: ['id', 'titulo', 'contenido', 'fechaCreacion', 'autor'],
            relaciones: ['Tiene muchos Archivos', 'Pertenece a Usuario']
          }
        ]
      },
      flujoSistema: {
        flujoFeliz: [
          'Usuario carga archivos',
          'Sistema valida archivos',
          'Sistema extrae contenido',
          'IA genera documentación',
          'Usuario revisa resultado',
          'Usuario descarga documento'
        ],
        flujoConError: [
          'Usuario carga archivo inválido',
          'Sistema detecta error',
          'Sistema notifica al usuario',
          'Usuario corrige y reintenta'
        ],
        puntosValidacion: [
          'Validación de formato de archivo',
          'Validación de tamaño',
          'Validación de contenido'
        ]
      },
      testingValidacion: {
        casosCriticos: [
          {
            caso: 'Carga de archivo PDF válido',
            resultadoEsperado: 'Archivo procesado correctamente',
            estado: 'Pendiente'
          }
        ],
        casosBorde: [
          {
            caso: 'Archivo corrupto',
            resultadoEsperado: 'Error controlado con mensaje apropiado',
            estado: 'Pendiente'
          }
        ]
      },
      riesgosSupuestos: {
        riesgosActuales: [
          'Dependencia de API externa de IA',
          'Límites de procesamiento de archivos grandes'
        ],
        supuestosTomados: [
          'Usuario tiene conexión a internet estable',
          'Archivos están en formatos estándar'
        ],
        deudaTecnicaConocida: [
          'Falta implementar caché de resultados',
          'Optimizar procesamiento de archivos grandes'
        ]
      },
      anexos: {
        logsRelevantes: [],
        configuraciones: [],
        referenciasExternas: []
      }
    };
  }

  /**
   * Extrae texto de un archivo (simulación)
   * En producción, usaría OCR real o parsers específicos
   */
  static async extractText(file: File): Promise<string> {
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulación de extracción
    return `Contenido extraído del archivo: ${file.name}\n\nEste es un contenido de ejemplo que simula el texto extraído del archivo mediante OCR o parsing.`;
  }

  /**
   * Actualiza una sección específica de la documentación
   */
  static async updateSection(
    currentDoc: DocumentacionProyecto,
    _section: keyof DocumentacionProyecto,
    _newContent: string
  ): Promise<DocumentacionProyecto> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // En producción, aquí se llamaría a la IA para regenerar solo esa sección
    return currentDoc;
  }

  /**
   * Valida la coherencia de la documentación
   */
  static async validateDocumentation(_doc: DocumentacionProyecto): Promise<{
    isValid: boolean;
    issues: string[];
    suggestions: string[];
  }> {
    // Simular validación
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      isValid: true,
      issues: [],
      suggestions: [
        'Considerar agregar más casos de prueba',
        'Detallar mejor los requerimientos no funcionales'
      ]
    };
  }
}

/**
 * Configuración de APIs de IA
 * En producción, estas claves vendrían de variables de entorno
 */
export const IAConfig = {
  provider: 'mock', // 'openai' | 'claude' | 'gemini' | 'mock'
  apiKey: import.meta.env.VITE_IA_API_KEY || '',
  model: 'gpt-4', // o claude-3-sonnet, etc.
  maxTokens: 4000,
  temperature: 0.7
};

/**
 * Prompts del sistema para guiar a la IA
 */
export const SystemPrompts = {
  generateDocumentation: `Eres un experto en documentación de proyectos de software.
Tu tarea es analizar el código y archivos proporcionados y generar documentación profesional y completa.
Debes seguir la estructura del template proporcionado y mantener un lenguaje claro y técnico.
No inventes requerimientos que no estén respaldados por el código.`,

  updateSection: `Actualiza solo la sección solicitada de la documentación.
Mantén consistencia con el resto del documento.
Usa lenguaje profesional y técnico apropiado.`,

  validate: `Revisa la documentación y valida que:
- Todas las secciones estén completas
- No haya inconsistencias
- El lenguaje sea apropiado
- Los requerimientos estén bien definidos`
};
