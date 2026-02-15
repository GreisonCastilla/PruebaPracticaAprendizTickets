'use client';

import { useEffect, useState } from 'react';
import TicketStatus from '../tickets/TicketStatus';
import TicketPriority from '../tickets/TicketPriority';
import TicketCategory from '../tickets/TicketCategory';
import { createComment } from '../../services/coments';
import { showToast } from "nextjs-toast-notify";

import { changeTicketState, changeTicketPriority, getComments } from '../../services/tickets';

interface Comment {
    id: number;
    title: string;
    description: string;
    created_at: string;
}

interface Props {
    ticket: any;
    isAdmin?: boolean;
    onCommentAdded?: () => void;
}

export default function TicketDetail({ ticket, isAdmin = false, onCommentAdded }: Props) {
    const [comments, setComments] = useState<Comment[]>(ticket.comentarios || []);
    const [loading, setLoading] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentState, setCurrentState] = useState(ticket.state);
    const [currentPriority, setCurrentPriority] = useState(ticket.priority);

    const fetchComments = async () => {
        if (!ticket?.id) return;
        setLoading(true);
        try {
            const data = await getComments(ticket.id);
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCurrentState(ticket.state);
        setCurrentPriority(ticket.priority);
        if (!ticket.comentarios || ticket.comentarios.length === 0) {
            fetchComments();
        }
    }, [ticket.id, ticket.state, ticket.priority]);

    const handleStateChange = async (newState: string) => {
        try {
            await changeTicketState(ticket.id, Number(newState));
            setCurrentState(Number(newState));
            showToast.success("Estado actualizado", { position: "top-right" });
            if(onCommentAdded) onCommentAdded();
        } catch (error) {
            console.error(error);
            showToast.error("Error al actualizar estado", { position: "top-right" });
        }
    };

    const handlePriorityChange = async (newPriority: string) => {
        try {
            await changeTicketPriority(ticket.id, Number(newPriority));
            setCurrentPriority(Number(newPriority));
            showToast.success("Prioridad actualizada", { position: "top-right" });
            if(onCommentAdded) onCommentAdded();
        } catch (error) {
            console.error(error);
            showToast.error("Error al actualizar prioridad", { position: "top-right" });
        }
    };

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!newTitle || !newDesc) return;

        setIsSubmitting(true);
        try {
            const data = await createComment(newTitle, newDesc, ticket.id);
            setComments(prev => [...prev, data]);
            setNewTitle('');
            setNewDesc('');
            showToast.success("Comentario agregado", { position: "top-right" });
            if(onCommentAdded) onCommentAdded();
        } catch (error) {
            console.error(error);
            showToast.error("Error al agregar comentario", { position: "top-right" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const priorityOptions = [
        { value: '1', label: 'Muy Baja' },
        { value: '2', label: 'Baja' },
        { value: '3', label: 'Moderada' },
        { value: '4', label: 'Alta' },
        { value: '5', label: 'Muy Alta' }
    ];

    const stateOptions = [
        { value: '1', label: 'Enviado' },
        { value: '2', label: 'En Revisión' },
        { value: '3', label: 'Cerrado' }
    ];

    return (
        <div className="flex flex-col gap-6 max-h-[70vh] mt-4 overflow-y-auto pr-2">
            {/* Ticket Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-700/50 p-4 rounded-lg">
                <div className="flex flex-col gap-1">
                    <span className="text-slate-400 text-xs uppercase font-bold">Título</span>
                    <span className="text-white text-lg">{ticket.title}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-slate-400 text-xs uppercase font-bold">Estado</span>
                    {isAdmin ? (
                        <select 
                            value={currentState} 
                            onChange={(e) => handleStateChange(e.target.value)}
                            className="bg-slate-700 text-white p-2 rounded border border-slate-500 text-sm"
                        >
                            {stateOptions.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    ) : (
                        <TicketStatus state={currentState} />
                    )}
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                    <span className="text-slate-400 text-xs uppercase font-bold">Descripción</span>
                    <p className="text-white whitespace-pre-wrap">{ticket.description}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-slate-400 text-xs uppercase font-bold">Categoría</span>
                    <TicketCategory category={ticket.category} />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-slate-400 text-xs uppercase font-bold">Prioridad</span>
                    {isAdmin ? (
                        <select 
                            value={currentPriority} 
                            onChange={(e) => handlePriorityChange(e.target.value)}
                            className="bg-slate-700 text-white p-2 rounded border border-slate-500 text-sm"
                        >
                            {priorityOptions.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    ) : (
                        <TicketPriority priority={currentPriority} />
                    )}
                </div>
                <div className="flex flex-col gap-1 text-xs text-slate-400">
                    <span>Creado: {new Date(ticket.created_at).toLocaleString()}</span>
                    <span>Actualizado: {new Date(ticket.updated_at).toLocaleString()}</span>
                </div>
            </div>

            {/* Comments Section */}
            <div className="flex flex-col gap-4">
                <span className="text-white font-bold text-xl border-b border-slate-500 pb-2">Comentarios</span>
                
                {loading ? (
                    <span className="text-slate-400 italic">Cargando comentarios...</span>
                ) : comments.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {comments.map((comment: Comment) => (
                            <div key={comment.id} className="bg-slate-700 p-3 rounded-lg flex flex-col gap-1 border-l-4 border-blue-500">
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-bold">{comment.title}</span>
                                    <span className="text-slate-400 text-[10px]">{new Date(comment.created_at).toLocaleString()}</span>
                                </div>
                                <p className="text-slate-200 text-sm italic">{comment.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <span className="text-slate-400 italic">No hay comentarios para este ticket.</span>
                )}
            </div>

            {/* Add Comment Form */}
            <div className="flex flex-col gap-4 border-t border-slate-500 pt-4">
                <span className="text-white font-bold text-lg">Añadir Comentario</span>
                <form onSubmit={handleAddComment} className="flex flex-col gap-3">
                    <input 
                        type="text" 
                        placeholder="Título del comentario" 
                        className="bg-slate-700 text-white p-2 rounded border border-slate-500 text-sm"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        required
                    />
                    <textarea 
                        placeholder="Descripción del comentario" 
                        className="bg-slate-700 text-white p-2 rounded border border-slate-500 text-sm min-h-[80px]"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        required
                    />
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm self-end"
                    >
                        {isSubmitting ? "Enviando..." : "Publicar Comentario"}
                    </button>
                </form>
            </div>
        </div>
    );
}
