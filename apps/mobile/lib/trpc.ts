import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@goathacks/trpc/types';
 
export const trpc = createTRPCReact<AppRouter>();