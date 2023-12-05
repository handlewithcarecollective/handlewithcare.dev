import { debounce } from "https://deno.land/std@0.208.0/async/debounce.ts";
import { compileCss } from "./css.ts";

console.log("Watching for updates...");

const debouncedUpdateStyles = debounce(async () => {
  await compileCss();
}, 200);

const watcher = Deno.watchFs(["./css/styles.css"]);

for await (const event of watcher) {
  const { paths } = event;

  paths.forEach(() => {
    debouncedUpdateStyles();
  });
}
