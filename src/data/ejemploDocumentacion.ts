import type { DocumentacionProyecto } from '../types/documentacion.types';

/**
 * Datos de ejemplo para testing del sistema
 */
export const documentacionEjemplo: DocumentacionProyecto = {
  portada: {
    proyecto: 'Sistema de Gestión Administrativa Local (SGAL)',
    codigoId: 'SGAL-2026-001',
    estadoActual: 'En desarrollo',
    iteracionActual: 'v2.0',
    fechaUltimaActualizacion: '2026-01-06',
    responsableTecnico: 'Juan Pérez',
    responsableFuncional: 'María García'
  },
  tldrEjecutivo: {
    objetivoProyecto: 'Desarrollar un sistema web integral para la gestión administrativa de procesos locales, incluyendo cálculo de plazos, gestión de expedientes y reportes',
    queSeResolvioEnEstaIteracion: 'Se implementó el módulo de cálculo de plazos con integración de días hábiles e inhábiles, y se mejoró la interfaz de usuario con Ant Design',
    queNoSeToco: 'Módulo de reportes avanzados y exportación a PDF',
    riesgosAbiertos: [
      'Integración pendiente con sistema de firma digital',
      'Performance en consultas con más de 10,000 registros',
      'Validación de cumplimiento normativo pendiente'
    ],
    proximoPaso: 'Implementar módulo de gestión de expedientes y sistema de notificaciones'
  },
  alcanceProyecto: {
    funcionalidadesIncluidas: [
      'Cálculo automático de plazos legales',
      'Gestión de días hábiles e inhábiles',
      'Dashboard administrativo',
      'Sistema de usuarios y permisos',
      'Auditoría de acciones',
      'Exportación a Excel'
    ],
    funcionalidadesExcluidas: [
      'Firma digital (fuera de alcance v2.0)',
      'Integración con sistemas externos de terceros',
      'App móvil nativa',
      'Reportes personalizados avanzados'
    ]
  },
  historialIteraciones: [
    {
      iteracion: 'v1.0',
      fecha: '2025-11-15',
      queCambio: 'Versión inicial con calculadora de plazos básica',
      motivo: 'MVP para validar concepto',
      impacto: 'Permitió testeo inicial con usuarios'
    },
    {
      iteracion: 'v1.5',
      fecha: '2025-12-20',
      queCambio: 'Agregado sistema de días inhábiles y mejoras UI',
      motivo: 'Feedback de usuarios piloto',
      impacto: 'Reducción 40% en errores de cálculo'
    },
    {
      iteracion: 'v2.0',
      fecha: '2026-01-06',
      queCambio: 'Refactorización completa con Ant Design y TypeScript',
      motivo: 'Escalabilidad y mantenibilidad',
      impacto: 'Base sólida para próximos módulos'
    }
  ],
  requerimientosFuncionales: [
    {
      id: 'RF-001',
      nombre: 'Cálculo de Plazos',
      descripcion: 'El sistema debe calcular automáticamente plazos legales considerando días hábiles, inhábiles y feriados',
      actor: 'Usuario Administrativo',
      flujoPrincipal: [
        'Usuario ingresa fecha inicial',
        'Usuario selecciona tipo de plazo (días hábiles/corridos)',
        'Usuario ingresa cantidad de días',
        'Sistema calcula fecha de vencimiento',
        'Sistema muestra resultado con desglose'
      ],
      casosAlternativos: [
        'Si la fecha cae en día inhábil, se corre al siguiente día hábil',
        'Si no hay días configurados, se usa solo calendario gregoriano',
        'Si el plazo es 0, se muestra advertencia'
      ],
      resultadoEsperado: 'Fecha de vencimiento calculada correctamente con 99.9% de precisión'
    },
    {
      id: 'RF-002',
      nombre: 'Gestión de Días Inhábiles',
      descripcion: 'El sistema debe permitir configurar y mantener un calendario de días inhábiles',
      actor: 'Administrador del Sistema',
      flujoPrincipal: [
        'Administrador accede a módulo de configuración',
        'Administrador carga archivo con días inhábiles',
        'Sistema valida formato',
        'Sistema actualiza calendario',
        'Sistema confirma actualización'
      ],
      casosAlternativos: [
        'Si el archivo tiene errores, se muestra listado de errores',
        'Si hay fechas duplicadas, se ignoran',
        'Si se intenta cargar archivo vacío, se rechaza'
      ],
      resultadoEsperado: 'Calendario actualizado y reflejado en cálculos posteriores'
    }
  ],
  requerimientosNoFuncionales: {
    performance: 'Tiempo de respuesta < 2 segundos para cálculos, < 500ms para consultas',
    seguridad: 'Autenticación JWT, HTTPS obligatorio, encriptación de datos sensibles, logs de auditoría completos',
    disponibilidad: '99.5% uptime en horario laboral (8-20hs), mantenimientos planificados fuera de horario',
    escalabilidad: 'Soportar hasta 500 usuarios concurrentes, 100,000 cálculos/día',
    compatibilidad: 'Chrome 90+, Firefox 88+, Edge 90+, Safari 14+. Responsive desde 320px'
  },
  disenoTecnico: {
    arquitecturaGeneral: {
      stack: [
        'Frontend: React 19 + TypeScript + Vite',
        'UI: Ant Design 6 + Tailwind CSS',
        'Estado: React Hooks + Context API',
        'Build: Vite 7'
      ],
      servicios: [
        'Frontend SPA (React)',
        'API REST (pendiente - Node.js/Express)',
        'Base de datos (pendiente - PostgreSQL)'
      ],
      integracionesExternas: [
        'Calendario de días inhábiles (archivo Excel)',
        'Futura: API de firma digital',
        'Futura: Sistema de notificaciones por email'
      ]
    },
    decisionesClaveADR: [
      {
        problema: 'Elección de framework UI para reemplazar CSS custom',
        opcionesEvaluadas: [
          'Material UI - Muy grande, sobrecarga',
          'Ant Design - Completo, bien documentado, empresarial',
          'Chakra UI - Moderno pero menos componentes'
        ],
        decisionTomada: 'Ant Design por su completitud y estilo empresarial',
        consecuencia: 'Mayor consistencia visual, menor código custom, mejor DX'
      },
      {
        problema: 'Manejo de estado complejo sin Redux',
        opcionesEvaluadas: [
          'Redux - Overkill para el tamaño actual',
          'Zustand - Ligero pero requiere aprendizaje',
          'Context + Hooks - Nativo de React'
        ],
        decisionTomada: 'Context API + Hooks personalizados',
        consecuencia: 'Código más simple, menos dependencias, suficiente para MVP'
      }
    ]
  },
  modeloDatos: {
    entidadesPrincipales: [
      {
        nombre: 'Usuario',
        camposCriticos: ['id', 'email', 'rol', 'fechaCreacion'],
        relaciones: ['Tiene muchos Calculos', 'Pertenece a Organizacion']
      },
      {
        nombre: 'Calculo',
        camposCriticos: ['id', 'fechaInicio', 'diasPlazo', 'fechaVencimiento', 'tipoCalculo'],
        relaciones: ['Pertenece a Usuario', 'Usa Calendario']
      },
      {
        nombre: 'DiaInhabil',
        camposCriticos: ['id', 'fecha', 'descripcion', 'tipo'],
        relaciones: ['Pertenece a Calendario']
      }
    ]
  },
  flujoSistema: {
    flujoFeliz: [
      'Usuario se autentica en el sistema',
      'Usuario navega a módulo de cálculo de plazos',
      'Usuario ingresa parámetros (fecha, días, tipo)',
      'Sistema valida datos',
      'Sistema consulta calendario de días inhábiles',
      'Sistema calcula fecha de vencimiento',
      'Sistema muestra resultado con desglose',
      'Usuario puede guardar el cálculo',
      'Sistema registra auditoría'
    ],
    flujoConError: [
      'Usuario ingresa fecha inválida',
      'Sistema detecta error de validación',
      'Sistema muestra mensaje de error claro',
      'Usuario corrige el dato',
      'Sistema reintenta validación',
      'Si es correcto, continúa flujo normal'
    ],
    puntosValidacion: [
      'Validación de autenticación JWT en cada request',
      'Validación de formato de fecha (DD/MM/YYYY)',
      'Validación de rango de días (1-999)',
      'Validación de permisos por rol',
      'Validación de integridad de calendario'
    ]
  },
  testingValidacion: {
    casosCriticos: [
      {
        caso: 'Cálculo con 10 días hábiles desde lunes',
        resultadoEsperado: 'Fecha correcta saltando fin de semana',
        estado: 'Pasó'
      },
      {
        caso: 'Cálculo cruzando feriado',
        resultadoEsperado: 'Feriado se excluye del cómputo',
        estado: 'Pasó'
      },
      {
        caso: 'Autenticación con credenciales válidas',
        resultadoEsperado: 'Token JWT generado correctamente',
        estado: 'Pendiente'
      }
    ],
    casosBorde: [
      {
        caso: 'Cálculo con fecha 29 de febrero en año no bisiesto',
        resultadoEsperado: 'Error de validación controlado',
        estado: 'Pasó'
      },
      {
        caso: 'Usuario sin permisos intenta acceder a admin',
        resultadoEsperado: 'Redirección a página de error 403',
        estado: 'Pendiente'
      }
    ]
  },
  riesgosSupuestos: {
    riesgosActuales: [
      'Dependencia total de archivo Excel para días inhábiles - falta API automatizada',
      'Sin backend implementado - datos solo en memoria del navegador',
      'Performance no testeada con más de 1000 registros simultáneos'
    ],
    supuestosTomados: [
      'Usuario tiene navegador moderno actualizado',
      'Conexión a internet estable durante uso',
      'Archivo de días inhábiles se actualiza manualmente cada año',
      'Cálculos no requieren persistencia entre sesiones (por ahora)'
    ],
    deudaTecnicaConocida: [
      'Falta implementar testing automatizado (unit + e2e)',
      'Código de cálculo de plazos tiene complejidad ciclomática alta',
      'No hay sistema de caché para cálculos frecuentes',
      'Componentes UI no están documentados con Storybook',
      'Falta manejo de errores global con boundary de React'
    ]
  },
  anexos: {
    logsRelevantes: [
      'Log de migración de CSS custom a Ant Design (2026-01-02)',
      'Log de refactorización de hook usePlazos (2026-01-05)'
    ],
    configuraciones: [
      'Vite config: puerto 3000, HMR habilitado',
      'TypeScript: strict mode, target ES2020',
      'Tailwind: preflight deshabilitado para compatibilidad con Ant Design'
    ],
    referenciasExternas: [
      'Documentación oficial Ant Design: https://ant.design',
      'Calendario oficial de feriados nacionales',
      'Normativa legal sobre cómputo de plazos (Ley X)'
    ]
  }
};
