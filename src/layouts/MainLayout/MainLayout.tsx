import { Header, Footer } from "../../components/common";
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col min-h-screen px-4">
        <Header />
        <div className="mt-8 flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
