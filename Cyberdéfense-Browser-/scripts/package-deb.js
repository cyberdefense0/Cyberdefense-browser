const packager = require('electron-packager');
const deb = require('electron-installer-debian');
const path = require('path');
const fs = require('fs');

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const outDir = path.join(rootDir, 'dist');
  const appName = 'CyberdefenseBrowser';
  const packageJson = require(path.join(rootDir, 'package.json'));
  const iconPath = path.join(rootDir, 'build', 'icon.png');
  const hasIcon = fs.existsSync(iconPath);
  const appDir = path.join(outDir, `${appName}-linux-x64`);

  console.log('Packaging Electron app...');
  await packager({
    dir: rootDir,
    out: outDir,
    name: appName,
    executableName: 'cyberdefense-browser',
    platform: 'linux',
    arch: 'x64',
    overwrite: true,
    prune: true,
    asar: false,
    appVersion: packageJson.version,
    icon: hasIcon ? iconPath : undefined,
  });

  console.log('Building .deb installer...');
  if (!fs.existsSync(appDir)) {
    throw new Error(`Packaged app directory not found: ${appDir}`);
  }

  const targetDir = path.join(outDir, 'installers');
  fs.mkdirSync(targetDir, { recursive: true });

  await deb({
    src: appDir,
    dest: targetDir,
    arch: 'amd64',
    options: {
      name: 'cyberdefense-browser',
      productName: 'Cyberdéfense Browser',
      genericName: 'Cyberdéfense Browser',
      description: packageJson.description,
      maintainer: 'Cyberdéfense <cyberdefense@example.com>',
      section: 'network',
      homepage: 'https://example.com/',
      icon: hasIcon ? iconPath : undefined,
    },
  });

  console.log('Done. .deb installer created in:', targetDir);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
