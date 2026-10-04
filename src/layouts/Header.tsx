import LogoutBtn from "../features/auth/components/LogoutBtn";
import TheemToggle from "../ui/TheemToggle";
import User from "./User";

function Header() {
  return (
    <header className="px-4 py-2.5 border-b border-border backdrop-blur-sm flex items-center justify-between">
      <User />

      <div className="flex items-center gap-2">
        <TheemToggle />
        <LogoutBtn />
      </div>
    </header>
  );
}

export default Header;
