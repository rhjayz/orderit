import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../config/db";
import jwt from "jsonwebtoken";


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!,
            passReqToCallback: false,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await prisma.user.findUnique({
                    where: { googleID: profile.id },
                });

                if (!user) {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: profile.emails?.[0]?.value || "" },
                    });

                    if (existingUser) {
                        // Update googleID untuk user yang sudah ada
                        user = await prisma.user.update({
                            where: { email: profile.emails?.[0]?.value || "" },
                            data: { googleID: profile.id },
                        });
                    } else {
                        const email = profile.emails?.[0]?.value;
                        const secretToken = jwt.sign({ email }, process.env.SECRET_KEY!, { expiresIn: "1d",});
                        user = await prisma.user.create({
                            data: {
                                googleID: profile.id,
                                name: profile.displayName,
                                email: profile.emails?.[0]?.value || "",
                                secretToken: secretToken,
                                isVerified: true,
                                photo:null,
                            },
                        });
                    }
                }

                return done(null, user); // Penting untuk menyelesaikan autentikasi
            } catch (error) {
                return done(error, null); // Tangani error dengan benar
            }
        })
);

passport.serializeUser((user, done) => {
    done(null, user); 
});

passport.deserializeUser((user, done) => {
    done(null, user as any);
});

export default passport;