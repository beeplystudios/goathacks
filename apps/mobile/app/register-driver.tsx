import { useRouter } from "expo-router";
import { BarcodeScanner } from "../components/BarcodeScanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterDriver() {
  const router = useRouter();

  return (
    <BarcodeScanner
      onScan={async (evt) => {
        // validate the barcode in some way
        try {
          await AsyncStorage.setItem("driver-certificate", evt.data);
          router.replace({
            pathname: "/driver",
          });
        } catch (e) {}
      }}
    />
  );
}
