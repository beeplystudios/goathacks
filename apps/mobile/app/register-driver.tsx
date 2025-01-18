import { BarcodeScanner } from "../components/BarcodeScanner";

export default function CheckIn() {
  return <BarcodeScanner redirect={"/(tabs)/driver"} />;
}
