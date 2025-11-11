import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { colorDictionary } from '../constants/colors.js';

const PersonasList = () => {
  const [people, setPeople] = useState([]);

  const loadPeople = () => {
    const stored = JSON.parse(localStorage.getItem('personas') ?? '[]');
    setPeople(stored);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const formatDate = (value) => {
    if (!value) return '-';
    return new Date(value).toLocaleString('es-AR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  return (
    <div className="page list-page">
      <Card title="Personas Registradas" subTitle="Fuente: LocalStorage" className="list-card">
        <div className="list-actions">
          <Button label="Actualizar" icon="pi pi-refresh" outlined onClick={loadPeople} />
        </div>
        {people.length === 0 ? (
          <p className="muted">No hay personas guardadas todavía.</p>
        ) : (
          <DataTable
            value={people}
            paginator
            rows={5}
            size="small"
            className="people-table"
            dataKey="id"
            emptyMessage="Todavía no hay registros."
            responsiveLayout="scroll"
          >
            <Column field="nombre" header="Nombre" />
            <Column field="email" header="Email" />
            <Column
              field="color"
              header="Color favorito"
              body={(rowData) => colorDictionary[rowData.color] ?? rowData.color ?? '-'}
            />
            <Column header="Fecha" body={(rowData) => formatDate(rowData.createdAt)} />
          </DataTable>
        )}
      </Card>
    </div>
  );
};

export default PersonasList;
