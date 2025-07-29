export const LeadStatusService = async () => {
    const response = await fetch(`https://new-age.top/App/api.php?gofor=leadsstalist`);

    if (!response.ok) {
      throw new Error("Failed to Fetch Data");
    }
    return await response.json();
}