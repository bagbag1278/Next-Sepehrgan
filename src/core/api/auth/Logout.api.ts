export async function logout() {
  const response = await fetch("/api/logout", {
    method: "POST",
  });

  const data = await response.text();

  console.log("STATUS:", response.status);
  console.log("DATA:", data);

  if (!response.ok) {
    throw new Error(`Logout failed: ${response.status}`);
  }

  return data;
}