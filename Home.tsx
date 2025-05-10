import Header from "@/components/Header";
import Calendar from "@/components/Calendar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      
      <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <Sidebar />
            <Calendar 
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
