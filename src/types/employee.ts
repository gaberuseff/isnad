export interface Employee {
  id: string;
  name: string;
  phone: string;
  salary: number;
  birth_date: string;
  position: string;
}

export type EmployeeFormData = Omit<Employee, "id">;
