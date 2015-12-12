/**
 * @module natron
 * build
 */
import {resolve} from "path";
import {task} from "natron";
import {src, dest} from "natron-vinyl";
import {transform} from "vinyl-tf-babel";

const PKG_DIR = resolve(__dirname, "..");

function builder(target: string, options?: Object): Function {
  return (pkg: string) => {
    let pkgDir = resolve(PKG_DIR, "packages", pkg);

    return (src(resolve(pkgDir, "src", "**/*.js"))
      .pipe(transform(options))
      .pipe(dest(resolve(pkgDir, "dist", target)))
    );
  };
}

let builderTasks = {
  "cjs": task(builder("cjs", {
    "babelrc": false,
    "plugins": [
      "transform-flow-strip-types",
      "transform-object-assign",
    ],
    "presets": [
      "es2015",
      "stage-0",
    ],
  })),
  "es6": task(builder("es6", {
    "babelrc": false,
    "plugins": [
      "transform-flow-strip-types",
    ],
    "presets": [
      "stage-0",
    ],
  })),
};

export function build(pkg: string, ...targets: string): Promise {
  /* eslint-disable no-console */
  if (!pkg) {
    console.error("No package specified");
    return;
  }
  if (!targets.length) {
    targets = ["cjs"];
  }

  let tasks = [];
  for (let target of targets) {
    if (!builderTasks[target]) {
      console.error(`No builder for ${target}`);
      return;
    }
    tasks.push(builderTasks[target]);
  }

  console.log(`Building: package = ${pkg}, targets = ${targets.join(", ")}`);

  return task([tasks]).run(pkg);
}
