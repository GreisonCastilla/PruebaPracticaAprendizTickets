export async function user(user: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error en el login");
  }

  return response.json();
}