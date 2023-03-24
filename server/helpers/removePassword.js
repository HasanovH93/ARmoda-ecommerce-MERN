const removePassword = (data) => {
  const { email, id, username, imageUrl, likedHotels } = data;

  const userData = {
    email,
    id,
    username,
    imageUrl,
    likedHotels,
  };
  return userData;
};

module.exports = removePassword;
