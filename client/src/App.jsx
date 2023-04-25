import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home, CreateBlog, Profile, BlogDetail } from "./pages";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import useAuthStore from "./store/authStore";
import SearchResult from "./pages/SearchResult";

const App = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { userProfile } = useAuthStore();

  return (
    <>
      <BrowserRouter>
        <div className="relative bg-blue-300  max-w-[1200px]">
          <Navbar setOpenMenu={setOpenMenu} />
          <SideMenu setOpenMenu={setOpenMenu} openMenu={openMenu} />

          <div className="absolute top-[4.11rem] w-full h-full  ">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/create-blog"
                element={userProfile ? <CreateBlog /> : <Navigate to="/" />}
              />

              {/* <Route path="/create-blog" element={<CreateBlog />} /> */}
              <Route
                path="/profile"
                element={userProfile ? <Profile /> : <Navigate to="/" />}
              />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/search" element={<SearchResult />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
