
import Navbar from '../component/Navbar';
import LandingPage from '../pages/Landingpage';
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <>
      <Navbar />      
      <div className="">
        <Outlet />
      </div>
    </>
  );
}
