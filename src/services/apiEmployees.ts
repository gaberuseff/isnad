import {supabase} from "./supabase";
import type {EmployeeFormData} from "../types";

export async function getEmployees() {
  const {data, error} = await supabase
    .from("employees")
    .select("id, name, salary, birth_date, phone, position");

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch employees");
  }

  return data;
}

export async function createEmployee(newEmployee: EmployeeFormData) {
  const {data, error} = await supabase
    .from("employees")
    .insert([newEmployee])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message || "Failed to create employee");
  }

  return data;
}

export async function updateEmployee({
  id,
  employee,
}: {
  id: string;
  employee: Partial<EmployeeFormData>;
}) {
  const {data, error} = await supabase
    .from("employees")
    .update(employee)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message || "Failed to update employee");
  }

  return data;
}

export async function deleteEmployee(id: string) {
  const {error} = await supabase.from("employees").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete employee");
  }
}
