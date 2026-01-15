import React, { useState } from 'react';
import { Card, List, Input, Tag, Space, Typography, Button, Empty, message } from 'antd';
import { SearchOutlined, FileTextOutlined, EyeOutlined, DownloadOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { Documentacion } from '../../../types/documentacion.types';
import { documentacionEjemplo } from '../../../data/ejemploDocumentacion';
import { DocxGeneratorService } from '../../../services/docxGenerator.service';
import VisorDocumentacion from './VisorDocumentacion';

const { Title, Text } = Typography;
const { Search } = Input;

// Mock data
const mockDocs: Documentacion[] = [
    {
    id: '1',
    titulo: 'Sistema Conceptual (SC)',
    descripcion: 'Documentación conceptual del Sistema Conceptual con ejemplos de cálculo de plazos y módulos administrativos',
    fecha: '2026-01-06',
    archivos: 12,
    tags: ['SC', 'Gestión', 'Plazos', 'TypeScript'],
    autor: 'Juan Pérez',
    contenido: documentacionEjemplo
  },
  {
    id: '2',
    titulo: 'Guía de Componentes React',
    descripcion: 'Componentes reutilizables con ejemplos y props',
    fecha: '2026-01-03',
    archivos: 8,
    tags: ['React', 'Frontend', 'UI'],
    autor: 'María García'
  },
  {
    id: '3',
    titulo: 'Manual de Usuario - Sistema Conceptual (SC)',
    descripcion: 'Guía completa para usuarios finales del Sistema Conceptual',
    fecha: '2026-01-02',
    archivos: 15,
    tags: ['Manual', 'Usuario', 'Guía'],
    autor: 'Carlos López'
  }
];

const VerDocumentaciones: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [docs] = useState<Documentacion[]>(mockDocs);
  const [viendoDoc, setViendoDoc] = useState<Documentacion | null>(null);

  const filteredDocs = docs.filter(doc =>
    doc.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
    doc.descripcion.toLowerCase().includes(searchText.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleVer = (doc: Documentacion) => {
    if (doc.contenido) {
      setViendoDoc(doc);
    } else {
      message.warning('Esta documentación no tiene contenido disponible');
    }
  };

  const handleDescargar = async (doc: Documentacion) => {
    if (doc.contenido) {
      try {
        message.loading({ content: 'Generando documento...', key: 'download' });
        await DocxGeneratorService.generateAndDownload(
          doc.contenido,
          `${doc.titulo.replace(/\s+/g, '_')}.docx`
        );
        message.success({ content: 'Documento descargado exitosamente', key: 'download', duration: 2 });
      } catch (error) {
        message.error({ content: 'Error al generar el documento', key: 'download', duration: 2 });
        console.error('Error:', error);
      }
    } else {
      message.warning('Esta documentación no tiene contenido disponible para descargar');
    }
  };

  // Si estamos viendo una documentación, mostrar el visor
  if (viendoDoc && viendoDoc.contenido) {
    return (
      <VisorDocumentacion
        documentacion={viendoDoc.contenido}
        nombreDocumento={viendoDoc.titulo}
        onVolver={() => setViendoDoc(null)}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Title level={2} className="mb-2">
          <FileTextOutlined style={{ color: '#C6A75E' }} className="mr-3" />
          Documentaciones Guardadas
        </Title>
        <Text type="secondary" className="text-base">
          Explorá y gestioná todas las documentaciones generadas
        </Text>
      </div>

      <Space direction="vertical" size="large" className="w-full">
        {/* Search */}
        <Card className="shadow-md">
          <Search
            placeholder="Buscar por título, descripción o tags..."
            allowClear
            size="large"
            prefix={<SearchOutlined style={{ color: '#C6A75E' }} />}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Card>

        {/* Lista de documentaciones */}
        <Card className="shadow-md">
          {filteredDocs.length === 0 ? (
            <Empty
              description="No se encontraron documentaciones"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={filteredDocs}
              renderItem={(doc) => (
                <List.Item
                  key={doc.id}
                  actions={[
                    <Button 
                      icon={<EyeOutlined style={{ color: '#C6A75E' }} />} 
                      type="link" 
                      key="view"
                      onClick={() => handleVer(doc)}
                      disabled={!doc.contenido}
                    >
                      Ver
                    </Button>,
                    <Button 
                      icon={<DownloadOutlined style={{ color: '#C6A75E' }} />} 
                      type="link" 
                      key="download"
                      onClick={() => handleDescargar(doc)}
                      disabled={!doc.contenido}
                    >
                      Descargar
                    </Button>
                  ]}
                  extra={
                    <Space direction="vertical" align="end">
                      <Text type="secondary">
                        <ClockCircleOutlined style={{ color: '#C6A75E' }} className="mr-1" />
                        {new Date(doc.fecha).toLocaleDateString('es-AR')}
                      </Text>
                      <Text type="secondary" className="text-xs">
                        {doc.archivos} archivos
                      </Text>
                    </Space>
                  }
                >
                  <List.Item.Meta
                    title={<Text strong className="text-lg">{doc.titulo}</Text>}
                    description={
                      <Space direction="vertical" size="small" className="w-full">
                        <Text type="secondary">{doc.descripcion}</Text>
                        <Space size="small" wrap>
                          {doc.tags.map(tag => (
                            <Tag key={tag} color="blue">{tag}</Tag>
                          ))}
                        </Space>
                        <Text type="secondary" className="text-xs">
                          Creado por: {doc.autor}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      </Space>
    </div>
  );
};

export default VerDocumentaciones;
