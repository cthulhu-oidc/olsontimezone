const fs = require('fs');
const assert = require('assert');
const { execSync } = require('child_process');

const tag = 'next';
const packageJsonFilePath = './package.json';

const packageJsonValue = JSON.parse(fs.readFileSync(packageJsonFilePath).toString());
const { majorMinor, patch } = parsePackageJsonVersion(packageJsonValue.version);
const prereleasePatch = getPrereleasePatch(tag, patch);

// Modify the package.json structure
packageJsonValue.version = `${majorMinor}.${prereleasePatch}`;

fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJsonValue, /*replacer:*/ undefined, /*space:*/ 2));

function getPrereleasePatch(tag, plainPatch) {
  // We're going to append a representation of the current time at the end of the current version.
  // String.prototype.toISOString() returns a 24-character string formatted as 'YYYY-MM-DDTHH:mm:ss.sssZ',
  // but we'd prefer to just remove separators and limit ourselves to YYYYMMDD.
  // UTC time will always be implicit here.
  const now = new Date();
  const timeStr = now.toISOString().replace(/:|T|\.|-/g, "").slice(0, 8);
  const shortHash = getShortGitCommitHash();

  return `${plainPatch}-${tag}.${timeStr}.${shortHash}`;
}

function getShortGitCommitHash() {
  return (
    process.env.GITHUB_SHA && process.env.GITHUB_SHA.slice(-8) ||
    execSync('git rev-parse --short HEAD').toString().trim()
  );
}

function parsePackageJsonVersion(versionString) {
  const versionRgx = /(\d+\.\d+)\.(\d+)($|\-)/;
  const match = versionString.match(versionRgx);
  assert(match !== null, "package.json 'version' should match " + versionRgx.toString());
  return { majorMinor: match[1], patch: match[2] };
}
