import { useDebounce } from "./index";
import { useDebounceFn } from "@vueuse/core";
const handle = (a: number, b: number) => {};
const test = useDebounce(handle, 2000);

const test1 = useDebounceFn(handle);
test(1, 1);
test1(3, 5);
