import { configureServerSideSIWE } from "connectkit-next-siwe";

export const siweServer = configureServerSideSIWE({
  session: {
    cookieName: "connectkit-next-siwe",
    password: process.env.NEXTAUTH_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});