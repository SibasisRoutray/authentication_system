
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="">
      <Outlet /> {/* For login/signup pages */}
    </div>
  );
}
