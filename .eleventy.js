module.exports = function (eleventyConfig) {
  // Output directory: _site

  // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("media");
  eleventyConfig.addPassthroughCopy("small/ppshop/images");
  eleventyConfig.addPassthroughCopy("small/masks/videos");

};