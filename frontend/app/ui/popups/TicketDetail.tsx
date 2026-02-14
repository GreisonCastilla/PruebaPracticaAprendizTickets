'use client';

import { useState } from 'react';
import TicketStatus from '../tickets/TicketStatus';
import TicketPriority from '../tickets/TicketPriority';
import TicketCategory from '../tickets/TicketCategory';

interface Comment {
    id: number;
    title: string;
    description: string;
    created_at: string;
}

interface Props {
    ticket: any;
}

export default function TicketDetail({ ticket }: Props) {
    const comments = ticket.comentarios || [];

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
                    <TicketStatus state={ticket.state} />
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
                    <TicketPriority priority={ticket.priority} />
                </div>
                <div className="flex flex-col gap-1 text-xs text-slate-400">
                    <span>Creado: {new Date(ticket.created_at).toLocaleString()}</span>
                    <span>Actualizado: {new Date(ticket.updated_at).toLocaleString()}</span>
                </div>
            </div>

            {/* Comments Section */}
            <div className="flex flex-col gap-4">
                <span className="text-white font-bold text-xl border-b border-slate-500 pb-2">Comentarios</span>
                
                {comments.length > 0 ? (
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
        </div>
    );
}
