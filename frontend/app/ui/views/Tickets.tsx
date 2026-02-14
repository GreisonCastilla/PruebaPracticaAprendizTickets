'use client';
import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { getTickets } from '../../services/tickets'
import Select from '../Select';
import Button from '../Button';
import { IoMdRefresh } from "react-icons/io";

import TicketStatus from '../tickets/TicketStatus';
import TicketPriority from '../tickets/TicketPriority';
import TicketCategory from '../tickets/TicketCategory';
import Popup from '../popups/Popup';
import TicketDetail from '../popups/TicketDetail';
import { getAllTickets, changeTicketState, changeTicketPriority } from '../../services/tickets';
import { showToast } from "nextjs-toast-notify";

interface props{
    refreshTrigger?: number;
    isAdmin?: boolean;
}

export default function Tickets({refreshTrigger = 0, isAdmin = false}: props){
    const [ticketsData, setTicketsData] = useState<any[]>([]);
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [state, setState] = useState('');
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [detailOpen, setDetailOpen] = useState(false);

    const fetchData = async () => {
        try {
            const data = isAdmin 
                ? await getAllTickets(priority, state, category)
                : await getTickets(priority, state, category);
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

    const handleViewDetail = (ticket: any) => {
        setSelectedTicket(ticket);
        setDetailOpen(true);
    };

    const handleStateChange = async (ticketId: number, newState: string) => {
        try {
            await changeTicketState(ticketId, Number(newState));
            showToast.success("Estado actualizado correctamente", { position: "top-right" });
            fetchData();
        } catch (error) {
            console.error(error);
            showToast.error("Error al actualizar el estado", { position: "top-right" });
        }
    };

    const handlePriorityChange = async (ticketId: number, newPriority: string) => {
        try {
            await changeTicketPriority(ticketId, Number(newPriority));
            showToast.success("Prioridad actualizada correctamente", { position: "top-right" });
            fetchData();
        } catch (error) {
            console.error(error);
            showToast.error("Error al actualizar la prioridad", { position: "top-right" });
        }
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
        <div className="flex flex-col gap-4 border-t-2 bg-slate-800 border-slate-500 p-4">
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
                        <Th className="p-2 border">Creación</Th>
                        <Th className="p-2 border">Actualización</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ticketsData && ticketsData.length > 0 ? (
                        ticketsData.map((ticket: any) => (
                            <Tr onClick={() => handleViewDetail(ticket)} key={ticket.id} className="hover:bg-slate-700 border text-white transition-colors cursor-pointer">
                                <Td className="p-2 border">{ticket.title}</Td>
                                <Td className="p-2 border max-w-xs truncate" title={ticket.description}>{ticket.description}</Td>
                                <Td className="p-2 border">
                                    <TicketCategory category={ticket.category} />
                                </Td>
                                <Td className="p-2 border">
                                    {isAdmin ? (
                                        <select 
                                            value={ticket.priority} 
                                            onChange={(e) => handlePriorityChange(ticket.id, e.target.value)}
                                            className="bg-slate-700 text-white p-1 rounded border border-slate-500 text-xs w-full"
                                        >
                                            {priorityOptions.filter(o => o.value !== '').map(o => (
                                                <option key={o.value} value={o.value}>{o.label}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <TicketPriority priority={ticket.priority} />
                                    )}
                                </Td>
                                <Td className="p-2 border flex justify-center">
                                    {isAdmin ? (
                                        <select 
                                            value={ticket.state} 
                                            onChange={(e) => handleStateChange(ticket.id, e.target.value)}
                                            className="bg-slate-700 text-white p-1 rounded border border-slate-500 text-xs w-full"
                                        >
                                            {stateOptions.filter(o => o.value !== '').map(o => (
                                                <option key={o.value} value={o.value}>{o.label}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <TicketStatus state={ticket.state} />
                                    )}
                                </Td>
                                <Td className="p-2 border">{new Date(ticket.created_at).toLocaleDateString()}</Td>
                                <Td className="p-2 border">{new Date(ticket.updated_at).toLocaleDateString()}</Td>
                                
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan={8} className="p-4 text-center text-white">No se encontraron tickets.</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>

            <Popup
                title="Detalle del Ticket"
                isOpen={detailOpen}
                onClose={() => setDetailOpen(false)}
            >
                {selectedTicket && <TicketDetail ticket={selectedTicket} onCommentAdded={fetchData} />}
            </Popup>
        </div>
    )
}