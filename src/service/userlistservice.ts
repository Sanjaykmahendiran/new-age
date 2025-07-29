export const UsersListService = async () => {
    const response = await fetch(`https://new-age.top/App/api.php?gofor=userslist`);

    if (!response.ok) {
      throw new Error("Failed to Fetch Data");
    }
    return await response.json();
}