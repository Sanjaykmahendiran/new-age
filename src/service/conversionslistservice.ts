export const ConversionsListService = async (lead_id: string) => {
    const response = await fetch(`https://new-age.top/App/api.php?gofor=conversionslist&lead_id=${lead_id}`);

    if (!response.ok) {
      throw new Error("Failed to Fetch Data");
    }
    return await response.json();
}