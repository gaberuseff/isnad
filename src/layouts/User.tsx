import useAuth from "../features/auth/hooks/useAuth";

function User() {
  const {profile} = useAuth();
  const name = profile?.name;

  return <div>أهلا, {name || "مجهول"}</div>;
}

export default User;
