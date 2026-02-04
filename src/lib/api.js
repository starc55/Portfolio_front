const API_BASE_URL = "https://portfolio-back-sjny.onrender.com/api";

export const fetchTemplates = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/templates?pagination[pageSize]=1000`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to load templates:", error);
    throw error;
  }
};
