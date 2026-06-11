import { Script, SCRIPT_OPTIONS } from "@/types/Script";
import { Option } from "@/types/Option";

export const scriptOptions: Option<Script>[] = SCRIPT_OPTIONS.map((value) => ({
  label: value,
  value,
}));
