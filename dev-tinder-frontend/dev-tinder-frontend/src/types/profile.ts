export type User = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  about: string;
  skills: string | string[];
};

export type profile = {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  photoUrl: string;
  about: string;
  skills: string[];
  age: number;
  gender: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
