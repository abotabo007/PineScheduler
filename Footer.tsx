export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="md:flex md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-['Poppins'] font-semibold">Appuntamenti con Pine</h3>
            <p className="text-gray-400 mt-1">Esclusivamente non disponibile per te.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">Chi Siamo</h4>
              <div className="mt-2 space-y-1">
                <a href="#" className="text-gray-400 hover:text-white block text-sm">Team</a>
                <a href="#" className="text-gray-400 hover:text-white block text-sm">Clienti</a>
                <a href="#" className="text-gray-400 hover:text-white block text-sm">Testimonianze</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">Supporto</h4>
              <div className="mt-2 space-y-1">
                <a href="#" className="text-gray-400 hover:text-white block text-sm">FAQ</a>
                <a href="#" className="text-gray-400 hover:text-white block text-sm">Contatti</a>
                <a href="#" className="text-gray-400 hover:text-white block text-sm">Privacy</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Appuntamenti con Pine. Questo è un sito scherzo. Non è un servizio reale.
        </div>
      </div>
    </footer>
  );
}
