import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, AlertCircle, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getCelebrityAppointment, getRandomTimeSlot } from "@/lib/celebrity-appointments";
import { italianAudioBase64 } from "@/assets/italian-audio";

type CalendarProps = {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
};

export default function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [isDayViewOpen, setIsDayViewOpen] = useState(false);
  const [selectedDayDetails, setSelectedDayDetails] = useState<{
    day: number;
    appointments: Array<{ time: string; title: string }>;
  } | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(`data:audio/mp3;base64,${italianAudioBase64}`);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const monthNames = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", 
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const goToPrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      } else {
        return prevMonth + 1;
      }
    });
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    onSelectDate(date);
    
    // Create detailed appointments for the day view
    const appointmentCount = 3 + Math.floor(Math.random() * 3); // 3-5 appointments
    const appointments = [];
    
    for (let i = 0; i < appointmentCount; i++) {
      appointments.push({
        time: getRandomTimeSlot(),
        title: getCelebrityAppointment()
      });
    }
    
    // Sort appointments by time
    appointments.sort((a, b) => {
      const timeA = parseInt(a.time.split(':')[0]);
      const timeB = parseInt(b.time.split(':')[0]);
      return timeA - timeB;
    });
    
    // Set the selected day details
    setSelectedDayDetails({
      day,
      appointments
    });
    
    // Open day view
    setIsDayViewOpen(true);
  };
  
  const handleBookAppointment = () => {
    // Play audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error("Audio playback error:", error);
        setIsErrorPopupOpen(true);
      });
    }
    
    // Show shake animation
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 500);
    
    // Show popup
    const random = Math.random();
    if (random < 0.3) {
      setIsErrorPopupOpen(true);
    } else {
      setIsPopupOpen(true);
    }
    
    // Close day view
    setIsDayViewOpen(false);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="bg-gray-50 rounded-md" style={{ height: '120px' }}></div>
      );
    }
    
    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Get two appointments for each day
      const appointment1 = getCelebrityAppointment();
      const appointment2 = getCelebrityAppointment();
      const timeSlot1 = getRandomTimeSlot();
      const timeSlot2 = getRandomTimeSlot();
      
      days.push(
        <div 
          key={day}
          onClick={() => handleDateClick(day)}
          className={`relative border border-gray-200 rounded-md overflow-hidden bg-white hover:bg-gray-100 transition cursor-pointer ${isShaking ? 'animate-shake' : ''}`}
          style={{ height: '120px' }}
        >
          <div className="absolute inset-0 flex flex-col">
            <div className="text-right py-1 px-2 text-base font-medium bg-gray-50 border-b">{day}</div>
            <div className="flex-grow overflow-y-auto">
              <div className="border-b border-red-200 bg-red-50 px-2 py-1">
                <div className="text-xs font-bold text-red-800">{timeSlot1}</div>
                <div className="text-xs text-red-600 line-clamp-1" title={appointment1}>
                  {appointment1}
                </div>
              </div>
              <div className="bg-red-50 px-2 py-1">
                <div className="text-xs font-bold text-red-800">{timeSlot2}</div>
                <div className="text-xs text-red-600 line-clamp-1" title={appointment2}>
                  {appointment2}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="p-6 flex-grow">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-['Poppins'] font-semibold text-gray-800">Seleziona Data e Ora</h2>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={goToPrevMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="text-lg font-medium text-center mb-4">
        {monthNames[currentMonth]} {currentYear}
      </div>
      
      <div className="mb-8">
        <div className="grid grid-cols-7 gap-1 mb-2">
          <div className="text-center text-sm font-medium text-gray-500">Dom</div>
          <div className="text-center text-sm font-medium text-gray-500">Lun</div>
          <div className="text-center text-sm font-medium text-gray-500">Mar</div>
          <div className="text-center text-sm font-medium text-gray-500">Mer</div>
          <div className="text-center text-sm font-medium text-gray-500">Gio</div>
          <div className="text-center text-sm font-medium text-gray-500">Ven</div>
          <div className="text-center text-sm font-medium text-gray-500">Sab</div>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Fasce Orarie Disponibili</h3>
        <div 
          className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer"
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(error => {
                console.error("Audio playback error:", error);
                setIsErrorPopupOpen(true);
              });
            }
            const random = Math.random();
            if (random < 0.3) {
              setIsErrorPopupOpen(true);
            } else {
              setIsPopupOpen(true);
            }
          }}
        >
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-4 text-gray-600">Nessuna fascia oraria disponibile per la data selezionata</p>
          <p className="text-sm text-gray-500 mt-2">Prova un'altra data (anche se sono tutte prenotate...)</p>
        </div>
      </div>
      
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#1b4332] font-bold text-center">Ma come ti permetti!</DialogTitle>
            <DialogDescription className="text-gray-700 text-center text-lg">
              Come osi chiedere la sua disponibilità?
            </DialogDescription>
          </DialogHeader>
          <div className="text-center">
            <p className="text-gray-600 text-sm italic mb-4">Il Sig. Pine è troppo importante per incontrare te.</p>
            <Button 
              className="bg-[#52b788] text-white px-4 py-2 rounded hover:bg-[#1b4332] transition"
              onClick={() => setIsPopupOpen(false)}
            >
              Ho capito
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isErrorPopupOpen} onOpenChange={setIsErrorPopupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-red-600 font-bold text-center">Errore di Sistema!</DialogTitle>
            <DialogDescription className="text-gray-700 text-center text-lg">
              Il sistema non può elaborare questa richiesta
            </DialogDescription>
          </DialogHeader>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
            <p className="text-gray-600 text-sm italic mb-4">
              Messaggio di errore: Il Sig. Pine ha rifiutato automaticamente la tua richiesta.
            </p>
            <Button 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={() => setIsErrorPopupOpen(false)}
            >
              Chiudi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDayViewOpen} onOpenChange={setIsDayViewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#1b4332] font-bold text-center">
              {selectedDayDetails && `${selectedDayDetails.day} ${monthNames[currentMonth]} ${currentYear}`}
            </DialogTitle>
            <DialogDescription className="text-gray-700 text-center text-lg">
              Dettaglio degli appuntamenti
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedDayDetails && (
              <div className="space-y-3">
                {selectedDayDetails.appointments.map((appointment, index) => (
                  <div 
                    key={index} 
                    className="bg-red-50 border border-red-200 rounded-lg p-3"
                  >
                    <div className="font-bold text-red-800 text-sm">{appointment.time}</div>
                    <div className="text-red-700 mt-1">{appointment.title}</div>
                  </div>
                ))}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="font-bold text-green-800 text-sm">16:30 - 18:00</div>
                  <div className="text-green-700 flex items-center mt-1">
                    <div className="flex-1">Fascia oraria disponibile</div>
                    <Button 
                      size="sm"
                      className="bg-green-600 text-white hover:bg-green-700 transition"
                      onClick={handleBookAppointment}
                    >
                      Prenota
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <Button 
              className="bg-[#1b4332] text-white px-4 py-2 rounded hover:bg-[#52b788] transition"
              onClick={() => setIsDayViewOpen(false)}
            >
              Chiudi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
