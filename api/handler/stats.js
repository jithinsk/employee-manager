const { getTotalStats, getUserStats } = require("../database/stats");

async function getStats(id) {
  try {
    const [userStats, totalStats] = await Promise.all([
      getUserStats(id),
      getTotalStats(),
    ]);
    const output = {
      totalEmployees: totalStats.totalCount,
      userAddedEmployees: userStats.totalCount,
      lastAddedID: totalStats.maxID || "",
      userAddedID: userStats.maxID || "",
      lastAddedDate:
        (totalStats.maxDate && new Date(totalStats.maxDate).toDateString()) ||
        "",
      userAddedDate:
        (userStats.maxDate && new Date(userStats.maxDate).toDateString()) || "",
    };
    return output;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  getStats,
};
