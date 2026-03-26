// controllers/tennisController.js
import axios from "axios";



 const baseUrl = "https://api-docs.space/api";
 const key = "P18eCa60SONhiAazrFHG"


export const fetchTennisData = async (req, res) => {
  try {
    // 🔥 BACKEND → BACKEND CALL
    const response = await axios.get(baseUrl + "/tannis/game-data?key=P18eCa60SONhiAazrFHG", {
  headers: {
    "Content-Type": "application/json",
    "x-domain": "api-docs.space"
  }
})

    const data = response.data;

    /**
     * Expected aura444 tennis API format:
     * {
     *   success: true,
     *   data: [...]
     * }
     */

    if (data?.success) {
      return res.status(200).json({
        success: true,
        data: data.data, // 👈 direct forward
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid response from aura tennis API",
    });
  } catch (error) {
    console.error("Error fetching tennis data from aura API:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tennis data",
    });
  }
};


export const fetchTannisBettingData = async (req, res) => {
  const { gameid } = req.query;

  if (!gameid) {
    return res.status(400).json({
      success: false,
      message: "Missing gameid",
    });
  }

  try {
    // 🔥 BACKEND → BACKEND CALL
    const response = await axios.get(baseUrl + "/tannis-match/game-data?key=P18eCa60SONhiAazrFHG", {
      params: { gameid },
      headers: {
        "Content-Type": "application/json",
        "x-domain": "api-docs.space"
      }
    })

    const data = response.data;

    /**
     * Expected aura444 tennis betting format:
     * {
     *   success: true,
     *   data: {...}
     * }
     */

    if (data?.success) {
      return res.status(200).json({
        success: true,
        data: data, // 👈 only betting data
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid response from aura tennis betting API",
    });
  } catch (error) {
    console.error("Error in fetchTannisBettingData:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};