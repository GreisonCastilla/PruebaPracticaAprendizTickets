'use client';
import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { getTickets } from '../../services/tickets'
import Select from '../Select';
import Button from '../Button';
import { IoMdRefresh } from "react-icons/io";

interface props{
    refreshTrigger?: number;
}

export default function Tickets({refreshTrigger = 0}: props){
    const [ticketsData, setTicketsData] = useState<any[]>([]);
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [state, setState] = useState('');

    const fetchData = async () => {
        try {
            const data = await getTickets(priority, state, category);
            setTicketsData(data);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [priority, category, state, refreshTrigger]);

    const handleRefresh = () => {
        fetchData();
    };

    // Placeholder options - these should ideally come from an API or constant file
    const priorityOptions = [
        { value: '', label: 'Todos' },
        { value: '1', label: 'Muy Baja' },
        { value: '2', label: 'Baja' },
        { value: '3', label: 'Moderada' },
        { value: '4', label: 'Alta' },
        { value: '5', label: 'Muy Alta' }
    ];

    const categoryOptions = [
        { value: '', label: 'Todos' },
        { value: '1', label: 'Soporte' },
        { value: '2', label: 'Facturación' },
        { value: '3', label: 'Ventas' },
        { value: '4', label: 'Reclamos' },
        { value: '5', label: 'Consultas' },
        { value: '6', label: 'Técnico' }
    ];

    const stateOptions = [
        { value: '', label: 'Todos' },
        { value: '1', label: 'Enviado' },
        { value: '2', label: 'En Revisión' },
        { value: '3', label: 'Cerrado' }
    ];

    return(
        <div className="flex flex-col gap-4 border-t-2 border-slate-500 p-4">
            <span className="text-white font-extralight text-xl">Tickets</span>

            <div className="flex gap-4 items-end flex-wrap">
                <Select 
                    name="priority" 
                    description="Prioridad" 
                    options={priorityOptions} 
                    value={priority} 
                    onChange={setPriority} 
                />
                <Select 
                    name="category" 
                    description="Categoría" 
                    options={categoryOptions} 
                    value={category} 
                    onChange={setCategory} 
                />
                <Select 
                    name="state" 
                    description="Estado" 
                    options={stateOptions} 
                    value={state} 
                    onChange={setState} 
                />
                <Button 
                    action="Refrescar" 
                    Icon={IoMdRefresh} 
                    onClick={handleRefresh} 
                />
            </div>

            <Table>
                <Thead>
                    <Tr className="bg-slate-500 text-white">
                        <Th className="p-2 border">Titulo</Th>
                        <Th className="p-2 border">Descripción</Th>
                        <Th className="p-2 border">Categoría</Th>
                        <Th className="p-2 border">Prioridad</Th>
                        <Th className="p-2 border">Estado</Th>
                        <Th className="p-2 border">Fecha de creación</Th>
                        <Th className="p-2 border">Fecha de actualización</Th>
                        <Th className="p-2 border">Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ticketsData && ticketsData.length > 0 ? (
                        ticketsData.map((ticket: any) => (
                            <Tr key={ticket.id} className="hover:bg-slate-700 border text-white transition-colors">
                                <Td className="p-2 border">{ticket.title}</Td>
                                <Td className="p-2 border max-w-xs truncate" title={ticket.description}>{ticket.description}</Td>
                                <Td className="p-2 border">{ticket.category}</Td>
                                <Td className="p-2 border">{ticket.priority}</Td>
                                <Td className="p-2 border">{ticket.state}</Td>
                                <Td className="p-2 border">{new Date(ticket.created_at).toLocaleDateString()}</Td>
                                <Td className="p-2 border">{new Date(ticket.updated_at).toLocaleDateString()}</Td>
                                <Td className="p-2 border">
                                    {/* Add actions here later, e.g., Edit/Delete */}
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">Ver</button>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan={8} className="p-4 text-center text-white">No se encontraron tickets.</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </div>
    )
}