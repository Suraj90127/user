import axios from "axios";
import adminModel from "../models/adminModel.js";

 const baseUrl = "https://api-docs.space/api";
 const key = "P18eCa60SONhiAazrFHG"


export const getCricketData = async (req, res) => {
   
    
  try {
    // 🔥 BACKEND → BACKEND API CALL

    
       const response = await axios.get(baseUrl + `/cricket/game-data?key=${key}`, {
      headers: {
        "Content-Type": "application/json",
        "x-domain": "api-docs.space"
      }
    })

    // console.log("response22", response.data.matches);

    if (response.data?.success) {
      return res.status(200).json({
        success: true,
        matches: response.data.matches,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch matches from aura API",
      });
    }
  } catch (err) {
    console.error("Error fetching matches from aura API:", err);

    return res.status(500).json({
      success: false,
      message: "Server error1111",
      error:err
    });
  }
};

export const fetchCrirketBettingData = async (req, res) => {
  const { gameid } = req.query;
// console.log("gameid",gameid);


  if (!gameid) {
    return res.status(400).json({
      success: false,
      message: "Missing gameid",
    });
  }


  try {


       const response = await axios.get(baseUrl + "/cricket-match/game-data?key=P18eCa60SONhiAazrFHG", {
          params: { gameid },
          headers: {
            "Content-Type": "application/json",
            "x-domain": "api-docs.space"
          }
    })

    // console.log("response11",response.data);
    

    if (response.data?.success) {
      return res.status(200).json({
        success: true,
        data: response.data,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid API response",
    });

  } catch (error) {
    console.error("error:", error);
    console.error("STATUS:", error.response?.status);
    console.error("DATA:", error.response?.data);
    console.error("MESSAGE:", error.message);

    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || "Server error",
    });
  }
};