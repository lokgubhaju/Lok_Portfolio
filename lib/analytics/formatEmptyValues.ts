const DEPTH_LIMIT = 20;

// Values may be: arrays, objects, or other types
const formatValue = (data: unknown, level = 0): unknown => {
  if (level > DEPTH_LIMIT) {
    return data;
  }
  if (typeof data === "undefined" || data === null) {
    return "";
  }
  if (Array.isArray(data)) {
    const formattedData: unknown[] = [];
    data.forEach((value, key) => {
      formattedData[key] = formatValue(value, level + 1);
    });
    return formattedData;
  }
  if (data && typeof data === "object" && Object.keys(data).length > 0) {
    const formattedData: Record<string, unknown> = {};
    Object.entries(data).forEach(([key, value]) => {
      formattedData[key] = formatValue(value, level + 1);
    });
    return formattedData;
  }
  return data;
};

export const formatEmptyValues = (
  data?: Record<string, unknown>
): typeof data => {
  // Skip functions
  if (typeof data !== "object") {
    return data;
  }
  if (!data) {
    return data;
  }
  const formattedData: Record<string, unknown> = { ...data };
  Object.entries(data).forEach(([key, value]) => {
    formattedData[key] =
      typeof value === "undefined" ? value : formatValue(value);
  });
  return formattedData;
};
