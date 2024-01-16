import React from 'react';

// Определение интерфейса для сущности
interface Entity {
    id: number;
    name: string;
    owner: number;
    // Дополнительные свойства, если необходимо
}
const Escencies_table: React.FC<{ entities: Entity[] }> = ({ entities }) => (
    
        <div>
            <h2>Таблица сущностей</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        {/* Дополнительные колонки, если необходимо */}
                    </tr>
                </thead>
                <tbody>
                    {entities.map((entity) => (
                        <tr key={entity.id}>
                            <td>{entity.id}</td>
                            <td>{entity.name}</td>
                            {/* Дополнительные ячейки, если необходимо */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
);

export default Escencies_table;
