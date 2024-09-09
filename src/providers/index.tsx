import RoutesProvider from "./routes.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      placeholderData: (prev: any) => prev, // Use previous data as placeholder while fetching new data
    },
  },
});

export default function Provider() {
  return (
    <QueryClientProvider client={client}>
      <RoutesProvider />
    </QueryClientProvider>
  );
}
