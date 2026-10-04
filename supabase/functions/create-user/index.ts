import {createClient} from "npm:@supabase/supabase-js@2";
import {corsHeaders} from "../_shared/cors.ts";

interface CreateUserPayload {
  name: string;
  email: string;
  password?: string;
  role?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {headers: corsHeaders});
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return new Response(
        JSON.stringify({
          error: "إعدادات السيرفر غير مكتملة (Missing Service Role Key)",
        }),
        {
          status: 500,
          headers: {...corsHeaders, "Content-Type": "application/json"},
        },
      );
    }

    let body: CreateUserPayload;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({error: "بيانات الطلب غير صالحة"}), {
        status: 400,
        headers: {...corsHeaders, "Content-Type": "application/json"},
      });
    }

    const {name, email, password, role} = body;

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({error: "الاسم والبريد الإلكتروني وكلمة المرور مطلوبة"}),
        {
          status: 400,
          headers: {...corsHeaders, "Content-Type": "application/json"},
        },
      );
    }

    // Create Supabase Admin client with service_role key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Create user in Supabase Auth
    const {data: newUserData, error: createError} =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          name,
          full_name: name,
          role: role || "technician",
        },

      });

    if (createError) {
      console.error("Error creating user:", createError);
      return new Response(JSON.stringify({error: createError.message}), {
        status: 400,
        headers: {...corsHeaders, "Content-Type": "application/json"},
      });
    }

    return new Response(
      JSON.stringify({
        message: "تم إنشاء المستخدم بنجاح",
        user: newUserData.user,
      }),
      {
        status: 200,
        headers: {...corsHeaders, "Content-Type": "application/json"},
      },
    );
  } catch (error) {
    console.error("Unhandled error:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return new Response(JSON.stringify({error: message}), {
      status: 500,
      headers: {...corsHeaders, "Content-Type": "application/json"},
    });
  }
});
