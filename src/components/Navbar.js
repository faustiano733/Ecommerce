'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { capitalize, createSlug } from "@/utils/stringUtils";

const CategoriesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Função para buscar categorias da API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categorias');
      if (!response.ok) throw new Error('Erro ao carregar categorias');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar categorias:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Função para redirecionar para a página da categoria
  const redirectToCategory = (categorySlug) => {
    const slug = createSlug(categorySlug)
    router.push(`/categoria/${slug}`);
    setIsOpen(false); // Fecha o dropdown após seleção
  };

  if (error) {
    return <div className="text-red-500 text-sm p-2">Erro ao carregar categorias</div>;
  }

  return (
    <>
      {/* Versão Desktop - Ativado por hover */}
      <div 
        className="hidden md:block relative"
        onMouseLeave={() => setIsOpen(false)}
      >
        <div 
          className="flex items-center"
          onMouseEnter={() => {
            if (categories.length === 0) fetchCategories();
            setIsOpen(true);
          }}
        >
          <button 
            className="font-medium px-3 py-2 rounded-md text-sm text-gray-700 hover:text-primary transition-colors flex items-center"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            Categorias
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`ml-1 h-4 w-4 inline transition-transform ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div 
            className="absolute left-0 mt-1 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
            onMouseLeave={() => setIsOpen(false)}
          >
            {loading ? (
              <div className="p-3 flex justify-center">
                <LoadingSpinner size="small" />
              </div>
            ) : (
              <div className="py-1 max-h-96 overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category.slug || category.id}
                    onClick={() => redirectToCategory(category.slug || category.nome.toLowerCase())}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    {capitalize(category.nome)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Versão Mobile - Ativado por click */}
      <div className="md:hidden">
        <button 
          onClick={() => {
            if (categories.length === 0) fetchCategories();
            setIsOpen(!isOpen);
          }}
          className="w-full text-left px-4 py-3 rounded-lg text-lg text-gray-700 hover:bg-gray-100 flex justify-between items-center"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Categorias
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`ml-1 h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu Mobile */}
        {isOpen && (
          <div className="pl-6 py-2 space-y-2">
            {loading ? (
              <div className="p-3 flex justify-center">
                <LoadingSpinner size="small" />
              </div>
            ) : (
              categories.map((category) => (
                <button
                  key={category.slug || category.id}
                  onClick={() => redirectToCategory(category.slug || category.nome.toLowerCase())}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-primary transition-colors"
                >
                  {category.nome}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};


const Navbar = ({ onSearch, carrinhoCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Efeito de scroll para navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      onSearch?.(searchTerm);
      setIsMenuOpen(false);
      if (router.pathname !== "/") router.push("/");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  return (
    <>
      {/* Navbar Principal */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white shadow-sm"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative w-40 h-20 md:w-[220px] md:h-[85px] overflow-hidden">
                <Image 
                  src="/image/logo.png" 
                  alt="Logo" 
                  fill
                  priority
                  className="object-contain object-left md:object-center"
                  sizes="(max-width: 768px)"
                />
              </div>
            </Link>

            {/* Campo de Pesquisa (Desktop) */}
            <div className="hidden md:block flex-1 max-w-md mx-4 lg:mx-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquise produtos..."
                  className="w-full py-1.5 px-4 pr-10 rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-light text-sm"
                />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                  onClick={() => handleSearch({key: 'Enter'})}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Links de Navegação (Desktop) */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <NavLink href="/" active={router.pathname === "/"}>
                Início
              </NavLink>
              <CategoriesDropdown />
              <CartButton count={carrinhoCount} />
            </div>

            {/* Menu Mobile Button */}
            <button 
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={toggleMenu}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        carrinhoCount={carrinhoCount}
        currentPath={router.pathname}
      />
    </>
  );
};

// Componente de Link de Navegação
const NavLink = ({ href, active, children }) => (
  <Link href={href}>
    <span className={`font-medium px-3 py-2 rounded-md text-sm ${active ? "text-primary font-semibold" : "text-gray-700 hover:text-primary transition-colors"}`}>
      {children}
    </span>
  </Link>
);

// Componente do Botão do Carrinho
const CartButton = ({ count }) => (
  <Link href="/carrinho" className="relative p-1">
    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
      {count > 9 ? "9+" : count}
    </span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  </Link>
);

// Componente do Menu Mobile
const MobileMenu = ({ isOpen, onClose, searchTerm, setSearchTerm, handleSearch, carrinhoCount, currentPath }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      {/* Conteúdo do Menu */}
      <div className="absolute right-0 top-0 w-4/5 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full p-4">
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Campo de Pesquisa */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Pesquise produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-light"
            />
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              onClick={() => handleSearch({key: 'Enter'})}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Links de Navegação */}
          <nav className="flex-1 space-y-4">
            <MobileNavLink href="/" active={currentPath === "/"} onClose={onClose}>
              Página Inicial
            </MobileNavLink>
            <CategoriesDropdown />
          </nav>

          {/* Carrinho */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <Link 
              href="/carrinho" 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              <span className="font-medium">Carrinho</span>
              <span className="bg-primary text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {carrinhoCount}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Link Mobile
const MobileNavLink = ({ href, active, children, onClose }) => (
  <Link href={href}>
    <span 
      onClick={onClose}
      className={`block px-4 py-3 rounded-lg text-lg ${active ? "bg-primary-light text-primary font-semibold" : "text-gray-700 hover:bg-gray-100"}`}
    >
      {children}
    </span>
  </Link>
);

export default Navbar;