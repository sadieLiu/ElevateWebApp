// filler data and create data function
//delete this when we get data from database and use that instead

import Data from "./tableTypes";

function createData(
  id: number,
  name: string,
  grade: string,
  school: string,
  birthday: string,
  location: string,
): Data {
  return {
    id, name, grade, school, birthday, location
  };
}

export const rows = [
  createData(1, 'Cupcake', '305', '3.7', '67', 'edu'),
  createData(2, 'Donut', '452', '25.0', '51', 'edu'),
  createData(3, 'Eclair', '262', '16.0', '24', 'edu'),
  createData(4, 'Frozen yoghurt', '159', '6.0', '24', 'edu'),
  createData(5, 'Gingerbread', '356', '16.0', '49', 'edu'),
  createData(6, 'Honeycomb', '408', '3.2', '87',  'edu'),
  createData(7, 'Ice cream sandwich', '237', '9.0', '9.9', 'edu'),
  createData(8, 'Jelly Bean', '375', '0.0', '94', 'edu'),
  createData(9, 'KitKat', '518', '26.0', '65', 'edu'),
  createData(10, 'Lollipop', '392', '0.2', '98',  'edu'),
  createData(11, 'Marshmallow', '318', '0', '81',  'edu'),
  createData(12, 'Nougat', '360', '19.0', '9',  'edu'),
  createData(13, 'Oreo', '437', '18.0', '63', 'edu'),
];
