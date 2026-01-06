import React from 'react';
import { Card, Timeline, Typography, Tag, Space, Avatar, Empty } from 'antd';
import { HistoryOutlined, UserOutlined, FileTextOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { HistorialItem } from '../../../types/documentacion.types';

const { Title, Text } = Typography;

// Mock data
const mockHistorial: HistorialItem[] = [
  {
    id: '1',
    accion: 'Visualizó',
    documento: 'Documentación API REST - Sistema SGAL',
    usuario: 'Juan Pérez',
    fecha: '2026-01-06 10:30',
    tipo: 'ver'
  },
  {
    id: '2',
    accion: 'Creó',
    documento: 'Guía de Componentes React',
    usuario: 'María García',
    fecha: '2026-01-05 15:45',
    tipo: 'crear'
  },
  {
    id: '3',
    accion: 'Descargó',
    documento: 'Documentación API REST - Sistema SGAL',
    usuario: 'Carlos López',
    fecha: '2026-01-05 14:20',
    tipo: 'descargar'
  },
  {
    id: '4',
    accion: 'Editó',
    documento: 'Manual de Usuario - Sistema SGAL',
    usuario: 'Juan Pérez',
    fecha: '2026-01-04 11:00',
    tipo: 'editar'
  },
  {
    id: '5',
    accion: 'Visualizó',
    documento: 'Guía de Componentes React',
    usuario: 'Ana Martínez',
    fecha: '2026-01-03 09:15',
    tipo: 'ver'
  }
];

const getColorByTipo = (tipo: string): string => {
  switch (tipo) {
    case 'crear': return 'green';
    case 'editar': return 'blue';
    case 'ver': return 'cyan';
    case 'descargar': return 'purple';
    default: return 'default';
  }
};

const Historial: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Title level={2} className="mb-2">
          <HistoryOutlined style={{ color: '#C6A75E' }} className="mr-3" />
          Historial de Actividad
        </Title>
        <Text type="secondary" className="text-base">
          Seguimiento de accesos y modificaciones recientes
        </Text>
      </div>

      <Card className="shadow-md">
        {mockHistorial.length === 0 ? (
          <Empty
            description="No hay actividad registrada"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <Timeline
            mode="left"
            items={mockHistorial.map(item => ({
              key: item.id,
              color: getColorByTipo(item.tipo),
              children: (
                <Card size="small" className="shadow-sm hover:shadow-md transition-shadow">
                  <Space direction="vertical" size="small" className="w-full">
                    <Space align="center">
                      <Avatar icon={<UserOutlined />} size="small" />
                      <Text strong>{item.usuario}</Text>
                      <Tag color={getColorByTipo(item.tipo)}>
                        {item.accion}
                      </Tag>
                    </Space>
                    <Space align="center">
                      <FileTextOutlined />
                      <Text>{item.documento}</Text>
                    </Space>
                    <Text type="secondary" className="text-xs">
                      <ClockCircleOutlined className="mr-1" />
                      {new Date(item.fecha).toLocaleString('es-AR')}
                    </Text>
                  </Space>
                </Card>
              )
            }))}
          />
        )}
      </Card>
    </div>
  );
};

export default Historial;
