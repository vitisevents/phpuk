const htmlmin = require('html-minifier')
const fg = require('fast-glob')

// Run search for images in /gallery and /sponsors
const galleryImages = fg.sync(['**/promo-photos/*', '!**/dist'])
const allImages = fg.sync(['**/photos/*', '!**/dist'])

module.exports = eleventyConfig => {
  // Add a readable date formatter filter to Nunjucks
  eleventyConfig.addFilter('dateDisplay', require('./filters/dates.js'))

  // Add a HTML timestamp formatter filter to Nunjucks
  eleventyConfig.addFilter('htmlDateDisplay', require('./filters/timestamp.js'))

  // Minify our HTML
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
      return minified
    }
    return content
  })

  // Create collection of gallery images
  eleventyConfig.addCollection('photos', function(collection) {
    return galleryImages
  })

  // Create collection of allimages
  eleventyConfig.addCollection('allphotos', function(collection) {
      return allImages
  })

  // Layout aliases
  eleventyConfig.addLayoutAlias('default', 'layouts/default.njk')
  eleventyConfig.addLayoutAlias('video', 'layouts/video.njk')
  eleventyConfig.addLayoutAlias('archive', 'layouts/archive.njk')

  // Include our static assets
  eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPassthroughCopy('javascript')
  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('webfonts')

  return {
    templateFormats: ['md', 'njk'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,

    dir: {
      input: 'site',
      output: 'dist',
      includes: 'includes',
      data: 'globals'
    }
  }
}
