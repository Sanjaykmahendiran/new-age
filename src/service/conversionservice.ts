import { ConversionPayload } from "@/service/type";

export const Conversion = async (payload: ConversionPayload) => {
    const response = await fetch("https://new-age.top/App/api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to load lead list");
    }
    return await response.json();
}