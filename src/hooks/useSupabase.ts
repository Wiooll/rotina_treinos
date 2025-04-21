import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { Database } from "../types/supabase";

export function useSupabase() {
  const { getToken } = useAuth();
  const [supabaseToken, setSupabaseToken] = useState<string | null>(null);

  useEffect(() => {
    const updateSupabaseToken = async () => {
      try {
        const token = await getToken({ template: "supabase" });
        setSupabaseToken(token);
      } catch (error) {
        console.error("Erro ao obter token do Supabase:", error);
        setSupabaseToken(null);
      }
    };

    updateSupabaseToken();
  }, [getToken]);

  const supabase = useMemo(() => {
    return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: supabaseToken ? `Bearer ${supabaseToken}` : "",
          },
        },
      }
    );
  }, [supabaseToken]);

  return supabase;
} 