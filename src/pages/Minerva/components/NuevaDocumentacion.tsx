import React, { useState } from 'react';
import { Card, Upload, Button, Space, Typography, Alert, Progress, message } from 'antd';
import { InboxOutlined, FileTextOutlined, CloudUploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { ArchivoSubido } from '../../../types/documentacion.types';
import { documentacionEjemplo } from '../../../data/ejemploDocumentacion';
import VisorDocumentacion from './VisorDocumentacion';

const { Dragger } = Upload;
const { Title, Text, Paragraph } = Typography;

const NuevaDocumentacion: React.FC = () => {
  const [files, setFiles] = useState<ArchivoSubido[]>([]);
  const [processing, setProcessing] = useState(false);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [verDocumentacion, setVerDocumentacion] = useState(false);

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    accept: '.pdf,.doc,.docx,.txt,.md,.js,.ts,.jsx,.tsx,.py,.java,.cs,.cpp',
    beforeUpload: (file) => {
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        message.error(`${file.name} debe ser menor a 50MB`);
        return Upload.LIST_IGNORE;
      }
      return false; // Prevenir upload automático
    },
    onChange: (info) => {
      const newFiles: ArchivoSubido[] = info.fileList.map(f => ({
        uid: f.uid,
        name: f.name,
        size: f.size || 0,
        type: f.type || '',
        progress: 0,
        status: 'pending'
      }));
      setFiles(newFiles);
    },
    onDrop: (e) => {
      console.log('Archivos arrastrados', e.dataTransfer.files);
    }
  };

  const processFiles = async (): Promise<void> => {
    if (files.length === 0) {
      message.warning('No hay archivos para procesar');
      return;
    }

    setProcessing(true);
    setGlobalProgress(0);

    // Simular procesamiento OCR + IA
    // TODO: Integrar con API real
    for (let i = 0; i < files.length; i++) {
      setFiles(prev => prev.map((f, idx) => 
        idx === i ? { ...f, status: 'processing' } : f
      ));

      // Simular progreso de extracción
      for (let p = 0; p <= 100; p += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setFiles(prev => prev.map((f, idx) => 
          idx === i ? { ...f, progress: p } : f
        ));
        setGlobalProgress(((i * 100) + p) / files.length);
      }

      setFiles(prev => prev.map((f, idx) => 
        idx === i ? { ...f, status: 'completed', content: `Contenido extraído de ${f.name}` } : f
      ));
    }

    setProcessing(false);
    message.success('Todos los archivos fueron procesados exitosamente');
  };

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);
  const completedFiles = files.filter(f => f.status === 'completed').length;

  // Si se está viendo la documentación, mostrar el visor
  if (verDocumentacion) {
    return (
      <VisorDocumentacion
        documentacion={documentacionEjemplo}
        nombreDocumento="Documentación Generada - Sistema Conceptual (SC)"
        onVolver={() => setVerDocumentacion(false)}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Title level={2} className="mb-2">
          <FileTextOutlined style={{ color: '#C6A75E' }} className="mr-3" />
          Nueva Documentación
        </Title>
        <Text type="secondary" className="text-base">
          Subí tus archivos y generá documentación automáticamente usando IA
        </Text>
      </div>

      <Space direction="vertical" size="large" className="w-full">
        {/* Dropzone */}
        <Card className="shadow-md">
          <Dragger {...uploadProps} disabled={processing}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: 64, color: '#C6A75E' }} />
            </p>
            <p className="ant-upload-text" style={{ fontSize: 18 }}>
              Hacé clic o arrastrá archivos aquí
            </p>
            <p className="ant-upload-hint" style={{ fontSize: 14 }}>
              Soporta PDF, DOC, DOCX, TXT, MD y archivos de código. Máximo 50MB por archivo.
            </p>
          </Dragger>

          {files.length > 0 && (
            <div className="mt-4">
              <Alert
                message={`${files.length} archivo(s) seleccionado(s) - ${(totalSize / 1024 / 1024).toFixed(2)} MB`}
                type="info"
                showIcon
                className="mb-3"
              />
              
              {processing && (
                <div className="mb-3">
                  <Text>Procesando archivos con OCR e IA...</Text>
                  <Progress percent={Math.round(globalProgress)} status="active" />
                </div>
              )}

              <div className="space-y-2">
                {files.map((file) => (
                  <Card 
                    key={file.uid} 
                    size="small"
                    className={`${file.status === 'completed' ? 'bg-green-50 border-green-200' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Text strong>{file.name}</Text>
                        <Text type="secondary" className="ml-2 text-xs">
                          ({(file.size / 1024).toFixed(2)} KB)
                        </Text>
                        {file.status === 'processing' && (
                          <Progress 
                            percent={file.progress} 
                            size="small" 
                            className="mt-1"
                            status="active"
                          />
                        )}
                        {file.status === 'completed' && (
                          <Text type="success" className="block mt-1 text-xs">
                            ✓ Contenido extraído exitosamente
                          </Text>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button
                type="primary"
                size="large"
                icon={<CloudUploadOutlined />}
                onClick={processFiles}
                loading={processing}
                disabled={processing}
                className="mt-4 w-full"
              >
                {processing ? 'Procesando...' : 'Procesar con OCR e IA'}
              </Button>
            </div>
          )}
        </Card>

        {/* Resultados */}
        {completedFiles > 0 && !processing && (
          <Card className="shadow-md bg-blue-50 border-blue-200">
            <Title level={4}>📄 Documentación Generada</Title>
            <Paragraph>
              Se procesaron exitosamente {completedFiles} archivo(s). 
              La IA generó la documentación estructurada en base al contenido extraído.
            </Paragraph>
            <Button 
              type="primary" 
              size="large"
              onClick={() => setVerDocumentacion(true)}
            >
              Ver Documentación Generada
            </Button>
          </Card>
        )}

        {/* Info */}
        <Card className="bg-gray-50 border-gray-200">
          <Space direction="vertical" size="small">
            <Text strong>💡 ¿Cómo funciona?</Text>
            <Paragraph className="mb-0 text-sm" type="secondary">
              1. Subís tus archivos (código, documentos, especificaciones)<br />
              2. Minerva usa OCR para extraer el texto de documentos<br />
              3. La IA analiza el contenido y genera documentación estructurada<br />
              4. Podés revisar, editar y exportar la documentación en formato .docx
            </Paragraph>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default NuevaDocumentacion;
