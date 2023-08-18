import {QueryClient} from '@tanstack/react-query';

const MAX_RETRIES = 3;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: failureCount => {
        return failureCount < MAX_RETRIES;
      },
    },
  },
});

export default queryClient;
