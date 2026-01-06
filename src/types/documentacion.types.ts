/**
 * Tipos para la estructura del documento de documentación
 * Basado en el template de documentación iterativa
 */

export interface Portada {
  proyecto: string;
  codigoId: string;
  estadoActual: 'En diseño' | 'En desarrollo' | 'En testing' | 'En producción';
  iteracionActual: string;
  fechaUltimaActualizacion: string;
  responsableTecnico: string;
  responsableFuncional: string;
}

export interface TLDREjecutivo {
  objetivoProyecto: string;
  queSeResolvioEnEstaIteracion: string;
  queNoSeToco: string;
  riesgosAbiertos: string[];
  proximoPaso: string;
}

export interface AlcanceProyecto {
  funcionalidadesIncluidas: string[];
  funcionalidadesExcluidas: string[];
}

export interface IteracionHistorial {
  iteracion: string;
  fecha: string;
  queCambio: string;
  motivo: string;
  impacto: string;
}

export interface RequerimientoFuncional {
  id: string;
  nombre: string;
  descripcion: string;
  actor: string;
  flujoPrincipal: string[];
  casosAlternativos: string[];
  resultadoEsperado: string;
}

export interface RequerimientosNoFuncionales {
  performance: string;
  seguridad: string;
  disponibilidad: string;
  escalabilidad: string;
  compatibilidad: string;
}

export interface DecisionTecnica {
  problema: string;
  opcionesEvaluadas: string[];
  decisionTomada: string;
  consecuencia: string;
}

export interface DisenoTecnico {
  arquitecturaGeneral: {
    stack: string[];
    servicios: string[];
    integracionesExternas: string[];
  };
  decisionesClaveADR: DecisionTecnica[];
}

export interface Entidad {
  nombre: string;
  camposCriticos: string[];
  relaciones: string[];
}

export interface ModeloDatos {
  entidadesPrincipales: Entidad[];
}

export interface FlujoSistema {
  flujoFeliz: string[];
  flujoConError: string[];
  puntosValidacion: string[];
}

export interface CasoPrueba {
  caso: string;
  resultadoEsperado: string;
  estado: 'Pendiente' | 'Pasó' | 'Falló';
}

export interface TestingValidacion {
  casosCriticos: CasoPrueba[];
  casosBorde: CasoPrueba[];
}

export interface RiesgosSupuestos {
  riesgosActuales: string[];
  supuestosTomados: string[];
  deudaTecnicaConocida: string[];
}

export interface FeedbackUsuario {
  documentacionClara: boolean;
  queFalto: string;
  queSobra: string;
  dudasFrecuentes: string[];
}

export interface Anexos {
  logsRelevantes: string[];
  configuraciones: string[];
  referenciasExternas: string[];
}

/**
 * Estructura completa del documento
 */
export interface DocumentacionProyecto {
  portada: Portada;
  tldrEjecutivo: TLDREjecutivo;
  alcanceProyecto: AlcanceProyecto;
  historialIteraciones: IteracionHistorial[];
  requerimientosFuncionales: RequerimientoFuncional[];
  requerimientosNoFuncionales: RequerimientosNoFuncionales;
  disenoTecnico: DisenoTecnico;
  modeloDatos: ModeloDatos;
  flujoSistema: FlujoSistema;
  testingValidacion: TestingValidacion;
  riesgosSupuestos: RiesgosSupuestos;
  feedbackUsuario?: FeedbackUsuario;
  anexos: Anexos;
}

/**
 * Tipos para la gestión de documentaciones
 */
export interface Documentacion {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  archivos: number;
  tags: string[];
  autor: string;
  contenido?: DocumentacionProyecto;
}

/**
 * Tipos para el historial de actividad
 */
export interface HistorialItem {
  id: string;
  accion: string;
  documento: string;
  usuario: string;
  fecha: string;
  tipo: 'crear' | 'editar' | 'ver' | 'descargar';
}

/**
 * Tipos para archivos subidos
 */
export interface ArchivoSubido {
  uid: string;
  name: string;
  size: number;
  type: string;
  content?: string;
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
}
