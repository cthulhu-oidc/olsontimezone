const fs = require('fs');
const assert = require('assert');

const tag = 'next';
const packageJsonFilePath = './package.json';

const packageJsonValue = JSON.parse(fs.readFileSync(packageJsonFilePath).toString());
const { majorMinor, patch } = parsePackageJsonVersion(packageJsonValue.version);
const prereleasePatch = getPrereleasePatch(tag, patch);

// Modify the package.json structure
packageJsonValue.version = `${majorMinor}.${prereleasePatch}`;

fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJsonValue, /*replacer:*/ undefined, /*space:*/ 2));

function getPrereleasePatch(tag, plainPatch) {
  const timeStr = Date.now();

  return `${plainPatch}-${tag}.${timeStr}`;
}

function parsePackageJsonVersion(versionString) {
  const versionRgx = /(\d+\.\d+)\.(\d+)($|\-)/;
  const match = versionString.match(versionRgx);
  assert(match !== null, "package.json 'version' should match " + versionRgx.toString());
  return { majorMinor: match[1], patch: match[2] };
}
