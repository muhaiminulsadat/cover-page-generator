#!/usr/bin/env node
/**
 * Antigravity PreInvocation Hook Handler
 * Reads JSON context from stdin and outputs hook injection JSON to stdout.
 */

process.stdin.setEncoding("utf8");

process.stdin.on("data", () => {
  // Consume incoming data stream
});

process.stdin.on("end", () => {
  try {
    const output = {
      injectSteps: [
        {
          ephemeralMessage: "[Agent Workflow Guard] Ensure permission is obtained before any structural/schema/API change, and run /thermo-nuclear-code-quality-review after coding."
        }
      ]
    };
    process.stdout.write(JSON.stringify(output));
  } catch {
    process.stdout.write(JSON.stringify({ injectSteps: [] }));
  }
});
