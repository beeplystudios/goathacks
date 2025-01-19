import { useRouter } from "expo-router";
import { BarcodeScanner } from "../components/BarcodeScanner";
import { trpc } from "../lib/trpc";

export default function CheckIn() {
  const router = useRouter();
  const mutation = trpc.busSession.create.useMutation();

  return (
    <BarcodeScanner
      onScan={async (evt) => {
        await mutation.mutateAsync({ routeId: evt.data });

        router.replace({
          pathname: "/route/[id]",
          params: {
            id: evt.data,
          },
        });
      }}
    />
  );
}
