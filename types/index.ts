export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name?: string;
  email?: string;
};

export type INewHospital = {
  userId: string;
  name: string;
  picture: URL;
  latitude: string;
  longitude: string;
  website?: string;
  number?: string;
  street?: string;
  city: string;
  country: string;
  emails: string[];
  phone_numbers: string[];
  specialisations?: string[];
};

export type IUpdateHospital = {
  hospitalId: string;
  name?: string;
  picture?: URL;
  latitude?: string;
  longitude?: string;
  website?: string;
  number?: string;
  street?: string;
  city?: string;
  country?: string;
  emails?: string[];
  phone_numbers?: string[];
  specialisations?: string[];
};

export type IUser = {
  id: string;
  name: string;
  email: string;
};

export type INewUser = {
  name: string;
  email: string;
  password: string;
};
