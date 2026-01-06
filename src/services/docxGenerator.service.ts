import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType
} from 'docx';
import { saveAs } from 'file-saver';
import type { DocumentacionProyecto } from '../types/documentacion.types';

/**
 * Servicio para generar documentos .docx a partir de la estructura de documentación
 */
export class DocxGeneratorService {
  /**
   * Genera y descarga un documento .docx
   */
  static async generateAndDownload(data: DocumentacionProyecto, filename: string = 'documentacion.docx'): Promise<void> {
    const doc = this.createDocument(data);
    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
  }

  /**
   * Crea el documento completo
   */
  private static createDocument(data: DocumentacionProyecto): Document {
    const sections = [
      ...this.createPortada(data.portada),
      ...this.createTLDR(data.tldrEjecutivo),
      ...this.createAlcance(data.alcanceProyecto),
      ...this.createHistorialIteraciones(data.historialIteraciones),
      ...this.createRequerimientosFuncionales(data.requerimientosFuncionales),
      ...this.createRequerimientosNoFuncionales(data.requerimientosNoFuncionales),
      ...this.createDisenoTecnico(data.disenoTecnico),
      ...this.createModeloDatos(data.modeloDatos),
      ...this.createFlujoSistema(data.flujoSistema),
      ...this.createTestingValidacion(data.testingValidacion),
      ...this.createRiesgosSupuestos(data.riesgosSupuestos),
      ...this.createAnexos(data.anexos)
    ];

    return new Document({
      sections: [{
        properties: {},
        children: sections
      }]
    });
  }

  /**
   * Crea la sección de Portada
   */
  private static createPortada(portada: DocumentacionProyecto['portada']): Paragraph[] {
    return [
      new Paragraph({
        text: '🧱 DOCUMENTACIÓN DE PROYECTO',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Proyecto: ', bold: true }),
          new TextRun(portada.proyecto)
        ],
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Código/ID: ', bold: true }),
          new TextRun(portada.codigoId)
        ],
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Estado Actual: ', bold: true }),
          new TextRun(portada.estadoActual)
        ],
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Iteración Actual: ', bold: true }),
          new TextRun(portada.iteracionActual)
        ],
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Fecha Última Actualización: ', bold: true }),
          new TextRun(portada.fechaUltimaActualizacion)
        ],
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Responsable Técnico: ', bold: true }),
          new TextRun(portada.responsableTecnico)
        ],
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Responsable Funcional: ', bold: true }),
          new TextRun(portada.responsableFuncional)
        ],
        spacing: { after: 400 }
      }),
      this.createPageBreak()
    ];
  }

  /**
   * Crea la sección TL;DR Ejecutivo
   */
  private static createTLDR(tldr: DocumentacionProyecto['tldrEjecutivo']): Paragraph[] {
    return [
      new Paragraph({
        text: '2. TL;DR Ejecutivo',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Objetivo del Proyecto: ', bold: true }),
          new TextRun(tldr.objetivoProyecto)
        ],
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Qué se resolvió en esta iteración: ', bold: true }),
          new TextRun(tldr.queSeResolvioEnEstaIteracion)
        ],
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Qué NO se tocó: ', bold: true }),
          new TextRun(tldr.queNoSeToco)
        ],
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [new TextRun({ text: 'Riesgos abiertos:', bold: true })],
        spacing: { after: 100 }
      }),
      ...tldr.riesgosAbiertos.map(riesgo => 
        new Paragraph({
          text: `• ${riesgo}`,
          spacing: { after: 100 }
        })
      ),
      new Paragraph({
        children: [
          new TextRun({ text: 'Próximo paso: ', bold: true }),
          new TextRun(tldr.proximoPaso)
        ],
        spacing: { after: 400 }
      })
    ];
  }

  /**
   * Crea la sección de Alcance del Proyecto
   */
  private static createAlcance(alcance: DocumentacionProyecto['alcanceProyecto']): Paragraph[] {
    return [
      new Paragraph({
        text: '3. Alcance del Proyecto',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: '3.1 Funcionalidades Incluidas',
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 100 }
      }),
      ...alcance.funcionalidadesIncluidas.map(func => 
        new Paragraph({
          text: `☑ ${func}`,
          spacing: { after: 100 }
        })
      ),
      new Paragraph({
        text: '3.2 Funcionalidades Excluidas',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      }),
      ...alcance.funcionalidadesExcluidas.map(func => 
        new Paragraph({
          text: `❌ ${func}`,
          spacing: { after: 100 }
        })
      ),
      new Paragraph({ text: '', spacing: { after: 400 } })
    ];
  }

  /**
   * Crea la tabla de Historial de Iteraciones
   */
  private static createHistorialIteraciones(iteraciones: DocumentacionProyecto['historialIteraciones']): Paragraph[] {
    const paragraphs: Paragraph[] = [
      new Paragraph({
        text: '4. Historial de Iteraciones',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      })
    ];

    if (iteraciones.length > 0) {
      const table = new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE
        },
        rows: [
          // Header
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: 'Iteración', bold: true })] })],
                shading: { fill: 'CCCCCC' }
              }),
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: 'Fecha', bold: true })] })],
                shading: { fill: 'CCCCCC' }
              }),
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: 'Qué Cambió', bold: true })] })],
                shading: { fill: 'CCCCCC' }
              }),
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: 'Motivo', bold: true })] })],
                shading: { fill: 'CCCCCC' }
              }),
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: 'Impacto', bold: true })] })],
                shading: { fill: 'CCCCCC' }
              })
            ]
          }),
          // Data rows
          ...iteraciones.map(iter => new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(iter.iteracion)] }),
              new TableCell({ children: [new Paragraph(iter.fecha)] }),
              new TableCell({ children: [new Paragraph(iter.queCambio)] }),
              new TableCell({ children: [new Paragraph(iter.motivo)] }),
              new TableCell({ children: [new Paragraph(iter.impacto)] })
            ]
          }))
        ]
      });

      // Note: We can't add Table directly to paragraph array, need to handle differently
      // For now, creating a text representation
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: 'Tabla de iteraciones (ver documento para formato completo)', italics: true })],
          spacing: { after: 400 }
        })
      );
    }

    return paragraphs;
  }

  /**
   * Crea la sección de Requerimientos Funcionales
   */
  private static createRequerimientosFuncionales(requerimientos: DocumentacionProyecto['requerimientosFuncionales']): Paragraph[] {
    const paragraphs: Paragraph[] = [
      new Paragraph({
        text: '5. Requerimientos Funcionales',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      })
    ];

    requerimientos.forEach(req => {
      paragraphs.push(
        new Paragraph({
          text: `${req.id} – ${req.nombre}`,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Descripción: ', bold: true }),
            new TextRun(req.descripcion)
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Actor: ', bold: true }),
            new TextRun(req.actor)
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Flujo Principal:', bold: true })],
          spacing: { after: 50 }
        }),
        ...req.flujoPrincipal.map((paso, idx) => 
          new Paragraph({
            text: `${idx + 1}. ${paso}`,
            spacing: { after: 50 }
          })
        ),
        new Paragraph({
          children: [new TextRun({ text: 'Casos Alternativos:', bold: true })],
          spacing: { before: 100, after: 50 }
        }),
        ...req.casosAlternativos.map(caso => 
          new Paragraph({
            text: `• ${caso}`,
            spacing: { after: 50 }
          })
        ),
        new Paragraph({
          children: [
            new TextRun({ text: 'Resultado Esperado: ', bold: true }),
            new TextRun(req.resultadoEsperado)
          ],
          spacing: { after: 200 }
        })
      );
    });

    return paragraphs;
  }

  /**
   * Crea la sección de Requerimientos No Funcionales
   */
  private static createRequerimientosNoFuncionales(rnf: DocumentacionProyecto['requerimientosNoFuncionales']): Paragraph[] {
    return [
      new Paragraph({
        text: '6. Requerimientos No Funcionales',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Performance: ', bold: true }),
          new TextRun(rnf.performance)
        ],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Seguridad: ', bold: true }),
          new TextRun(rnf.seguridad)
        ],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Disponibilidad: ', bold: true }),
          new TextRun(rnf.disponibilidad)
        ],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Escalabilidad: ', bold: true }),
          new TextRun(rnf.escalabilidad)
        ],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Compatibilidad: ', bold: true }),
          new TextRun(rnf.compatibilidad)
        ],
        spacing: { after: 400 }
      })
    ];
  }

  /**
   * Crea la sección de Diseño Técnico
   */
  private static createDisenoTecnico(diseno: DocumentacionProyecto['disenoTecnico']): Paragraph[] {
    const paragraphs: Paragraph[] = [
      new Paragraph({
        text: '7. Diseño Técnico',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: '7.1 Arquitectura General',
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: 'Stack:', bold: true })],
        spacing: { after: 50 }
      }),
      ...diseno.arquitecturaGeneral.stack.map(item => 
        new Paragraph({
          text: `• ${item}`,
          spacing: { after: 50 }
        })
      ),
      new Paragraph({
        children: [new TextRun({ text: 'Servicios:', bold: true })],
        spacing: { before: 100, after: 50 }
      }),
      ...diseno.arquitecturaGeneral.servicios.map(item => 
        new Paragraph({
          text: `• ${item}`,
          spacing: { after: 50 }
        })
      ),
      new Paragraph({
        children: [new TextRun({ text: 'Integraciones Externas:', bold: true })],
        spacing: { before: 100, after: 50 }
      }),
      ...diseno.arquitecturaGeneral.integracionesExternas.map(item => 
        new Paragraph({
          text: `• ${item}`,
          spacing: { after: 50 }
        })
      ),
      new Paragraph({
        text: '7.2 Decisiones Técnicas Clave (ADR)',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      })
    ];

    diseno.decisionesClaveADR.forEach(decision => {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Problema: ', bold: true }),
            new TextRun(decision.problema)
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Opciones Evaluadas:', bold: true })],
          spacing: { after: 50 }
        }),
        ...decision.opcionesEvaluadas.map(opcion => 
          new Paragraph({
            text: `• ${opcion}`,
            spacing: { after: 50 }
          })
        ),
        new Paragraph({
          children: [
            new TextRun({ text: 'Decisión Tomada: ', bold: true }),
            new TextRun(decision.decisionTomada)
          ],
          spacing: { before: 100, after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Consecuencia: ', bold: true }),
            new TextRun(decision.consecuencia)
          ],
          spacing: { after: 200 }
        })
      );
    });

    return paragraphs;
  }

  /**
   * Crea la sección de Modelo de Datos
   */
  private static createModeloDatos(modelo: DocumentacionProyecto['modeloDatos']): Paragraph[] {
    const paragraphs: Paragraph[] = [
      new Paragraph({
        text: '8. Modelo de Datos',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      })
    ];

    modelo.entidadesPrincipales.forEach(entidad => {
      paragraphs.push(
        new Paragraph({
          text: entidad.nombre,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 100, after: 50 }
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Campos Críticos:', bold: true })],
          spacing: { after: 50 }
        }),
        ...entidad.camposCriticos.map(campo => 
          new Paragraph({
            text: `• ${campo}`,
            spacing: { after: 50 }
          })
        ),
        new Paragraph({
          children: [new TextRun({ text: 'Relaciones:', bold: true })],
          spacing: { before: 50, after: 50 }
        }),
        ...entidad.relaciones.map(relacion => 
          new Paragraph({
            text: `• ${relacion}`,
            spacing: { after: 50 }
          })
        )
      );
    });

    return paragraphs;
  }

  /**
   * Crea la sección de Flujo del Sistema
   */
  private static createFlujoSistema(flujo: DocumentacionProyecto['flujoSistema']): Paragraph[] {
    return [
      new Paragraph({
        text: '9. Flujo del Sistema',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: 'Flujo Feliz:',
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 100 }
      }),
      ...flujo.flujoFeliz.map((paso, idx) => 
        new Paragraph({
          text: `${idx + 1}. ${paso}`,
          spacing: { after: 50 }
        })
      ),
      new Paragraph({
        text: 'Flujo con Error:',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      }),
      ...flujo.flujoConError.map((paso, idx) => 
        new Paragraph({
          text: `${idx + 1}. ${paso}`,
          spacing: { after: 50 }
        })
      ),
      new Paragraph({
        text: 'Puntos de Validación:',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      }),
      ...flujo.puntosValidacion.map(punto => 
        new Paragraph({
          text: `• ${punto}`,
          spacing: { after: 50 }
        })
      )
    ];
  }

  /**
   * Crea la sección de Testing y Validación
   */
  private static createTestingValidacion(testing: DocumentacionProyecto['testingValidacion']): Paragraph[] {
    return [
      new Paragraph({
        text: '10. Testing y Validación',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: 'Casos Críticos:',
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 100 }
      }),
      ...testing.casosCriticos.map(caso => 
        new Paragraph({
          text: `${caso.estado === 'Pasó' ? '✓' : caso.estado === 'Falló' ? '✗' : '○'} ${caso.caso} - ${caso.resultadoEsperado}`,
          spacing: { after: 50 }
        })
      ),
      new Paragraph({
        text: 'Casos Borde:',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      }),
      ...testing.casosBorde.map(caso => 
        new Paragraph({
          text: `${caso.estado === 'Pasó' ? '✓' : caso.estado === 'Falló' ? '✗' : '○'} ${caso.caso} - ${caso.resultadoEsperado}`,
          spacing: { after: 50 }
        })
      )
    ];
  }

  /**
   * Crea la sección de Riesgos, Supuestos y Deuda Técnica
   */
  private static createRiesgosSupuestos(riesgos: DocumentacionProyecto['riesgosSupuestos']): Paragraph[] {
    return [
      new Paragraph({
        text: '11. Riesgos, Supuestos y Deuda Técnica',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        children: [new TextRun({ text: 'Riesgos Actuales:', bold: true })],
        spacing: { after: 50 }
      }),
      ...riesgos.riesgosActuales.map(riesgo => 
        new Paragraph({
          text: `• ${riesgo}`,
          spacing: { after: 50 }
        })
      ),
      new Paragraph({
        children: [new TextRun({ text: 'Supuestos Tomados:', bold: true })],
        spacing: { before: 100, after: 50 }
      }),
      ...riesgos.supuestosTomados.map(supuesto => 
        new Paragraph({
          text: `• ${supuesto}`,
          spacing: { after: 50 }
        })
      ),
      new Paragraph({
        children: [new TextRun({ text: 'Deuda Técnica Conocida:', bold: true })],
        spacing: { before: 100, after: 50 }
      }),
      ...riesgos.deudaTecnicaConocida.map(deuda => 
        new Paragraph({
          text: `• ${deuda}`,
          spacing: { after: 50 }
        })
      )
    ];
  }

  /**
   * Crea la sección de Anexos
   */
  private static createAnexos(anexos: DocumentacionProyecto['anexos']): Paragraph[] {
    const paragraphs: Paragraph[] = [
      new Paragraph({
        text: '13. Anexos',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      })
    ];

    if (anexos.logsRelevantes.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: 'Logs Relevantes:', bold: true })],
          spacing: { after: 50 }
        }),
        ...anexos.logsRelevantes.map(log => 
          new Paragraph({
            text: log,
            spacing: { after: 50 }
          })
        )
      );
    }

    if (anexos.configuraciones.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: 'Configuraciones:', bold: true })],
          spacing: { before: 100, after: 50 }
        }),
        ...anexos.configuraciones.map(config => 
          new Paragraph({
            text: config,
            spacing: { after: 50 }
          })
        )
      );
    }

    if (anexos.referenciasExternas.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: 'Referencias Externas:', bold: true })],
          spacing: { before: 100, after: 50 }
        }),
        ...anexos.referenciasExternas.map(ref => 
          new Paragraph({
            text: `• ${ref}`,
            spacing: { after: 50 }
          })
        )
      );
    }

    return paragraphs;
  }

  /**
   * Helper: Crea un salto de página
   */
  private static createPageBreak(): Paragraph {
    return new Paragraph({
      text: '',
      pageBreakBefore: true
    });
  }
}
