const role = "PETITIONER"

export async function register(username: string, password: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      role
    }),
  });

  if (!response.ok) {
    throw new Error("Error en el login");
  }

  return response.json();
}