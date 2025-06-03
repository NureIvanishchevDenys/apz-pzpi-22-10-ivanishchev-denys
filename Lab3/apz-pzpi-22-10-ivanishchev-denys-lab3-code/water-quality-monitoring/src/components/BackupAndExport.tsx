import React from 'react';

export default function BackupAndExport() {
  const downloadBackup = async () => {
    const res = await fetch('http://localhost:5000/api/backup');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup.json';
    a.click();
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    await fetch('http://localhost:5000/api/import', {
      method: 'POST',
      body: formData
    });
    alert('Імпорт завершено');
  };

  return (
    <div>
      <h2>Резервне копіювання / Імпорт / Експорт</h2>
      <button onClick={downloadBackup}>⬇Завантажити резервну копію</button>
      <div style={{ marginTop: 10 }}>
        <input type="file" onChange={handleImport} />
      </div>
    </div>
  );
}
