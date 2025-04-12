import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 shadow-top pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Contatos */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Linha de Apoio</h3>
            <ul className="space-y-4">
              <ContactItem 
                icon="/image/telefone.png" 
                alt="Telefone"
                href="tel:+244927056454"
                text="+244 927 056 454"
              />
              <ContactItem 
                icon="/image/whatsapp.png" 
                alt="WhatsApp"
                href="https://wa.me/244952503722?text=Olá, estou interessado nos seus produtos!"
                text="+244 952 503 722"
              />
              <ContactItem 
                icon="/image/email.png" 
                alt="Email"
                href="mailto:bemtoc.suporte@gmail.com?subject=Informações sobre o produto"
                text="bemtoc.suporte@gmail.com"
              />
            </ul>
          </div>

          {/* Endereço */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Endereço</h3>
            <div className="space-y-4">
              <InfoItem 
                icon="/image/localizacao.png"
                alt="Localização"
                text={
                  <>
                    Luanda, Angola.<br />
                    Morro Bento, Gamek à direita<br />
                    (Ilha seca)
                  </>
                }
              />
              <InfoItem 
                icon="/image/relogio.png"
                alt="Horário"
                text={
                  <>
                    Seg-Sex: 08:00 - 16:00<br />
                    Sábado: 08:00 - 12:00<br />
                    Domingo: Atendimento por marcação
                  </>
                }
              />
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Redes Sociais</h3>
            <div className="flex space-x-4">
              <SocialIcon 
                icon="/image/facebook.png"
                alt="Facebook"
                href="https://www.facebook.com/Bemtoc"
              />
              <SocialIcon 
                icon="/image/instagram.png"
                alt="Instagram"
                href="https://www.instagram.com/Bemtoc"
              />
              <SocialIcon 
                icon="/image/tiktok.png"
                alt="TikTok"
                href="https://www.tiktok.com/Bemtoc"
              />
            </div>
          </div>

          {/* Newsletter (opcional) */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Newsletter</h3>
            <p className="text-gray-600">Receba nossas novidades e promoções</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button 
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Assinar
              </button>
            </form>
          </div>
        </div>

        {/* Direitos autorais */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} BEMTOC. Todos os direitos reservados.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/politica-de-privacidade" className="hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-servico" className="hover:text-primary transition-colors">
              Termos de Serviço
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Componentes auxiliares
const ContactItem = ({ icon, alt, href, text }) => (
  <li>
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center space-x-3 hover:text-primary transition-colors"
    >
      <div className="relative w-6 h-6">
        <Image src={icon} alt={alt} fill className="object-contain" />
      </div>
      <span>{text}</span>
    </a>
  </li>
);

const InfoItem = ({ icon, alt, text }) => (
  <div className="flex items-start space-x-3">
    <div className="relative w-6 h-6 flex-shrink-0">
      <Image src={icon} alt={alt} fill className="object-contain" />
    </div>
    <p className="text-gray-700">{text}</p>
  </div>
);

const SocialIcon = ({ icon, alt, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-all hover:scale-110"
  >
    <div className="relative w-6 h-6">
      <Image src={icon} alt={alt} fill className="object-contain" />
    </div>
  </a>
);

export default Footer;