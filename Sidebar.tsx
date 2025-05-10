import { AlertCircle, Clock, Globe, Banknote } from "lucide-react";
import profileImage from "@/assets/img/profile2.png";

export default function Sidebar() {
  return (
    <div className="bg-gray-50 p-6 md:w-64 border-r border-gray-200">
      <div className="mb-6">
        <div className="w-32 h-32 rounded-full mx-auto overflow-hidden border-4 border-[#52b788] bg-white">
          <img src={profileImage} alt="Sig. Pine" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-['Poppins'] font-semibold text-center mt-3 text-gray-800">Sig. Pine</h2>
        <p className="text-center text-gray-500 text-sm">Consulente per Celebrità</p>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-2 text-gray-700">
          <Clock className="h-5 w-5 text-[#1b4332]" />
          <span>Sessione di 60 min</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-700">
          <Globe className="h-5 w-5 text-[#1b4332]" />
          <span>Disponibilità globale</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-700">
          <Banknote className="h-5 w-5 text-[#1b4332]" />
          <span>€999 / sessione</span>
        </div>
      </div>
      
      <div className="bg-orange-100 rounded-lg p-4 text-orange-800 text-sm">
        <div className="flex items-center gap-2 font-medium">
          <AlertCircle className="h-5 w-5" />
          Disponibilità Estremamente Limitata!
        </div>
        <p className="mt-1">Il Sig. Pine è molto richiesto dalle celebrità in tutto il mondo.</p>
      </div>
    </div>
  );
}
