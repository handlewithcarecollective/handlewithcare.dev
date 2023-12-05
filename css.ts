import browserslist from "https://esm.sh/browserslist@4.22.2";
import init, {
  browserslistToTargets,
  transform,
} from "https://esm.sh/lightningcss-wasm@1.22.1";

await init();

const targets = browserslistToTargets(browserslist("defaults"));

async function buildStyles(path: string) {
  try {
    const css = await Deno.readTextFile(path);

    const { code: outputCss } = transform({
      filename: path,
      code: new TextEncoder().encode(css),
      minify: false,
      targets,
    });

    const outputDir = "./public/css";
    const outputPath = `${outputDir}/styles.css`;
    const decoder = new TextDecoder();

    try {
      await Deno.writeTextFile(outputPath, decoder.decode(outputCss));
    } catch (error: unknown) {
      if (error instanceof Deno.errors.NotFound) {
        await Deno.mkdir(outputDir, { recursive: true });
        await Deno.writeTextFile(outputPath, decoder.decode(outputCss));
      }
      throw error;
    }
  } catch (error: unknown) {
    console.error(`Error building styles for path ${path}: ${error as string}`);
  }
}

export async function compileCss() {
  await buildStyles("css/styles.css");
  console.log("Updated public/css/styles.css");
}

if (import.meta.main) {
  await compileCss();
}
