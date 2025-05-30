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

export type connections = {
  _id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  about: string;
  skills: string[];
  age: number;
  gender: string;
};

export type requests = {
  _id: string;
  fromUserId: {
    _id: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
    about: string;
    skills: string[];
    age: number;
    gender: string;
  };
  toUserId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};

export type feedData = {
  _id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  about: string;
  skills: string[];
};
