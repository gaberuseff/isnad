import {Button, Spinner} from "@heroui/react";
import {IconLogout} from "@tabler/icons-react";
import useLogout from "../hooks/useLogout";

function LogoutBtn() {
  const {logout, isLoggingOut} = useLogout();

  return (
    <Button
      size="sm"
      variant="secondary"
      isIconOnly
      onPress={() => logout()}
      isDisabled={isLoggingOut}>
      {isLoggingOut ? <Spinner size="sm" /> : <IconLogout />}
    </Button>
  );
}

export default LogoutBtn;
