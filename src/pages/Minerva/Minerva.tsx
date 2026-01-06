import React, { useState } from 'react';
import { Layout, Menu, Typography, theme } from 'antd';
import {
  FileAddOutlined,
  FolderOpenOutlined,
  HistoryOutlined,
  MoonOutlined
} from '@ant-design/icons';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import NuevaDocumentacion from './components/NuevaDocumentacion';
import VerDocumentaciones from './components/VerDocumentaciones';
import Historial from './components/Historial';

const { Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

const menuItems: MenuItem[] = [
  {
    key: 'nueva',
    icon: <FileAddOutlined />,
    label: 'Nueva Documentación'
  },
  {
    key: 'ver',
    icon: <FolderOpenOutlined />,
    label: 'Ver Documentaciones'
  },
  {
    key: 'historial',
    icon: <HistoryOutlined />,
    label: 'Historial'
  }
];

const Minerva: React.FC = () => {
  useDocumentTitle('Minerva - Automatización de Documentación');
  const [selectedMenu, setSelectedMenu] = useState<string>('nueva');
  const { token } = theme.useToken();

  const renderContent = (): React.ReactNode => {
    switch (selectedMenu) {
      case 'nueva':
        return <NuevaDocumentacion />;
      case 'ver':
        return <VerDocumentaciones />;
      case 'historial':
        return <Historial />;
      default:
        return <NuevaDocumentacion />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        width={260}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorder}`
        }}
      >
        <div style={{ padding: '24px 16px' }}>
          <Title level={3} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MoonOutlined style={{ color: '#C6A75E' }} />
            Minerva
          </Title>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Automatización de Documentación
          </Typography.Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={({ key }) => setSelectedMenu(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>

      {/* Content */}
      <Layout>
        <Content style={{ padding: 24, background: token.colorBgLayout }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Minerva;
