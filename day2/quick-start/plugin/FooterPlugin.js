const { ConcatSource } = require('webpack-sources')

class FooterPlugin {
  constructor(options) {
    console.log('FooterPlugin', options)
    this.options = options
  }

  apply(compiler) {
    // console.log('FooterPlugin: apply', compiler)
    compiler.hooks.compilation.tap('FooterPlugin', compilation => {
      compilation.hooks.processAssets.tap('FooterPlugin', () => {
        for (const chunk of compilation.chunks) {
          for (const file of chunk.files) {
            console.log('file', file); // bundle.js
            const comment = `/* ${ this.options.footer } */`;
            compilation.updateAsset(file, old => {
              return new ConcatSource(old, '\n', comment)
            })
          }
        }
      })

    })
  }

}

module.exports = FooterPlugin