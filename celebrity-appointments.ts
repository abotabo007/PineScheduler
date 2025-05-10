const timeSlots = [
  "08:00 - 09:30",
  "10:00 - 11:30",
  "12:00 - 13:30",
  "14:00 - 15:30",
  "16:00 - 17:30",
  "18:00 - 19:30"
];

const celebrityAppointments = [
  "Colazione con Jeff Bezos",
  "Allenamento con Dwayne 'The Rock' Johnson",
  "Gita in barca con Bill Gates", 
  "Caffè con Elon Musk",
  "Incontro segreto con Obama",
  "Meditazione con il Dalai Lama",
  "Partita di tennis con Serena Williams",
  "Lezione di chitarra con Ed Sheeran",
  "Lezione di cucina con Gordon Ramsay",
  "Proiezione film con Steven Spielberg",
  "Pianificazione spaziale con NASA",
  "Consulenza di moda con Anna Wintour",
  "Club del libro con Oprah Winfrey",
  "Sessione di coding con Mark Zuckerberg",
  "Partita a scacchi con Magnus Carlsen"
];

export function getRandomTimeSlot(): string {
  const randomIndex = Math.floor(Math.random() * timeSlots.length);
  return timeSlots[randomIndex];
}

export function getCelebrityAppointment(): string {
  const randomIndex = Math.floor(Math.random() * celebrityAppointments.length);
  return celebrityAppointments[randomIndex];
}
