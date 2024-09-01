import { Outlet } from "react-router-dom";

import Header from "./Header";

export default function AppLayout() {
  return (
    <>
      {/* <div className="absolute left-1/2 top-1/2 z-50 size-4 bg-red-600"></div> */}
      <div className="w-screen">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
