import { Header, Footer } from "../../components/common";
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="mt-8">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
