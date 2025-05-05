#!/usr/bin/env node
import fs from 'fs';
import postcss from 'postcss';
import prefixer from './prefixer.js';
import selectorParser from 'postcss-selector-parser';
import { program } from 'commander';

program
  .name('npx @camilaprav/makelovenotwar')
  .description('Prefixes all class selectors in a CSS file with a given namespace')
  .argument('<prefix>', 'Prefix to prepend to all class selectors')
  .argument('<input>', 'Input CSS file path')
  .option('-o, --output <output>', 'Output file path (default: stdout)')
  .action(async (prefix, input, options) => {
    try {
      const css = fs.readFileSync(input, 'utf8');
      const result = await postcss([
        prefixer(prefix, { postcss, selectorParser })
      ]).process(css, { from: input, to: options.output });
      if (options.output) {
        fs.writeFileSync(options.output, result.css);
        console.log(`Wrote output to ${options.output}`);
      } else {
        process.stdout.write(result.css);
      }
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  });

program.parse();
