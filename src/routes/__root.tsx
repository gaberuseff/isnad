import {Outlet, createRootRouteWithContext} from "@tanstack/react-router";
import type useAuth from "../features/auth/hooks/useAuth";

export interface MyRouterContext {
  user: ReturnType<typeof useAuth>["user"];
  auth: ReturnType<typeof useAuth>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div dir="rtl">
      <Outlet />
    </div>
  );
}
