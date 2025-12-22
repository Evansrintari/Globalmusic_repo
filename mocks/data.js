export const mockJudges = [
  { id: 'j1', name: 'Sarah Johnson' },
  { id: 'j2', name: 'Michael Chen' },
  { id: 'j3', name: 'Emily Rodriguez' },
];

export const mockSubmissions = [
  {
    id: 's1',
    title: 'Summer Dreams',
    artistName: 'Alex Turner',
    audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
    contestantId: 'c1',
    contestantName: 'Alex Turner',
    submittedAt: new Date('2025-01-10'),
    status: 'pending',
  },
  {
    id: 's2',
    title: 'Midnight Jazz',
    artistName: 'Lisa Marie',
    audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.wav',
    contestantId: 'c2',
    contestantName: 'Lisa Marie',
    submittedAt: new Date('2025-01-12'),
    status: 'assigned',
    assignedJudgeId: 'j1',
  },
  {
    id: 's3',
    title: 'Electric Soul',
    artistName: 'Jordan Blake',
    audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav',
    contestantId: 'c3',
    contestantName: 'Jordan Blake',
    submittedAt: new Date('2025-01-13'),
    status: 'judged',
    assignedJudgeId: 'j2',
    rating: 8.5,
    feedback: 'Great energy and creativity!',
  },
];
