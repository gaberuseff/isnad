import {supabase} from "./supabase";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const {data: profile} = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  const role = profile?.role || data.user.user_metadata?.role;

  return {
    user: data.user,
    session: data.session,
    profile,
    role,
  };
}

export async function logout() {
  const {error} = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const {
    data: {session},
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const {
    data: {user},
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const {data: profile, error: profileError} = await supabase
    .from("profiles")
    .select("id, name, email, role, is_active")
    .eq("id", user.id)
    .single();

  if (profileError) {
    return {
      user,
      profile: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.user_metadata?.full_name,
        role: user.user_metadata?.role,
        is_active: true,
      },
    };
  }

  return {
    user,
    profile,
  };
}
