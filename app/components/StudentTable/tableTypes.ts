// data types for tables and interface

export interface Data {
  userId: number;
  studentId: number;
  userName:string;
  passwordHash:string;
  id: number;
  name: string;
  grade: string;
  school: string;
  birthday: string;
  location: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export default Data;