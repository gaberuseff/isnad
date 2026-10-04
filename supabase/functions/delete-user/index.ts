import {createClient} from "npm:@supabase/supabase-js@2";
import {corsHeaders} from "../_shared/cors.ts";

interface DeleteUserPayload {
  userId: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {headers: corsHeaders});
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return new Response(
        JSON.stringify({error: "إعدادات السيرفر غير مكتملة"}),
        {
          status: 500,
          headers: {...corsHeaders, "Content-Type": "application/json"},
        },
      );
    }

    let body: DeleteUserPayload;
    try {
      body = (await req.json()) as DeleteUserPayload;
    } catch {
      return new Response(JSON.stringify({error: "بيانات الطلب غير صالحة"}), {
        status: 400,
        headers: {...corsHeaders, "Content-Type": "application/json"},
      });
    }

    const {userId} = body;

    if (!userId) {
      return new Response(
        JSON.stringify({error: "معرف المستخدم (userId) مطلوب"}),
        {
          status: 400,
          headers: {...corsHeaders, "Content-Type": "application/json"},
        },
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // 1. Delete from profiles table
    const {error: profileError} = await supabaseAdmin
      .from("profiles")
      .delete()
      .eq("id", userId);

    if (profileError) {
      console.warn(
        "Notice: Error or no profile found in profiles table:",
        profileError.message,
      );
    }

    // 2. Delete from auth.users
    const {error: authError} =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (authError) {
      console.error("Error deleting user from Supabase auth:", authError);
      return new Response(JSON.stringify({error: authError.message}), {
        status: 400,
        headers: {...corsHeaders, "Content-Type": "application/json"},
      });
    }

    return new Response(JSON.stringify({message: "تم حذف المستخدم بنجاح"}), {
      status: 200,
      headers: {...corsHeaders, "Content-Type": "application/json"},
    });
  } catch (error) {
    console.error("Unhandled error in delete-user function:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return new Response(JSON.stringify({error: message}), {
      status: 500,
      headers: {...corsHeaders, "Content-Type": "application/json"},
    });
  }
});
