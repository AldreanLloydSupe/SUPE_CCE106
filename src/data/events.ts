export type CampusEvent = {
  id: string;
  title: string;
  category: 'School Events' | 'Sports' | 'Department Event';
  dateTime: string;
  venue: string;
  description: string;
  available: boolean;
  joined: boolean;
};

export const events: CampusEvent[] = [
  {
    id: 'intramurals',
    title: 'Intramurals 2026',
    category: 'School Events',
    dateTime: 'October 8, 2026 - 9:00 AM',
    venue: 'University of Mindanao Tagum College',
    description: 'Join fellow students for friendly competitions and campus-wide activities throughout Intramurals week.',
    available: true,
    joined: false,
  },
  {
    id: 'basketball-finals',
    title: 'Intercollege Basketball Finals',
    category: 'Sports',
    dateTime: 'October 10, 2026 - 3:00 PM',
    venue: 'University of Mindanao, San Jose Gym',
    description: 'Cheer for the finalists in the last game of the college league.',
    available: true,
    joined: true,
  },
  {
    id: 'csit',
    title: 'CSIT Festival',
    category: 'Department Event',
    dateTime: 'October 12, 2026 - 1:30 PM',
    venue: 'UM Visayan',
    description: 'Celebrate student projects, technology, and creative work from the CSIT department.',
    available: true,
    joined: false,
  },
  {
    id: 'leadership-summit',
    title: 'Student Leadership Summit',
    category: 'School Events',
    dateTime: 'October 15, 2026 - 8:30 AM',
    venue: 'UMTC AVR',
    description: 'Build leadership skills through student-led talks, workshops, and collaborative activities.',
    available: true,
    joined: false,
  },
  {
    id: 'volleyball-tryouts',
    title: 'Volleyball Team Tryouts',
    category: 'Sports',
    dateTime: 'October 17, 2026 - 2:00 PM',
    venue: 'UMTC Covered Court',
    description: 'Show your skills and try out for the university volleyball team.',
    available: true,
    joined: false,
  },
  {
    id: 'web-design-workshop',
    title: 'Web Design Workshop',
    category: 'Department Event',
    dateTime: 'October 20, 2026 - 10:00 AM',
    venue: 'Computer Laboratory 2',
    description: 'Learn practical web design fundamentals from CSIT student mentors.',
    available: true,
    joined: false,
  },
];
