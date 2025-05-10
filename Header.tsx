import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#1b4332] to-[#52b788] py-6 px-4 shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-['Poppins'] font-bold text-white">
            Appuntamenti con Pine
          </h1>
          <div className="hidden md:flex space-x-2">
            <Button variant="outline" className="bg-white text-[#1b4332] hover:bg-gray-100 transition" disabled>
              Accedi
            </Button>
            <Button variant="default" className="bg-[#f97316] text-white hover:bg-orange-600 transition" disabled>
              Registrati
            </Button>
          </div>
        </div>
        <p className="text-white/80 mt-2 max-w-2xl">
          Prenota appuntamenti esclusivi con la personalità più ricercata.
        </p>
      </div>
    </header>
  );
}
