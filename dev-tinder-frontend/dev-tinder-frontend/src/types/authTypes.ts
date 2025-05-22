export interface Inputs {
  emailId: string;
  password: string;
  // errors: string;
}

export interface logindata {
  message: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
