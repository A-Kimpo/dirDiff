import fs from 'node:fs';
import path from 'node:path';

const isDirectory = (path) => fs.statSync(path).isDirectory();

const dirDarkLightDiff = (dirpath) => {
  const absolutePath = path.resolve(process.cwd(), dirpath);
  const data = fs.readdirSync(absolutePath);

  data.forEach((filename) => {
    const newPath = path.join(dirpath, filename);

    if (isDirectory(newPath)) dirDarkLightDiff(newPath);
  });

  if (data.includes('Dark')) {
    const { dark, light } = data
      .reduce((acc, filename) => {
        const newPath = path.join(dirpath, filename);

        if (isDirectory(newPath)) {
          const files = fs.readdirSync(newPath)
            .filter((k) => k.split('.').at(-1) === 'jpg');

          acc[filename.toLowerCase()].push(...files);
        }

        return acc;
      }, { dark: [], light: [] });

    if (dark.length !== light.length) {
      console.log(`Check: ${dirpath}`);
    }
  }

  return 'Complete!';
};

export default dirDarkLightDiff;
