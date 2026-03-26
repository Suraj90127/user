import axios from "axios";

 const baseUrl = "https://api-docs.space/api";
 const key = "P18eCa60SONhiAazrFHG"



export const fetchSoccerData = async (req, res) => {
  try {
    // 🔥 BACKEND → BACKEND CALL
    const response = await axios.get(baseUrl + "/socer/game-data?key=P18eCa60SONhiAazrFHG", {
        headers: {
          "Content-Type": "application/json",
          "x-domain": "api-docs.space"
        }
      })

    const data = response.data;
// console.log("reeesponce",data);


    if (data?.success) {
      return res.status(200).json({
        success: true,
        data: data.data, // 👈 direct forward
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid response from aura soccer API",
    });
  } catch (error) {
    console.error("Error fetching soccer data from aura API:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch soccer data",
    });
  }
};


export const fetchsoccerBettingData = async (req, res) => {
  const { gameid } = req.query;

  if (!gameid) {
    return res.status(400).json({
      success: false,
      message: "Missing gameid",
    });
  }

  try {
    // 🔥 BACKEND → BACKEND CALL
  const response = await axios.get(baseUrl + "/socer-match/game-data?key=P18eCa60SONhiAazrFHG", {
  params: { gameid },
  headers: {
    "Content-Type": "application/json",
    "x-domain": "api-docs.space"
  }
})
  const data = response.data;

 
    if (data?.success) {
      return res.status(200).json({
        success: true,
        data: data, // 👈 sirf betting data forward
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid response from aura soccer betting API",
    });
  } catch (error) {
    console.error("Error in fetchsoccerBettingData:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
