// data types for tables and interface

export interface Data {
  id: number;
  name: string;
  subjects: string;
  availibility: string;
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