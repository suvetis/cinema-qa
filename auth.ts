import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const users = [
          {
            id: '1',
            username: 'user1',
            password: 'root',
            email: 'admin@mail.com',
          },
        ];

        const user = users.find((user) => user.email === credentials?.email && user.password === credentials?.password);

        return user ? { id: user.id, name: user.username, email: user.email } : null;
      },
    }),
  ],
});
