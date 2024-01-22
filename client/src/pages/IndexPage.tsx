import { trpc } from "../utils/trpc";
export default function IndexPage() {
  const userQuery = trpc.greeting.useQuery();

  return <div>{userQuery.data}</div>;
}
