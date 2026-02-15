/**
 * Fetch LeetCode user stats using multiple APIs with fallback
 */
export const fetchLeetCodeStats = async (username) => {
  if (!username) return null;
  
  // Try multiple APIs in order
  const apis = [
    // Primary API - LeetCode Stats API
    {
      url: `https://leetcode-stats-api.herokuapp.com/${username}`,
      parser: (data) => {
        if (data && data.status === "success") {
          return {
            platform: "leetcode",
            username,
            rating: Math.floor(data.ranking || 0),
            problems: parseInt(data.totalSolved || 0),
            easy: parseInt(data.easySolved || 0),
            medium: parseInt(data.mediumSolved || 0),
            hard: parseInt(data.hardSolved || 0),
          };
        }
        return null;
      }
    },
    // Fallback API - AlphaCoders
    {
      url: `https://alfa-leetcode-api.onrender.com/${username}/solved`,
      parser: (data) => {
        if (data && data.solvedProblem !== undefined) {
          return {
            platform: "leetcode",
            username,
            rating: Math.floor(data.ranking || 0),
            problems: parseInt(data.solvedProblem || 0),
            easy: parseInt(data.easySolved || 0),
            medium: parseInt(data.mediumSolved || 0),
            hard: parseInt(data.hardSolved || 0),
          };
        }
        return null;
      }
    }
  ];

  for (const api of apis) {
    try {
      const response = await fetch(api.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = api.parser(data);
        if (parsed) {
          console.log(`✅ LeetCode data fetched successfully for ${username}`);
          return parsed;
        }
      }
    } catch (error) {
      console.warn(`Failed to fetch from ${api.url}:`, error.message);
      continue; // Try next API
    }
  }

  console.error(`❌ All LeetCode APIs failed for username: ${username}`);
  return null;
};

/**
 * Fetch Codeforces user stats
 */
export const fetchCodeforcesStats = async (username) => {
  if (!username) return null;
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.info?handles=${username}`
    );

    if (!response.ok) return null;
    const data = await response.json();

    if (data?.result?.[0]) {
      const user = data.result[0];
      return {
        platform: "codeforces",
        username,
        rating: user.rating || 0,
        maxRating: user.maxRating || 0,
        problems: user.sumOfScores || 0,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching Codeforces stats:", error);
    return null;
  }
};

/**
 * Fetch stats from both platforms
 */
export const fetchPlatformStats = async (leetcodeUser, codeforcesUser) => {
  const [leetcodeStats, codeforcesStats] = await Promise.all([
    leetcodeUser ? fetchLeetCodeStats(leetcodeUser) : Promise.resolve(null),
    codeforcesUser ? fetchCodeforcesStats(codeforcesUser) : Promise.resolve(null),
  ]);

  return {
    leetcode: leetcodeStats,
    codeforces: codeforcesStats,
  };
};

/**
 * Calculate overall rating based on platform ratings
 */
export const calculateOverallRating = (platforms) => {
  let totalRating = 0;
  let count = 0;

  if (platforms.leetcode) {
    totalRating += platforms.leetcode.rating;
    count++;
  }

  if (platforms.codeforces) {
    totalRating += platforms.codeforces.rating;
    count++;
  }

  return count > 0 ? Math.round(totalRating / count) : 0;
};
