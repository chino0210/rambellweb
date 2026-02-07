// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({}), // Lo dejamos vacío aquí, la lógica irá en el otro
  ],
} satisfies NextAuthConfig;