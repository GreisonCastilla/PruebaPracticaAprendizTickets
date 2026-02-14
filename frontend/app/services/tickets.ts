import { jwtDecode } from "jwt-decode";

const getUserId = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        return jwtDecode<{ user_id: string }>(token).user_id;
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }
  return null;
};

export async function getTickets(priority: string, state: string, category: string) {
  const userid = getUserId();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets/?priority=${priority}&state=${state}&category=${category}&created_by=${userid || ''}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los tickets");
  }

  return response.json();
}

export async function createTicket(formData: any) {
  const userid = getUserId();

  if (!userid) {
    throw new Error("Usuario no autenticado");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: formData.title,
      description: formData.description,
      category: Number(formData.category),
      priority: Number(formData.priority),
      created_by: Number(userid),
    }),
  });

  if (!response.ok) {
    throw new Error("Al crear el ticket");
  }

  return response.json();
}
