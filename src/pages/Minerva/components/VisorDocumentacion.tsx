import React from 'react';
import { Card, Typography, Button, Space, Descriptions, Tag, Divider, Timeline, List, message } from 'antd';
import { DownloadOutlined, ArrowLeftOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { DocumentacionProyecto } from '../../../types/documentacion.types';
import { DocxGeneratorService } from '../../../services/docxGenerator.service';

const { Title, Text, Paragraph } = Typography;

interface VisorDocumentacionProps {
  documentacion: DocumentacionProyecto;
  nombreDocumento: string;
  onVolver: () => void;
}

const VisorDocumentacion: React.FC<VisorDocumentacionProps> = ({ 
  documentacion, 
  nombreDocumento,
  onVolver 
}) => {
  const handleDescargar = async () => {
    try {
      message.loading({ content: 'Generando documento...', key: 'download' });
      await DocxGeneratorService.generateAndDownload(
        documentacion, 
        `${nombreDocumento.replace(/\s+/g, '_')}.docx`
      );
      message.success({ content: 'Documento descargado exitosamente', key: 'download', duration: 2 });
    } catch (error) {
      message.error({ content: 'Error al generar el documento', key: 'download', duration: 2 });
      console.error('Error generando documento:', error);
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'En producción': return 'green';
      case 'En testing': return 'blue';
      case 'En desarrollo': return 'orange';
      case 'En diseño': return 'purple';
      default: return 'default';
    }
  };

  const getEstadoPruebaIcon = (estado: string) => {
    switch (estado) {
      case 'Pasó': return <CheckCircleOutlined style={{ color: '#3A7D44' }} />;
      case 'Falló': return <CloseCircleOutlined style={{ color: '#991B1B' }} />;
      default: return <ClockCircleOutlined style={{ color: '#B45309' }} />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header con acciones */}
      <div className="mb-6">
        <Space size="large" className="w-full" style={{ justifyContent: 'space-between' }}>
          <Button 
            icon={<ArrowLeftOutlined style={{ color: '#C6A75E' }} />} 
            onClick={onVolver}
            size="large"
          >
            Volver
          </Button>
          <Button 
            type="primary" 
            icon={<DownloadOutlined style={{ color: '#fff' }} />} 
            onClick={handleDescargar}
            size="large"
          >
            Descargar .docx
          </Button>
        </Space>
      </div>

      <Space direction="vertical" size="large" className="w-full">
        {/* Portada */}
        <Card className="shadow-md">
          <Title level={2}>{documentacion.portada.proyecto}</Title>
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Código/ID">{documentacion.portada.codigoId}</Descriptions.Item>
            <Descriptions.Item label="Estado Actual">
              <Tag color={getEstadoColor(documentacion.portada.estadoActual)}>
                {documentacion.portada.estadoActual}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Iteración">{documentacion.portada.iteracionActual}</Descriptions.Item>
            <Descriptions.Item label="Última Actualización">{documentacion.portada.fechaUltimaActualizacion}</Descriptions.Item>
            <Descriptions.Item label="Responsable Técnico">{documentacion.portada.responsableTecnico}</Descriptions.Item>
            <Descriptions.Item label="Responsable Funcional">{documentacion.portada.responsableFuncional}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* TL;DR Ejecutivo */}
        <Card title="📋 TL;DR Ejecutivo" className="shadow-md">
          <Space direction="vertical" size="middle" className="w-full">
            <div>
              <Text strong>Objetivo del Proyecto:</Text>
              <Paragraph className="mt-1">{documentacion.tldrEjecutivo.objetivoProyecto}</Paragraph>
            </div>
            <div>
              <Text strong>Qué se resolvió en esta iteración:</Text>
              <Paragraph className="mt-1">{documentacion.tldrEjecutivo.queSeResolvioEnEstaIteracion}</Paragraph>
            </div>
            <div>
              <Text strong>Qué NO se tocó:</Text>
              <Paragraph className="mt-1">{documentacion.tldrEjecutivo.queNoSeToco}</Paragraph>
            </div>
            <div>
              <Text strong>Riesgos abiertos:</Text>
              <List
                size="small"
                dataSource={documentacion.tldrEjecutivo.riesgosAbiertos}
                renderItem={item => (
                  <List.Item>
                    <Text type="danger">⚠️ {item}</Text>
                  </List.Item>
                )}
              />
            </div>
            <div>
              <Text strong>Próximo paso:</Text>
              <Paragraph className="mt-1">{documentacion.tldrEjecutivo.proximoPaso}</Paragraph>
            </div>
          </Space>
        </Card>

        {/* Alcance */}
        <Card title="🎯 Alcance del Proyecto" className="shadow-md">
          <Space direction="vertical" size="middle" className="w-full">
            <div>
              <Text strong>Funcionalidades Incluidas:</Text>
              <List
                size="small"
                dataSource={documentacion.alcanceProyecto.funcionalidadesIncluidas}
                renderItem={item => (
                  <List.Item>
                    <Text>✅ {item}</Text>
                  </List.Item>
                )}
              />
            </div>
            <div>
              <Text strong>Funcionalidades Excluidas:</Text>
              <List
                size="small"
                dataSource={documentacion.alcanceProyecto.funcionalidadesExcluidas}
                renderItem={item => (
                  <List.Item>
                    <Text type="secondary">❌ {item}</Text>
                  </List.Item>
                )}
              />
            </div>
          </Space>
        </Card>

        {/* Historial de Iteraciones */}
        <Card title="📅 Historial de Iteraciones" className="shadow-md">
          <Timeline
            items={documentacion.historialIteraciones.map(iter => ({
              color: 'blue',
              children: (
                <div>
                  <Text strong>{iter.iteracion}</Text> - <Text type="secondary">{iter.fecha}</Text>
                  <Paragraph className="mt-1 mb-0">
                    <Text strong>Cambio:</Text> {iter.queCambio}<br/>
                    <Text strong>Motivo:</Text> {iter.motivo}<br/>
                    <Text strong>Impacto:</Text> {iter.impacto}
                  </Paragraph>
                </div>
              )
            }))}
          />
        </Card>

        {/* Requerimientos Funcionales */}
        <Card title="📝 Requerimientos Funcionales" className="shadow-md">
          <Space direction="vertical" size="large" className="w-full">
            {documentacion.requerimientosFuncionales.map(req => (
              <Card key={req.id} type="inner" size="small">
                <Title level={5}>{req.id} – {req.nombre}</Title>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Descripción">{req.descripcion}</Descriptions.Item>
                  <Descriptions.Item label="Actor">{req.actor}</Descriptions.Item>
                  <Descriptions.Item label="Resultado Esperado">{req.resultadoEsperado}</Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '12px 0' }} />
                <Text strong>Flujo Principal:</Text>
                <List
                  size="small"
                  dataSource={req.flujoPrincipal}
                  renderItem={(paso, idx) => (
                    <List.Item>
                      <Text>{idx + 1}. {paso}</Text>
                    </List.Item>
                  )}
                />
              </Card>
            ))}
          </Space>
        </Card>

        {/* Requerimientos No Funcionales */}
        <Card title="⚙️ Requerimientos No Funcionales" className="shadow-md">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Performance">{documentacion.requerimientosNoFuncionales.performance}</Descriptions.Item>
            <Descriptions.Item label="Seguridad">{documentacion.requerimientosNoFuncionales.seguridad}</Descriptions.Item>
            <Descriptions.Item label="Disponibilidad">{documentacion.requerimientosNoFuncionales.disponibilidad}</Descriptions.Item>
            <Descriptions.Item label="Escalabilidad">{documentacion.requerimientosNoFuncionales.escalabilidad}</Descriptions.Item>
            <Descriptions.Item label="Compatibilidad">{documentacion.requerimientosNoFuncionales.compatibilidad}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Diseño Técnico */}
        <Card title="🏗️ Diseño Técnico" className="shadow-md">
          <Space direction="vertical" size="middle" className="w-full">
            <div>
              <Text strong>Stack Tecnológico:</Text>
              <div style={{ marginTop: 8 }}>
                {documentacion.disenoTecnico.arquitecturaGeneral.stack.map(tech => (
                  <Tag key={tech} color="blue" style={{ marginBottom: 8 }}>{tech}</Tag>
                ))}
              </div>
            </div>
            <div>
              <Text strong>Servicios:</Text>
              <List
                size="small"
                dataSource={documentacion.disenoTecnico.arquitecturaGeneral.servicios}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </div>
            <div>
              <Text strong>Integraciones Externas:</Text>
              <List
                size="small"
                dataSource={documentacion.disenoTecnico.arquitecturaGeneral.integracionesExternas}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </div>
          </Space>
        </Card>

        {/* Testing y Validación */}
        <Card title="🧪 Testing y Validación" className="shadow-md">
          <Space direction="vertical" size="middle" className="w-full">
            <div>
              <Text strong>Casos Críticos:</Text>
              <List
                size="small"
                dataSource={documentacion.testingValidacion.casosCriticos}
                renderItem={caso => (
                  <List.Item>
                    {getEstadoPruebaIcon(caso.estado)} <Text className="ml-2">{caso.caso}</Text>
                  </List.Item>
                )}
              />
            </div>
            <div>
              <Text strong>Casos Borde:</Text>
              <List
                size="small"
                dataSource={documentacion.testingValidacion.casosBorde}
                renderItem={caso => (
                  <List.Item>
                    {getEstadoPruebaIcon(caso.estado)} <Text className="ml-2">{caso.caso}</Text>
                  </List.Item>
                )}
              />
            </div>
          </Space>
        </Card>

        {/* Riesgos y Deuda Técnica */}
        <Card title="⚠️ Riesgos y Deuda Técnica" className="shadow-md" style={{ borderColor: '#B45309' }}>
          <Space direction="vertical" size="middle" className="w-full">
            <div>
              <Text strong>Riesgos Actuales:</Text>
              <List
                size="small"
                dataSource={documentacion.riesgosSupuestos.riesgosActuales}
                renderItem={item => (
                  <List.Item>
                    <Text type="danger">🔴 {item}</Text>
                  </List.Item>
                )}
              />
            </div>
            <div>
              <Text strong>Supuestos Tomados:</Text>
              <List
                size="small"
                dataSource={documentacion.riesgosSupuestos.supuestosTomados}
                renderItem={item => (
                  <List.Item>
                    <Text type="secondary">💭 {item}</Text>
                  </List.Item>
                )}
              />
            </div>
            <div>
              <Text strong>Deuda Técnica Conocida:</Text>
              <List
                size="small"
                dataSource={documentacion.riesgosSupuestos.deudaTecnicaConocida}
                renderItem={item => (
                  <List.Item>
                    <Text type="warning">⚡ {item}</Text>
                  </List.Item>
                )}
              />
            </div>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default VisorDocumentacion;
