import React from 'react';

// ����������� ���������� ��� ��������
interface Entity {
    id: number;
    name: string;
    owner: number;
    // �������������� ��������, ���� ����������
}
const Escencies_table: React.FC<{ entities: Entity[] }> = ({ entities }) => (
    
        <div>
            <h2>������� ���������</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>��������</th>
                        {/* �������������� �������, ���� ���������� */}
                    </tr>
                </thead>
                <tbody>
                    {entities.map((entity) => (
                        <tr key={entity.id}>
                            <td>{entity.id}</td>
                            <td>{entity.name}</td>
                            {/* �������������� ������, ���� ���������� */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
);

export default Escencies_table;
