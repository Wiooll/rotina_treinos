import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export default authMiddleware({
  async afterAuth(auth, req) {
    if (auth.userId) {
      try {
        const { data: existingUser } = await supabaseAdmin
          .from("users")
          .select()
          .eq("clerk_id", auth.userId)
          .single();

        if (!existingUser && auth.user) {
          await supabaseAdmin.from("users").insert({
            clerk_id: auth.userId,
            email: auth.user.emailAddresses[0]?.emailAddress,
            name: `${auth.user.firstName} ${auth.user.lastName}`.trim(),
          });
        }
      } catch (error) {
        console.error("Erro ao sincronizar usuário com Supabase:", error);
      }
    }

    return NextResponse.next();
  },
  publicRoutes: ["/", "/login", "/sign-up"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 