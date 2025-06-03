import React, { useState } from 'react';
import UserManagement from '../components/UserManagement';
import DataManagement from '../components/DataManagement';
import BackupAndExport from '../components/BackupAndExport';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'data' | 'backup'>('users');

  return (
    <div style={{ padding: 20 }}>
      <h1>Адмінпанель</h1>
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => setActiveTab('users')}>Користувачі</button>
        <button onClick={() => setActiveTab('data')}>Дані</button>
        <button onClick={() => setActiveTab('backup')}>Резерв / Імпорт / Експорт</button>
      </nav>

      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'data' && <DataManagement />}
      {activeTab === 'backup' && <BackupAndExport />}
    </div>
  );
}