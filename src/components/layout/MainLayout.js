// app/components/layout/MainLayout.js
import Navbar from "../Navbar";
import Footer from "../Footer";

const MainLayout = ({ children, carrinhoCount, onSearch }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar pagina_actual="Home" carrinhoCount={carrinhoCount} onSearch={onSearch} />
      <main className="bg-white pt-44 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;