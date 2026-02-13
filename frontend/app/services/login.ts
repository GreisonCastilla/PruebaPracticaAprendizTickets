export async function login(username: string, password: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Error en el login");
  }

  return response.json();
}