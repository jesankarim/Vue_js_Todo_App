export interface Student {
  id: number | null;
  name: string;
  subject: string;
  cgpa: number | null;
}

export  const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    subject: "Mathematics",
    cgpa: 3.75,
  },
  {
    id: 2,
    name: "Jane Smith",
    subject: "Physics",
    cgpa: 2.90,
  },
  {
    id: 3,
    name: "Alice Johnson",
    subject: "Computer Science",
    cgpa: 3.85,
  },
  {
    id: 4,
    name: "Shakib all hasan",
    subject: "Bangla",
    cgpa: 3.32,
  },
];
