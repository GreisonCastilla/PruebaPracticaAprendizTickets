import { getAuthHeaders } from "./auth";

export async function createComment(title: string, description: string, ticketId: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comentarios/`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            title,
            description,
            ticket: ticketId,
        }),
    });

    if (!response.ok) {
        throw new Error("Error al crear el comentario");
    }

    return response.json();
}
