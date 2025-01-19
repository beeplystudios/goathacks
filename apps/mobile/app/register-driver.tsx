import { useRouter } from "expo-router";
import { BarcodeScanner } from "../components/BarcodeScanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { trpc } from "../lib/trpc";

export default function RegisterDriver() {
  const router = useRouter();
  const registerDriver = trpc.driver.register.useMutation();

  return (
    <BarcodeScanner
      onScan={async (evt) => {
        // validate the barcode in some way
        try {
          await registerDriver.mutateAsync({
            key: evt.data,
          });

          router.replace({
            pathname: "/driver",
          });
        } catch (e) {}
      }}
    />
  );
}
