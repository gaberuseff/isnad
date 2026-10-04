export const ROUTES = {
  HOME: "/",
  ADMIN: "/admin",
  ADMIN_EMPLOYEES: "/admin/employees",
  ADMIN_CUSTOMERS: "/admin/customers",
  ADMIN_USERS: "/admin/users",
  ADMIN_REQUESTS: "/admin/requests",

  CALL_CENTER: "/call-center",
  CALL_CENTER_REQUESTS: "/call-center/requests",
};

export const USER_ROLES = {
  ADMIN: "admin",
  CALL_CENTER: "call_center",
  TECHNICIAN: "technician",
} as const;

export const USER_ROLES_OPTIONS = [
  {value: USER_ROLES.ADMIN, label: "أدمن"},
  {value: USER_ROLES.CALL_CENTER, label: "كول سنتر"},
  {value: USER_ROLES.TECHNICIAN, label: "فني"},
];

export const USER_ROLE_LABELS: Record<string, string> = {
  [USER_ROLES.ADMIN]: "أدمن",
  [USER_ROLES.CALL_CENTER]: "كول سنتر",
  [USER_ROLES.TECHNICIAN]: "فني",
};

export function getDashboardPath(role?: string) {
  switch (role) {
    case USER_ROLES.ADMIN:
      return "/admin";
    case USER_ROLES.CALL_CENTER:
      return "/call-center";
    case USER_ROLES.TECHNICIAN:
      return "/technician";
    default:
      return "/login";
  }
}
