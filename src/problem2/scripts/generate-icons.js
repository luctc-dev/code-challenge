import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const iconsPath = path.join(__dirname, '../src/assets/tokens')
const indexTsPath = path.join(__dirname, '../src/assets/tokens/index.js')

const isInvalidToken = (name) => /[\s.-]/.test(name);

function generateIconImportPath(svgFile) {
  const moduleName = svgFile
    .replace('.svg', '')
    .toUpperCase()
  // const importPath = `import ${moduleName} from 'icons/${svgFile}'\n`
  const importPath = `import Token${moduleName} from './${svgFile}?react'\n`

  return {
    moduleName,
    importPath
  }
}

function loadIconsPath() {
  fs.readdir(iconsPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }

    let content =
      '// 🔴 DO NOT EDIT — This file is generated automatically.\n'
    let imports = ''
    let exports = ''
    let isDuplicated = false
    const listModuleName = {}

    files
      .filter((file) => file.endsWith('.svg'))
      .forEach((svgFile, idx, arr) => {
        const { moduleName, importPath } = generateIconImportPath(svgFile)

        if (isInvalidToken(moduleName)) {
          console.error('Invalid Token Name: ' + moduleName, importPath)
          return
        }

        if (listModuleName[moduleName]) {
          console.error('Duplicate Token Icon: ' + moduleName, importPath)
          isDuplicated = true
        }

        listModuleName[moduleName] = true
        const comma = arr.length - 1 === idx ? '' : ','

        imports += importPath
        exports += '  ' + `Token${moduleName}` + `${comma}\n`
      })

    if (isDuplicated) {
      return
    }

    exports = `\nexport {\n` + exports + '}\n'

    content += imports
    content += exports

    try {
      fs.writeFileSync(indexTsPath, content)
    } catch (err) {
      console.error(err)
    }
  })
}

loadIconsPath()