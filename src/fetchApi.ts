export const fetchApi = async (url: string) => {
  try {
    const requestUrl = url;

    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error("Ошибка");
    }

    return await response.json();
  } catch (e) {
    throw new Error("Ошибка" + e);
  }
};
