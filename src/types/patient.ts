export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  status: 'active' | 'inactive';
  lastVisit?: string;
  nextAppointment?: string;
  notes?: string;
}

export const PATIENTS: Patient[] = [
  {
    id: 'p1',
    firstName: 'Zach',
    lastName: 'Bligh',
    status: 'active',
  },
  {
    id: 'p2',
    firstName: 'Jodi',
    lastName: '',
    status: 'active',
  },
  {
    id: 'p3',
    firstName: 'Michael',
    lastName: '',
    status: 'active',
  },
  {
    id: 'p4',
    firstName: 'Maria',
    lastName: '',
    status: 'active',
  },
  {
    id: 'p5',
    firstName: 'David',
    lastName: '',
    status: 'active',
  },
  {
    id: 'p6',
    firstName: 'Angela',
    lastName: '',
    status: 'active',
  },
  {
    id: 'p7',
    firstName: 'Ye',
    lastName: '',
    status: 'active',
  },
  {
    id: 'p8',
    firstName: 'Allison',
    lastName: '',
    status: 'active',
  },
  {
    id: 'p9',
    firstName: 'Mackenzie',
    lastName: '',
    status: 'active',
  },
  {
    id: 'p10',
    firstName: 'Andres',
    lastName: '',
    status: 'active',
  },
  {
    id: 'p11',
    firstName: 'Griffin',
    lastName: '',
    status: 'active',
  },
  {
    id: 'p12',
    firstName: 'Gino',
    lastName: '',
    status: 'active',
  },
  {
    id: 'p13',
    firstName: 'Nate',
    lastName: '',
    status: 'active',
  },
  {
    id: 'p14',
    firstName: 'Nestor',
    lastName: '',
    status: 'active',
    notes: "Brother's account also in system"
  },
  {
    id: 'p15',
    firstName: 'Nestor',
    lastName: '',
    status: 'active',
    notes: "Brother"
  },
  {
    id: 'p16',
    firstName: 'Zach',
    lastName: '',
    status: 'active',
    notes: "Mother's account also in system"
  }
];