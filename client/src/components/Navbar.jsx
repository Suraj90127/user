
// // Navbar.jsx
// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";

// // Icons
// import { IoMdClose, IoMdRefresh, IoMdHome, IoIosPlayCircle } from "react-icons/io";
// import { BsCoin, BsPersonCircle, BsShieldShaded } from "react-icons/bs";
// import { MdOutlineArrowDropDown, MdOutlineLogout, MdSportsCricket, MdSportsSoccer, MdSportsTennis, MdCasino, MdOutlineSportsEsports, MdOutlineLocalFireDepartment, MdSportsKabaddi, MdSportsBasketball } from "react-icons/md";
// import { FaSearchPlus, FaEyeSlash, FaEye, FaHorseHead } from "react-icons/fa";
// import { IoSearchOutline } from "react-icons/io5";
// import { GiBoxingGlove } from "react-icons/gi";
// import {
  
//   MdLiveTv,
//   MdWhatshot,
//   MdStars,
//   MdEmojiEvents,
//   MdTableBar,
// } from "react-icons/md";
// import {
//   FaGamepad,
//   FaHeart,
//   FaThLarge,
//   FaTicketAlt,
// } from "react-icons/fa";

// // Redux & API
// import { getUser, loginUser, user_reset } from "../redux/reducer/authReducer";
// import api from "../redux/api";

// const Navbar = ({ onNavItemClick }) => {
//   const { userInfo, loading } = useSelector((state) => state.auth);
//   const [activeItem, setActiveItem] = useState("Home");
//   const [showPopup, setShowPopup] = useState(false);
//   const [searchbar, setSearchbar] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ userName: "", password: "" });
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);
//   const navRef = useRef(null);

//   // Scroll for bottom navigation on mobile
//   useEffect(() => {
//     if (navRef.current) {
//       const handleWheel = (e) => {
//         if (window.innerWidth < 768) {
//           e.preventDefault();
//           navRef.current.scrollLeft += e.deltaY;
//         }
//       };
//       navRef.current.addEventListener('wheel', handleWheel);
//       return () => navRef.current?.removeEventListener('wheel', handleWheel);
//     }
//   }, []);

//   useEffect(() => {
//     dispatch(getUser());
//   }, [dispatch]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowPopup(false);
//         setShowProfileDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.userName || !formData.password) {
//       toast.error("Please fill all fields");
//       return;
//     }
    
//     setShowPopup(false);
//     try {
//       const result = await dispatch(loginUser(formData));
//       if (result?.payload?.success) {
//         toast.success(result.payload.message);
//         setTimeout(() => navigate("/", { replace: true }), 1000);
//       } else {
//         toast.error(result.payload?.message || "Login failed");
//       }
//     } catch (error) {
//       toast.error("An error occurred during login");
//     }
//   };

//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   const handleSignupClick = () => {
//     navigate("/register");
//   };

//   const logout = async () => {
//     try {
//       await api.get("/customer/logout", { withCredentials: true });
//       localStorage.removeItem("auth");
//       dispatch(user_reset());
//       navigate("/");
//       toast.success("Logged out successfully");
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("Failed to logout");
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
//       setSearchTerm("");
//       setSearchbar(false);
//     }
//   };

//   // Menu Configuration
//   const lockableGames = [
//     { name: "Cricket", path: "/cricket", icon: <MdSportsCricket /> },
//     { name: "Soccer", path: "/soccer", icon: <MdSportsSoccer />, count: 7 },
//     { name: "Tennis", path: "/tennis", icon: <MdSportsTennis />, count: 1 },
//     // { name: "Sports Book", path: "/sports-book", icon: <BsShieldShaded /> },
    
//     // { name: "Horse Racing", path: "/horse-racing", icon: <FaHorseHead /> },
   
    
//     // { name: "Int Casino", path: "/int-casino", icon: <MdCasino /> },
//     // { name: "Virtual", path: "/virtual", icon: <MdOutlineSportsEsports /> },
//     // { name: "Boxing", path: "/boxing", icon: <GiBoxingGlove /> },
//     // { name: "Basketball", path: "/basketball", icon: <MdSportsBasketball />, count: 5 },
//     // { name: "Kabaddi", path: "/kabaddi", icon: <MdSportsKabaddi /> }


//   { name: "OriginalsGames", path: "/games/OriginalsGames", icon: <FaGamepad /> },
//   { name: "LiveCasino", path: "/games/liveCasino", icon: <MdLiveTv /> },
//   // { name: "Sexy", path: "/games/Sexy", icon: <FaHeart /> },
//   { name: "Exclusivegame", path: "/games/Exclusivegame", icon: <MdStars /> },
//   { name: "Hotgame", path: "/games/Hotgame", icon: <MdWhatshot /> },
//   { name: "Toppicker", path: "/games/Toppicker", icon: <MdEmojiEvents /> },
//   { name: "GameShowdata", path: "/games/GameShowdata", icon: <FaTicketAlt /> },
//   { name: "TableGames", path: "/games/TableGames", icon: <MdTableBar /> },
//   { name: "SlotsGames", path: "/games/SlotsGames", icon: <FaThLarge /> },
//   { name: "BingoGames", path: "/games/BingoGames", icon: <MdCasino /> },
//   ];

//   const getLockedGames = () => {
//     const baseNav = [
//       { name: "Home", path: "/", icon: <IoMdHome /> },
//       { name: "In-Play", path: "/in-play", icon: <IoIosPlayCircle />, count: 13 },
//     ];

//     if (!userInfo?.gamelock) return [...baseNav, ...lockableGames];

//     const filtered = lockableGames.filter(game => {
//       const gameLock = userInfo.gamelock.find(
//         item => item.game.toLowerCase() === game.name.toLowerCase()
//       );
//       return !gameLock || gameLock?.lock === true;
//     });

//     return [...baseNav, ...filtered].map(game => ({
//       ...game,
//       path: game.path || `/${game.name.toLowerCase().replace(/\s+/g, '-')}`
//     }));
//   };

//   const navItems = getLockedGames();

//   const handleNavItemClick = (itemName) => {
//     setActiveItem(itemName);
//     if (onNavItemClick) {
//       onNavItemClick(itemName);
//     }
//   };


//   // console.log("userInfouserInfouserInfo",userInfo);
  
  

//   return (
//     <div className="w-full sticky top-0 z-50 font-sans" ref={dropdownRef}>
//       {/* Top Header Section - Logo, Search, Login/Register */}
//       <header className="flex items-center justify-between px-3 py-2 bg-black h-14 shadow-md">
//         {/* Logo */}
//         <Link to="/" className="shrink-0">
//           <img src="https://i.ibb.co/8Dx8cb2f/REDDY111-LOGO.png" alt="loading" className="w-full h-15" />
//         </Link>

//         {/* Search and Auth Buttons Container */}
//         <div className="flex items-center gap-3">
//           {/* Search Button (Mobile) */}
//           <button 
//             className="text-white text-xl"
//             onClick={() => setSearchbar(!searchbar)}
//           >
//             <IoSearchOutline />
//           </button>

//           {/* Auth Section */}
//           {!userInfo ? (
//             <div className="flex items-center gap-2">
              
              

//               {/* Mobile Login/Register Buttons */}
//               <div className=" flex items-center gap-2">
//                  {/*  <button 
//                   onClick={handleSignupClick}
//                   className="bg-[#701a52] text-white border border-white rounded px-2 py-1 text-[10px] font-bold uppercase hover:bg-[#5a1542] transition-all whitespace-nowrap"
//                 >
//                   Signup
//                 </button>  */}
//                 <button 
//                   onClick={handleLoginClick}
//                   className="bg-[#701a52] text-white border border-white rounded px-2 py-1 text-[10px] font-bold uppercase hover:bg-[#5a1542] transition-all whitespace-nowrap"
//                 >
//                   Login
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center gap-3">
//               {/* Desktop Profile Section */}
//               <div className="hidden md:flex items-center gap-3">
//                 <div className="text-white text-right leading-tight">
//                   <p className="text-[11px] font-bold">Main PTI <span className="text-green-400">{userInfo?.avbalance}</span></p>
//                   <p className="text-[11px]">Exposure <span className="text-red-500">({Number(userInfo?.exposure).toFixed(2)})</span></p>
//                 </div>
//                 <button className="bg-[#2a2a2a] p-1.5 text-white border border-gray-700 rounded hover:bg-[#3a3a3a] transition-all">
//                   <IoMdRefresh />
//                 </button>
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//                     className="flex items-center gap-1 bg-[#2a2a2a] text-white px-3 py-1.5 rounded text-xs border border-gray-700 hover:bg-[#3a3a3a] transition-all"
//                   >
//                     <BsPersonCircle /> Account <MdOutlineArrowDropDown className="text-lg" />
//                   </button>
//                   <AnimatePresence>
//                     {showProfileDropdown && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         transition={{ duration: 0.2 }}
//                         className="absolute right-0 mt-2 w-48 bg-white shadow-2xl rounded-lg overflow-hidden z-50 border border-gray-200"
//                       >
//                         {/* Section Title */}
//                         <div className="bg-gray-100 px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
//                           Exchange
//                         </div>

//                         {/* Menu */}
//                         <div className="py-1 text-gray-700 text-xs">
//                           <Link
//                             to="/profile"
//                             onClick={() => setShowProfileDropdown(false)}
//                             className="block px-4 py-2.5 hover:bg-gray-50 transition"
//                           >
//                             My Profile
//                           </Link>

//                           <Link
//                             to="/statement"
//                             onClick={() => setShowProfileDropdown(false)}
//                             className="block px-4 py-2.5 hover:bg-gray-50 transition"
//                           >
//                             Account Statement
//                           </Link>

//                           <Link
//                             to="/bet-history"
//                             onClick={() => setShowProfileDropdown(false)}
//                             className="block px-4 py-2.5 hover:bg-gray-50 transition"
//                           >
//                             Bet History
//                           </Link>

//                           <Link
//                             to="/wallet/withdrawal"
//                             onClick={() => setShowProfileDropdown(false)}
//                             className="block px-4 py-2.5 hover:bg-gray-50 transition"
//                           >
//                             Withdrawal
//                           </Link>

//                           <Link
//                             to="/wallet/deposit"
//                             onClick={() => setShowProfileDropdown(false)}
//                             className="block px-4 py-2.5 hover:bg-gray-50 transition"
//                           >
//                             Deposit
//                           </Link>

//                           <Link
//                             to="/rolling"
//                             onClick={() => setShowProfileDropdown(false)}
//                             className="block px-4 py-2.5 hover:bg-gray-50 transition border-b border-gray-100"
//                           >
//                             Rolling
//                           </Link>

//                           {/* Logout */}
//                           <button
//                             onClick={() => {
//                               logout();
//                               setShowProfileDropdown(false);
//                             }}
//                             className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 transition"
//                           >
//                             Logout
//                           </button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Mobile Profile Section */}
//               <div className="md:hidden flex items-center gap-2">
//                 <div className="text-white text-right leading-tight">
//                   <p className="text-[9px] font-bold">Bal: <span className="text-green-400">₹{userInfo?.avbalance?.toFixed(2)}</span></p>
//                   <p className="text-[9px]">Exp: <span className="text-red-500">₹{userInfo?.exposure?.toFixed(2)}</span></p>
//                 </div>
                
//                 {/* Profile Icon with Dropdown */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//                     className="bg-[#2a2a2a] text-white p-2 rounded-full border border-gray-700 hover:bg-[#3a3a3a] transition-all flex items-center justify-center"
//                   >
//                     <BsPersonCircle className="text-lg" />
//                   </button>
                  
//                   <AnimatePresence>
//                     {showProfileDropdown && (
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.95, y: 5 }}
//                         animate={{ opacity: 1, scale: 1, y: 0 }}
//                         exit={{ opacity: 0, scale: 0.95, y: 5 }}
//                         transition={{ duration: 0.2 }}
//                         className="absolute right-0 mt-2 w-64 bg-white shadow-2xl rounded-lg overflow-hidden z-50 border border-gray-300"
//                       >
//                         {/* Profile Header */}
//                         <div className="bg-gradient-to-r from-[#701a52] to-[#8a1f63] px-4 py-3 text-white">
//                           <p className="font-bold text-sm">
//                             {userInfo?.userName || "User"}
//                           </p>
//                           <div className="flex justify-between text-xs mt-1">
//                             <span>
//                               Balance:{" "}
//                               <span className="text-green-300">
//                                 ₹{userInfo?.balance?.toFixed(2)}
//                               </span>
//                             </span>
//                             <span>
//                               Exposure:{" "}
//                               <span className="text-red-300">
//                                 ₹{userInfo?.exposure?.toFixed(2)}
//                               </span>
//                             </span>
//                           </div>
//                         </div>

//                         {/* Menu */}
//                         <div className="py-1 text-gray-700">
//                           <Link
//                             to="/profile"
//                             onClick={() => setShowProfileDropdown(false)}
//                             className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition"
//                           >
//                             <BsPersonCircle className="text-gray-600 text-base" />
//                             My Profile
//                           </Link>

//                           <Link
//                             to="/statement"
//                             onClick={() => setShowProfileDropdown(false)}
//                             className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition"
//                           >
//                             <BsCoin className="text-gray-600 text-base" />
//                             Account Statement
//                           </Link>

//                           <Link
//                             to="/bet-history"
//                             onClick={() => setShowProfileDropdown(false)}
//                             className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition"
//                           >
//                             <FaSearchPlus className="text-gray-600 text-base" />
//                             Bet History
//                           </Link>

//                           <Link
//                             to="/rolling"
//                             onClick={() => setShowProfileDropdown(false)}
//                             className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition border-b border-gray-100"
//                           >
//                             <IoMdRefresh className="text-gray-600 text-base" />
//                             Rolling
//                           </Link>

//                           <Link
//                             to="/wallet/withdrawal"
//                             onClick={() => setShowProfileDropdown(false)}
//                             className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition border-b border-gray-100"
//                           >
//                             Withdrawal
//                           </Link>

//                           <Link
//                             to="/wallet/deposit"
//                             onClick={() => setShowProfileDropdown(false)}
//                             className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition border-b border-gray-100"
//                           >
//                             Deposit
//                           </Link>

//                           {/* Logout */}
//                           <button
//                             onClick={() => {
//                               logout();
//                               setShowProfileDropdown(false);
//                             }}
//                             className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
//                           >
//                             <MdOutlineLogout className="text-base" />
//                             Logout
//                           </button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Mobile Search Bar */}
//       {searchbar && (
//         <div className="bg-black p-3">
//           <form onSubmit={handleSearch} className="relative">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search Event..."
//               className="w-full bg-white text-gray-700 h-10 px-4 pr-12 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a86a]"
//             />
//             <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
//               <IoSearchOutline className="text-[#1a365d] text-xl" />
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Bottom Sliding Navigation - For Mobile & Desktop */}
//       <nav className="bg-[#f3f4f6] border-b border-gray-200 shadow-sm">
//         <div className="relative">
//           <ul 
//             ref={navRef}
//             className="flex items-center gap-2 px-2 py-2 h-15 overflow-x-auto no-scrollbar"
//           >
//             {navItems.map((item, i) => {
//               const isActive = activeItem === item.name;
//               return (
//                 <li key={i} className="relative flex-shrink-0">
//                   <Link
//                     to={item.path}
//                     onClick={() => handleNavItemClick(item.name)}
//                     className={`relative flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 shadow-sm border font-bold text-[12px] sm:text-[13px]
//                       ${isActive 
//                         ? "bg-black text-white border-black" 
//                         : "bg-white text-black border-gray-200 hover:bg-gray-50"
//                       }`}
//                   >
//                     <span className="text-base sm:text-lg">{item.icon}</span>
//                     <span className="whitespace-nowrap">{item.name}</span>
//                     {item.count && (
//                       <span className="absolute -top-2 -right-1 bg-red-400 text-white text-[9px] px-1 py-0.5 rounded font-bold shadow-sm">
//                         {item.count}
//                       </span>
//                     )}
//                     {isActive && (
//                       <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 
//                         border-l-[6px] border-l-transparent 
//                         border-r-[6px] border-r-transparent 
//                         border-t-[6px] border-t-black">
//                       </div>
//                     )}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>

//           </div>
//       </nav>

//       {/* Login Popup (for mobile) */}
//       <AnimatePresence>
//         {showPopup && (
//           <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-[#1a1a1a] text-white p-6 rounded-lg w-full max-w-md shadow-2xl border border-gray-700"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">Login</h2>
//                 <IoMdClose 
//                   className="text-2xl cursor-pointer hover:text-gray-300" 
//                   onClick={() => setShowPopup(false)} 
//                 />
//               </div>
              
//               <form onSubmit={handleSubmit}>
//                 <div className="space-y-4 mb-6">
//                   <div>
//                     <label className="block text-sm mb-2">Username</label>
//                     <input
//                       type="text"
//                       value={formData.userName}
//                       onChange={(e) => setFormData({...formData, userName: e.target.value})}
//                       className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c9a86a]"
//                       placeholder="Enter username"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm mb-2">Password</label>
//                     <div className="relative">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         value={formData.password}
//                         onChange={(e) => setFormData({...formData, password: e.target.value})}
//                         className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c9a86a]"
//                         placeholder="Enter password"
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                       >
//                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-[#701a52] text-white font-bold py-3 rounded hover:bg-[#5a1542] transition-all disabled:opacity-50"
//                 >
//                   {loading ? "Logging in..." : "Login"}
//                 </button>
//               </form>

//               <div className="mt-4 text-center">
//                 <button className="text-sm text-gray-400 hover:text-white" onClick={() => navigate('/forgot-password')}>
//                   Forgot Password?
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { 
//           display: none; 
//           height: 4px;
//         }
//         .no-scrollbar::-webkit-scrollbar-track {
//           background: #f1f1f1;
//         }
//         .no-scrollbar::-webkit-scrollbar-thumb {
//           background: #888;
//           border-radius: 2px;
//         }
//         .no-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #555;
//         }
//         .no-scrollbar { 
//           -ms-overflow-style: none; 
//           scrollbar-width: thin;
//           scrollbar-color: #888 #f1f1f1;
//         }
        
//         /* Mobile-specific styles */
//         @media (max-width: 768px) {
//           .no-scrollbar {
//             -webkit-overflow-scrolling: touch;
//             scroll-snap-type: x mandatory;
//           }
          
//           .no-scrollbar li {
//             scroll-snap-align: start;
//           }
          
//           /* Ensure dropdown stays within viewport on small screens */
//           [class*="absolute"] {
//             max-width: calc(100vw - 20px);
//           }
//         }
        
        
        
//         /* Landscape mode on mobile */
//         @media (max-height: 480px) and (orientation: landscape) {
//           /* Shorter dropdown for landscape */
//           [class*="py-3"] {
//             padding-top: 8px !important;
//             padding-bottom: 8px !important;
//           }
          
//           /* Smaller profile header */
//           [class*="py-3"]:first-child {
//             padding-top: 10px !important;
//             padding-bottom: 10px !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Navbar;


// Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { IoMdClose, IoMdRefresh, IoMdHome, IoIosPlayCircle } from "react-icons/io";
import { BsCoin, BsPersonCircle, BsShieldShaded, BsPerson, BsClock, BsGear, BsShieldLock, BsBoxArrowRight } from "react-icons/bs";
import { MdOutlineArrowDropDown, MdOutlineLogout, MdSportsCricket, MdSportsSoccer, MdSportsTennis, MdCasino, MdOutlineSportsEsports, MdOutlineLocalFireDepartment, MdSportsKabaddi, MdSportsBasketball, MdLiveTv, MdWhatshot, MdStars, MdEmojiEvents, MdTableBar, MdHistory, MdReceipt, MdSwapHoriz, MdLock } from "react-icons/md";
import { FaSearchPlus, FaEyeSlash, FaEye, FaHorseHead, FaGamepad, FaHeart, FaThLarge, FaTicketAlt, FaUserPlus, FaWallet, FaChartLine, FaClock } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { GiBoxingGlove } from "react-icons/gi";
import { SiBitcoin } from "react-icons/si";
import { RiLogoutBoxLine, RiSettings4Line, RiTimeLine, RiUserSettingsLine, RiWalletLine } from "react-icons/ri";

// Redux & API
import { getUser, loginUser, user_reset } from "../redux/reducer/authReducer";
import api from "../redux/api";

const Navbar = ({ onNavItemClick }) => {
  const { userInfo, loading } = useSelector((state) => state.auth);
  const [activeItem, setActiveItem] = useState("Home");
  const [showPopup, setShowPopup] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const sidebarRef = useRef(null);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      });
      setCurrentTime(formattedTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format date
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  // Scroll for bottom navigation on mobile
  useEffect(() => {
    if (navRef.current) {
      const handleWheel = (e) => {
        if (window.innerWidth < 768) {
          e.preventDefault();
          navRef.current.scrollLeft += e.deltaY;
        }
      };
      navRef.current.addEventListener('wheel', handleWheel);
      return () => navRef.current?.removeEventListener('wheel', handleWheel);
    }
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && showSidebar) {
        setShowSidebar(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSidebar]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSidebar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }
    
    setShowPopup(false);
    try {
      const result = await dispatch(loginUser(formData));
      if (result?.payload?.success) {
        toast.success(result.payload.message);
        setTimeout(() => navigate("/", { replace: true }), 1000);
      } else {
        toast.error(result.payload?.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/register");
  };

  const logout = async () => {
    try {
      await api.get("/customer/logout", { withCredentials: true });
      localStorage.removeItem("auth");
      dispatch(user_reset());
      navigate("/");
      setShowSidebar(false);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setSearchbar(false);
    }
  };

  // Menu Configuration
  const lockableGames = [
    { name: "Cricket", path: "/cricket", icon: <MdSportsCricket /> },
    { name: "Soccer", path: "/soccer", icon: <MdSportsSoccer />, count: 7 },
    { name: "Tennis", path: "/tennis", icon: <MdSportsTennis />, count: 1 },
    { name: "OriginalsGames", path: "/games/OriginalsGames", icon: <FaGamepad /> },
    { name: "LiveCasino", path: "/games/liveCasino", icon: <MdLiveTv /> },
    { name: "Exclusivegame", path: "/games/Exclusivegame", icon: <MdStars /> },
    { name: "Hotgame", path: "/games/Hotgame", icon: <MdWhatshot /> },
    { name: "Toppicker", path: "/games/Toppicker", icon: <MdEmojiEvents /> },
    { name: "GameShowdata", path: "/games/GameShowdata", icon: <FaTicketAlt /> },
    { name: "TableGames", path: "/games/TableGames", icon: <MdTableBar /> },
    { name: "SlotsGames", path: "/games/SlotsGames", icon: <FaThLarge /> },
    { name: "BingoGames", path: "/games/BingoGames", icon: <MdCasino /> },
  ];

  const getLockedGames = () => {
    const baseNav = [
      { name: "Home", path: "/", icon: <IoMdHome /> },
      { name: "In-Play", path: "/in-play", icon: <IoIosPlayCircle />, count: 13 },
    ];

    if (!userInfo?.gamelock) return [...baseNav, ...lockableGames];

    const filtered = lockableGames.filter(game => {
      const gameLock = userInfo.gamelock.find(
        item => item.game.toLowerCase() === game.name.toLowerCase()
      );
      return !gameLock || gameLock?.lock === true;
    });

    return [...baseNav, ...filtered].map(game => ({
      ...game,
      path: game.path || `/${game.name.toLowerCase().replace(/\s+/g, '-')}`
    }));
  };

  const navItems = getLockedGames();

  const handleNavItemClick = (itemName) => {
    setActiveItem(itemName);
    if (onNavItemClick) {
      onNavItemClick(itemName);
    }
  };

  // Sidebar Menu Sections - Based on 5th screenshot
  const sidebarSections = [
    {
      title: "Balance Information",
      items: [
        { label: "Balance Amount", value: `₹${userInfo?.avbalance?.toFixed(2) || "0.00"}`, icon: <BsCoin className="text-green-400" /> },
        { label: "Free Cash", value: `₹${userInfo?.freeCash?.toFixed(2) || "0.00"}`, icon: <FaWallet className="text-blue-400" /> },
        { label: "Net Exposure", value: `₹${userInfo?.exposure?.toFixed(2) || "0.00"}`, icon: <FaChartLine className="text-red-400" /> },
      ]
    },
    {
      title: "Statements",
      items: [
        // { label: "Unmatched Bets", value: "You have no Unmatched Bets", icon: <MdHistory className="text-yellow-400" />, link: "/unmatched-bets" },
        { label: "Transactions", value: "You have no Transactions", icon: <MdReceipt className="text-purple-400" />, link: "/bet-history" },
        // { label: "Bonus Bets", value: "You have no Match Bets", icon: <FaTicketAlt className="text-pink-400" />, link: "/bonus-bets" },
        { label: "Open Bets", value: "Betting Profit & Loss", icon: <MdSwapHoriz className="text-orange-400" />, link: "/p&l" },
        { label: "Account Statement", icon: <MdReceipt className="text-cyan-400" />, link: "/statement" },
        { label: "Transfer Statement", icon: <MdSwapHoriz className="text-indigo-400" />, link: "/wallet/withdrawHistory" },
      ]
    },
    {
      title: "Account Settings",
      items: [
        { label: "Time Settings", icon: <RiTimeLine className="text-gray-400" />, link: "/activity" },
        { label: "Settings", icon: <RiSettings4Line className="text-gray-400" />, link: "/profile" },
        { label: "Deposit / withdraw", icon: <RiWalletLine className="text-gray-400" />, link: "/wallet" },
        { label: "Account actions", icon: <RiUserSettingsLine className="text-gray-400" />, link: "/profile" },
        { label: "Change Password", icon: <MdLock className="text-gray-400" />, link: "/profile" },
      ]
    }
  ];

  return (
<div className="w-full sticky top-0 z-50 font-sans" ref={dropdownRef}>
  {/* Top Header Section */}
  <header className="bg-gradient-to-r from-[#6e081d] via-[#6e081d] to-[#6e081d] shadow-xl border-b border-purple-500/30 backdrop-blur-sm">
    <div className="container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3 shrink-0 group">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-bold text-2xl tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              REDDY
            </h1>
            <p className="text-[10px] text-gray-400 -mt-1 tracking-wider">EST. 2010</p>
          </div>
        </Link>

        {/* Date and Time */}
        <div className="hidden md:flex items-center space-x-4 bg-white/5 px-5 py-2 rounded-full backdrop-blur-md border border-white/10">
          <div className="text-white text-sm font-medium">
            <span className="text-gray-300">{currentDate}</span>
            <span className="mx-2 text-gray-600">•</span>
            <span className="text-amber-400 font-mono font-semibold">{currentTime}</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <span className="text-gray-400 text-xs">IST</span>
        </div>

        {/* Search and Auth Buttons Container */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button 
            className="text-gray-300 hover:text-white text-2xl transition-all hover:scale-110"
            onClick={() => setSearchbar(!searchbar)}
          >
            <IoSearchOutline />
          </button>

          {/* Auth Section */}
          {!userInfo ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={handleLoginClick}
                className="relative group overflow-hidden bg-transparent border-2 border-amber-500 text-amber-500 hover:text-black rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-300"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-amber-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              <button 
                onClick={handleSignupClick}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-lg px-5 py-2 text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </button>
              <span className="text-gray-400 text-sm hidden md:inline cursor-pointer hover:text-white transition-colors">EN</span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* User Info */}
              <div className="hidden md:block bg-white/5 rounded-xl px-4 py-2 border border-white/10">
                <p className="text-xs text-gray-400">Welcome back,</p>
                <p className="text-sm text-white font-semibold">{userInfo?.userName || userInfo?.mobile || "User"}</p>
              </div>
              
              {/* Balance Info */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl px-4 py-2 border border-green-500/20">
                <p className="text-[10px] text-gray-400">Available balance</p>
                <p className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  ₹{userInfo?.avbalance?.toFixed(2) || "0.00"}
                </p>
              </div>

              {/* Account Button - Opens Sidebar */}
           <button
  onClick={() => setShowSidebar(true)}
  className="group flex items-center gap-2 px-5 py-2.5 
  bg-red-600
  text-white rounded-full text-sm font-semibold
  shadow-md hover:shadow-xl hover:shadow-purple-500/30
  transition-all duration-300 ease-out
  hover:scale-105 active:scale-95"
>
  <BsPersonCircle className="text-xl transition-transform duration-300 group-hover:rotate-6" />

  <span className="hidden sm:inline tracking-wide">
    Account
  </span>
</button>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>

  {/* Mobile Search Bar */}
  <AnimatePresence>
    {searchbar && (
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-to-r from-[#6e081d] to-[#6e081d] border-b border-purple-500/20"
      >
        <div className="p-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events, games, and more..."
              className="w-full bg-gray-800/50 text-white h-12 px-5 pr-12 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-700 focus:border-transparent backdrop-blur-sm"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
              <IoSearchOutline className="text-amber-500 text-2xl" />
            </button>
          </form>
        </div>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Bottom Navigation */}
  <nav className="bg-black bg-gradient-to-rs from-gray-900/95 to-gray-800/95 backdrop-blur-md border-b border-gray-700/50">
    <div className="container mx-auto px-4">
      <ul 
        ref={navRef}
        className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar"
      >
        {navItems.map((item, i) => {
          const isActive = activeItem === item.name;
          return (
            <li key={i} className="relative flex-shrink-0">
              <Link
                to={item.path}
                onClick={() => handleNavItemClick(item.name)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium whitespace-nowrap
                  ${isActive 
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/25" 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
                {item.count && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-lg animate-pulse">
                    {item.count}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  </nav>

  {/* Sidebar Menu */}
  <AnimatePresence>
    {showSidebar && userInfo && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
        />
        
    

    <motion.div
      ref={sidebarRef}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 20, stiffness: 180 }}
      className="fixed right-0 top-0 h-full w-full max-w-md
      bg-gradient-to-b from-[#6e081d] via-[#020617] to-black
      backdrop-blur-xl border-l border-white/10
      shadow-[0_0_40px_rgba(0,0,0,0.8)]
      z-[101] overflow-y-auto"
    >

      {/* HEADER */}
   <div className="relative bg-gradient-to-r from-[#6e081d] via-[#6e081d] to-[#020617] px-6 py-8 sticky top-0 z-10 border-b border-white/10">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.35),transparent_60%)]"></div>

  <div className="flex justify-between items-start relative z-10">

    <div>
      <h2 className="text-white text-2xl font-bold">
        Welcome Bonus
      </h2>

      <div className="flex items-center gap-3 mt-2">
        <span className="text-4xl font-bold text-yellow-400">
          10%
        </span>

        <span className="text-gray-300 text-sm">
          up to ₹5,000
        </span>
      </div>

      <p className="text-gray-400 text-sm mt-2">
        Har baar 5% cashback
      </p>
    </div>

    <button
      onClick={() => setShowSidebar(false)}
      className="bg-white/10 backdrop-blur-md rounded-full p-2 hover:bg-white/20 transition"
    >
      <IoMdClose className="text-2xl text-white" />
    </button>

  </div>
</div>


      {/* QUICK LINKS */}

      <div className="grid grid-cols-2 gap-3 p-6 border-b border-white/10">

        {[
          { label: "🏏 Sportsbook", path: "/sports" },
          { label: "🎰 Live Casino", path: "/games/liveCasino" },
          { label: "🎮 Slot Games", path: "/games/SlotsGames" },
          { label: "✈️ Aviator", path: "/games/OriginalsGames" }
        ].map((item, idx) => (

          <Link
            key={idx}
            to={item.path}
            onClick={() => setShowSidebar(false)}
            className="bg-white/5 backdrop-blur-md
            text-gray-200 text-sm py-3 rounded-xl
            hover:bg-white/10 transition-all
            border border-white/10
            hover:border-purple-500/50
            hover:shadow-lg hover:shadow-purple-500/20
            text-center"
          >
            {item.label}
          </Link>

        ))}

        <button
          onClick={() => {
            navigate("/cricket");
            setShowSidebar(false);
          }}
          className="col-span-2
          bg-gradient-to-r from-amber-400 via-orange-500 to-red-500
          text-black font-bold py-3 rounded-xl mt-2
          hover:shadow-xl hover:shadow-orange-500/40
          transition-all transform hover:scale-[1.03]"
        >
          🎮 Continue To Play
        </button>

      </div>


      {/* GAME CATEGORIES */}

      <div className="flex gap-3 p-6 border-b border-white/10 flex-wrap">

        {[
          { label: "⚡ SPEED CRASH", path: "/games/OriginalsGames" },
          { label: "🎯 HACKSAW GAMING", path: "/games/OriginalsGames" },
          { label: "🎲 EVOLUTION", path: "/games/liveCasino" },
          { label: "🎪 PRAGMATIC", path: "/games/SlotsGames" }
        ].map((game, idx) => (

          <button
            key={idx}
            onClick={() => {
              navigate(game.path);
              setShowSidebar(false);
            }}
            className="text-xs text-gray-300
            bg-white/5 backdrop-blur-md
            px-4 py-2 rounded-full
            hover:bg-purple-600/20 hover:text-white
            transition-all cursor-pointer
            border border-white/10
            hover:border-purple-500"
          >
            {game.label}
          </button>

        ))}

      </div>


      {/* GAME TYPES */}

      <div className="flex gap-4 p-6 border-b border-white/10 flex-wrap">

        {[
          { label: "🎲 Originals", path: "/games/OriginalsGames" },
          { label: "🎭 Game Show", path: "/games/GameShowdata" },
          { label: "🎯 Live Roulette", path: "/games/liveCasino" },
          { label: "🎫 Lottery", path: "/games/BingoGames" }
        ].map((type, idx) => (

          <button
            key={idx}
            onClick={() => {
              navigate(type.path);
              setShowSidebar(false);
            }}
            className="text-sm text-gray-300 hover:text-amber-500 transition-colors font-medium"
          >
            {type.label}
          </button>

        ))}

      </div>


      {/* BALANCE CARD */}

      <div className="p-6 border-b border-white/10
      bg-gradient-to-r from-green-500/10 to-emerald-500/10">

        <p className="text-sm text-gray-400 mb-1">
          Available Balance
        </p>

        <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          ₹{userInfo?.avbalance?.toFixed(2) || "0.00"}
        </p>

        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
          Last active: {new Date().toLocaleString()}
        </p>

      </div>


      {/* DYNAMIC SECTIONS */}

      {sidebarSections.map((section, sectionIdx) => (

        <div key={sectionIdx} className="border-b border-white/10">

          <div className="p-6">

            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
              {section.title}
            </h3>

            <div className="space-y-3">

              {section.items.map((item, itemIdx) => (

                item.link ? (

                  <Link
                    key={itemIdx}
                    to={item.link}
                    onClick={() => setShowSidebar(false)}
                    className="flex items-center justify-between py-2
                    hover:bg-white/5 rounded-xl px-3 transition-all group"
                  >

                    <div className="flex items-center gap-3">

                      <span className="text-xl">{item.icon}</span>

                      <span className="text-sm text-gray-300 group-hover:text-white font-medium">
                        {item.label}
                      </span>

                    </div>

                    {item.value && (
                      <span className="text-xs text-gray-500">
                        {item.value}
                      </span>
                    )}

                  </Link>

                ) : (

                  <div
                    key={itemIdx}
                    className="flex items-center justify-between py-2 px-3"
                  >

                    <div className="flex items-center gap-3">

                      <span className="text-xl">{item.icon}</span>

                      <span className="text-sm text-gray-300">
                        {item.label}
                      </span>

                    </div>

                    <span
                      className={`text-sm font-bold ${
                        item.label === "Net Exposure"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {item.value}
                    </span>

                  </div>

                )

              ))}

            </div>

          </div>

        </div>

      ))}


      {/* SIGN OUT */}

      <div className="p-6">

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full py-3 px-4
          hover:bg-red-500/10 rounded-xl transition-all
          group border border-red-500/20 hover:border-red-500/40"
        >

          <RiLogoutBoxLine className="text-xl text-red-400" />

          <span className="text-sm text-red-400 group-hover:text-red-300 font-medium">
            Sign Out
          </span>

        </button>

      </div>


      {/* FOOTER */}

      <div className="p-6 text-center border-t border-white/10">

        <p className="text-xs text-gray-500">
          🎲 Play responsibly | 18+ only
        </p>

        <p className="text-xs text-gray-600 mt-2">
          Register online and play online
        </p>

      </div>

    </motion.div>
  

      </>
    )}
  </AnimatePresence>

  {/* Login Popup */}
  <AnimatePresence>
    {showPopup && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-700"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-400 mt-1">Login to your account</p>
            </div>
            <IoMdClose 
              className="text-2xl cursor-pointer hover:text-gray-300 transition-colors" 
              onClick={() => setShowPopup(false)} 
            />
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-5 mb-8">
              <div>
                <label className="block text-sm mb-2 text-gray-300 font-medium">Username</label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => setFormData({...formData, userName: e.target.value})}
                  className="w-full bg-gray-800/50 text-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-700 focus:border-transparent transition-all"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-300 font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-gray-800/50 text-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-700 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 transform hover:scale-[1.02]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <button className="text-sm text-amber-500 hover:text-amber-400 transition-colors" onClick={() => navigate('/forgot-password')}>
              Forgot Password?
            </button>
            <div className="pt-3">
              <p className="text-xs text-gray-500">
                Don't have an account?{" "}
                <button onClick={handleSignupClick} className="text-amber-500 hover:text-amber-400 font-medium">
                  Sign up now
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>

  <style>{`
    .no-scrollbar::-webkit-scrollbar { 
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    @media (max-width: 768px) {
      .no-scrollbar {
        -webkit-overflow-scrolling: touch;
      }
    }
  `}</style>
</div>
  );
};

export default Navbar;