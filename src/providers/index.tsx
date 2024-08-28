import RoutesProvider from "./routes.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export default function Provider() {
  return (
    <QueryClientProvider client={client}>
      <RoutesProvider />;
    </QueryClientProvider>
  );
}
