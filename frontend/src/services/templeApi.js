const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

export async function getTempleStatus() {
  const response = await fetch(
    `${API_BASE_URL}/temple/status`
  );

  if (!response.ok) {
    throw new Error("Failed to connect to temple backend");
  }

  return response.text();
}


export async function getGalleryItems() {
  const response = await fetch(
    `${API_BASE_URL}/gallery`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch gallery items"
    );
  }

  return response.json();
}


export async function getTempleInfo() {
  const response = await fetch(
    `${API_BASE_URL}/temple/info`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch temple information"
    );
  }

  return response.json();
}