import { useRouter } from "expo-router";
import { BarcodeScanner } from "../components/BarcodeScanner";

export default function CheckIn() {
  const router = useRouter();

  return (
    <BarcodeScanner
      onScan={(evt) => {
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
