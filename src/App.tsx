import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Router } from "./Router"
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./app/contexts/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router />
        <Toaster />
      </AuthContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
