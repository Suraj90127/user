import React, { useState,useEffect } from 'react'

import img from '../assets/icons/Joker Teen Patti-min.png'
import {useDispatch,useSelector} from 'react-redux';
import { getAllGamesProvider ,launchGame} from '../redux/reducer/AllgameReducer';
import { useNavigate } from 'react-router-dom';

const Casino = () => {
    const [activeTab, setActiveTab] = useState("ALL CASINO");
    const {getAllGamesProviderData,filteredGamesProvider}=useSelector((state)=>state.game)
    const games = [
        {
          id: 1,
          title: "POINT TEEN PATTI",
          image: img,
          bgColor: "bg-emerald-700",
        },
        {
          id: 2,
          title: "JOKER TEEN PATTI",
          image: img,
          bgColor: "bg-emerald-700",
        },
        {
          id: 3,
          title: "MUFLIS TEEN PATTI",
          image: img,
          bgColor: "bg-emerald-700",
        },
        {
          id: 4,
          title: "1DAY TEEN PATTI",
          image: img,
          bgColor: "bg-emerald-700",
        },
        {
          id: 5,
          title: "DTL TEENPATTI",
          image: img,
          bgColor: "bg-emerald-700",
        },
        {
          id: 6,
          title: "20-20 TEENPATTI",
          image: img,
          bgColor: "bg-emerald-700",
        },
        {
          id: 7,
          title: "20-20 POKER - A",
          image: img,
          bgColor: "bg-emerald-700",
        },
        {
          id: 8,
          title: "20-20 POKER - B",
          image: img,
          bgColor: "bg-emerald-700",
        },
        {
          id: 9,
          title: "ROYAL TEEN PATTI",
          image: img,
          bgColor: "bg-emerald-700",
        },
        {
          id: 10,
          title: "GOLDEN TEEN PATTI",
          image: img,
          bgColor: "bg-emerald-700",
        },
        {
          id: 11,
          title: "KING TEEN PATTI",
          image: img,
          bgColor: "bg-emerald-700",
        },
        {
          id: 12,
          title: "ROYAL FLUSH",
          image: img,
          bgColor: "bg-emerald-700",
        },
      ]
      const navigate=useNavigate();
      const {userInfo}=useSelector((state)=>state.auth);
const dispatch=useDispatch();
useEffect(() => {

dispatch(getAllGamesProvider({page:1,limit:20,provider:"evolutionlive"}));
}, [dispatch])

        // Sub-categories for games
  const subCategories = [
    "ALL CASINO",
    "TEENPATTI",
    "POKER",
    "BACCARAT",
    "DRAGON TIGER",
    "32CARDS",
    "ANDAR BAHAR",
    "LUCKY 7",
    "3 CARD",
  ]

  const handlePlayGame = async (game) => {
      
      if (!userInfo) {
        navigate("/login", {
          state: { redirectTo: `/horse-racing || ""}` },
        });
        return;
      }
    
      try {
        await dispatch(
          launchGame({ gameId: game.game_uid || game.id })
        ).unwrap();
    
        navigate(`/play/${game.game_uid || game.id}`, {
          state: {
            gameUrl: game.game_url,
            gameName: game.game_name,
            provider: game.provider,
          },
        });
      } catch (err) {
        alert(err || "Failed to launch game");
      }
    };

  return (
   
    <div>
    <nav className="flex font-bold bg-color border-b border-emerald-600 relative text-[12px] overflow-auto">
      {/* {subCategories.map((category, index) => (
        <button
          key={index}
          className={`px-4 py-2 hover:bg-emerald-600 transition-colors whitespace-nowrap ${activeTab === category ? "bg-emerald-600" : ""}`}
          onClick={() => setActiveTab(category)}
        >
          {category}
        </button>
      ))} */}

      {/* Search button */}
      {/* <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <button className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
          <BiSearch className="text-white" size={20} />
        </button>
      </div> */}
    </nav>

    {activeTab === "ALL CASINO" && (

<div className="container mx-auto p-1 md:p-4 relative">
  <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
    {getAllGamesProviderData?.map((game) => (
      <div key={game.id} className="relative group cursor-pointerl">
        <div
          className={` bg-color rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform  h-full`}
          onClick={()=>handlePlayGame(game)}
        >
          <div className="md:md:h-48 relative flex items-center justify-center">
              <img src={game.icon} alt="game" />
          </div>
          <div className="py-2 text-center text-white font-bold bg-color text-[12px] whitespace-nowrap">{game.title}</div>
        </div>
      </div>
    ))}
  </div>
</div>
    
)}
{activeTab === "TEENPATTI" && (

<div className="container mx-auto p-1 md:p-4 relative">
  <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
    {games.map((game) => (
      <div key={game.id} className="relative group cursor-pointer">
        <div
          className={` bg-color rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform`}
        >
          <div className="md:h-48 relative flex items-center justify-center">
              <img src={game.image} alt="game" />
          </div>
          <div className="py-2 text-center text-white font-bold bg-color text-[12px]">{game.title}</div>
        </div>
      </div>
    ))}
  </div>
</div>
    
)}
{activeTab === "POKER" && (

<div className="container mx-auto p-1 md:p-4 relative">
  <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
    {games.map((game) => (
      <div key={game.id} className="relative group cursor-pointer">
        <div
          className={` bg-color rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform`}
        >
          <div className="md:h-48 relative flex items-center justify-center">
              <img src={game.image} alt="game" />
          </div>
          <div className="py-2 text-center text-white font-bold bg-color text-[12px]">{game.title}</div>
        </div>
      </div>
    ))}
  </div>
</div>
    
)}
{activeTab === "BACCARAT" && (

<div className="container mx-auto p-1 md:p-4 relative">
  <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
    {games.map((game) => (
      <div key={game.id} className="relative group cursor-pointer">
        <div
          className={` bg-color rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform`}
        >
          <div className="md:h-48 relative flex items-center justify-center">
              <img src={game.image} alt="game" />
          </div>
          <div className="py-2 text-center text-white font-bold bg-color text-[12px]">{game.title}</div>
        </div>
      </div>
    ))}
  </div>
</div>
    
)}
{activeTab === "DRAGON TIGER" && (

<div className="container mx-auto p-1 md:p-4 relative">
  <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
    {games.map((game) => (
      <div key={game.id} className="relative group cursor-pointer">
        <div
          className={` bg-color rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform`}
        >
          <div className="md:h-48 relative flex items-center justify-center">
              <img src={game.image} alt="game" />
          </div>
          <div className="py-2 text-center text-white font-bold bg-color text-[12px]">{game.title}</div>
        </div>
      </div>
    ))}
  </div>
</div>
    
)}
{activeTab === "3 CARD" && (

<div className="container mx-auto p-1 md:p-4 relative">
  <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
    {games.map((game) => (
      <div key={game.id} className="relative group cursor-pointer">
        <div
          className={` bg-color rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform`}
        >
          <div className="md:h-48 relative flex items-center justify-center">
              <img src={game.image} alt="game" />
          </div>
          <div className="py-2 text-center text-white font-bold bg-color text-[12px]">{game.title}</div>
        </div>
      </div>
    ))}
  </div>
</div>
    
)}
{activeTab === "LUCKY 7" && (

<div className="container mx-auto p-1 md:p-4 relative">
  <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
    {games.map((game) => (
      <div key={game.id} className="relative group cursor-pointer">
        <div
          className={` bg-color rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform`}
        >
          <div className="md:h-48 relative flex items-center justify-center">
              <img src={game.image} alt="game" />
          </div>
          <div className="py-2 text-center text-white font-bold bg-color text-[12px]">{game.title}</div>
        </div>
      </div>
    ))}
  </div>
</div>
    
)}
{activeTab === "ANDAR BAHAR" && (

<div className="container mx-auto p-1 md:p-4 relative">
  <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
    {games.map((game) => (
      <div key={game.id} className="relative group cursor-pointer">
        <div
          className={` bg-color rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform`}
        >
          <div className="md:h-48 relative flex items-center justify-center">
              <img src={game.image} alt="game" />
          </div>
          <div className="py-2 text-center text-white font-bold bg-color text-[12px]">{game.title}</div>
        </div>
      </div>
    ))}
  </div>
</div>
    
)}
{activeTab === "32CARDS" && (

<div className="container mx-auto p-1 md:p-4 relative">
  <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
    {games.map((game) => (
      <div key={game.id} className="relative group cursor-pointer">
        <div
          className={` bg-color rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform`}
        >
          <div className="md:h-48 relative flex items-center justify-center">
              <img src={game.image} alt="game" />
          </div>
          <div className="py-2 text-center text-white font-bold bg-color text-[12px]">{game.title}</div>
        </div>
      </div>
    ))}
  </div>
</div>
    
)}
</div>
  )
}

export default Casino
