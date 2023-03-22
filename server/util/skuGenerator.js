const getNextSKU = async () => {
  try {
    // Get the current highest SKU number from the database, and add 1 to it
    const highestSKU = await getHighestSKU();
    if (isNaN(highestSKU)) {
      throw new Error("Could not retrieve highest SKU");
    }
    return (parseInt(highestSKU) + 1).toString().padStart(4, "0");
  } catch (error) {
    console.error("Error retrieving SKU:", error);
    throw error;
  }
};

module.exports = getNextSKU;
