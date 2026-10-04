import {ToastProvider} from "@heroui/react";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import type {ReactNode} from "react";
import {ThemeProvider} from "./lib/theme";
import {queryClient} from "./lib/queryClient";

interface ProvidersProps {
  children: ReactNode;
}

function Providers({children}: ProvidersProps) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider placement="top" />
        {children}
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default Providers;
