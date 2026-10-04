import {supabase} from "./supabase";
import type {UserFormData} from "../types";

export async function getUsers() {
  const {data, error} = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", {ascending: false});

  if (error) {
    console.error("Error fetching users from profiles:", error);
    throw new Error(error.message || "فشل تحميل بيانات المستخدمين");
  }

  return data;
}

export async function createUser(userData: UserFormData) {
  const {data, error} = await supabase.functions.invoke("create-user", {
    body: userData,
  });

  if (error) {
    console.error("Error creating user via edge function:", error);
    throw new Error(error.message || "حدث خطأ أثناء إنشاء حساب المستخدم");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data?.user;
}

export async function deleteUser(userId: string) {
  const {data, error} = await supabase.functions.invoke("delete-user", {
    body: {userId},
  });

  if (error) {
    console.error("Error deleting user via edge function:", error);
    throw new Error(error.message || "حدث خطأ أثناء حذف المستخدم");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}
