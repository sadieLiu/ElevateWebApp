// data types for tables and interface

export interface Data {
  userId: number;
  tutorId: number;
  userName: string;
  passwordHash: string;
  id: number;
  name: string;
  subjects: string;
  availability: string;
  birthday: string;
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export default Data;