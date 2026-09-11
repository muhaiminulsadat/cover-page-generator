#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const isWindows = process.platform === "win32";
const npmCmd = isWindows ? "npm.cmd" : "npm";
const npxCmd = isWindows ? "npx.cmd" : "npx";

function runCheck(name, cmd, args) {
  process.stdout.write(`\n[CHECK] Running ${name}...\n`);
  const start = Date.now();
  const res = spawnSync(cmd, args, { stdio: "inherit", shell: isWindows });
  const duration = ((Date.now() - start) / 1000).toFixed(1);

  if (res.status === 0) {
    console.log(`[PASS] ${name} succeeded in ${duration}s`);
    return true;
  } else {
    console.error(`[FAIL] ${name} failed with exit code ${res.status} (${duration}s)`);
    return false;
  }
}

console.log("=== Verification Suite ===");
let passed = true;

// 1. TypeScript Compile Check
const tsPass = runCheck("TypeScript (tsc --noEmit)", npxCmd, ["tsc", "--noEmit"]);
if (!tsPass) passed = false;

// 2. ESLint Check
const lintPass = runCheck("ESLint (npm run lint)", npmCmd, ["run", "lint"]);
if (!lintPass) passed = false;

console.log("\n==========================");
if (passed) {
  console.log("Result: ALL CHECKS PASSED");
  process.exit(0);
} else {
  console.error("Result: CHECKS FAILED");
  process.exit(1);
}
