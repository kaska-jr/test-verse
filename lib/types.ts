type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string | null;
  number: string;
  username: string;
  hashedPassword: string;
  createdAt: string; // or Date if you'll parse it
  updatedAt: string; // or Date if you'll parse it
};
