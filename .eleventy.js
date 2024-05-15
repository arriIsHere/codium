/**
 * Copyright 2024 Arriana Blais
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 */

const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginWebC = require('@11ty/eleventy-plugin-webc');
const sass = require('sass');
const path = require('path');

 module.exports = (eleventyConfig) => {
 
	 eleventyConfig.addPlugin(syntaxHighlight);
	 eleventyConfig.addPlugin(pluginWebC, {
		components: "_webc/**/*.webc",
	 });

	 eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		compile: async function (inputContent, inputPath) {
		  // Skip files like _fileName.scss
		  let parsed = path.parse(inputPath);
		  if (parsed.name.startsWith("_")) {
			return;
		  }
	  
		  // Run file content through Sass
		  let result = sass.compileString(inputContent, {
			loadPaths: [parsed.dir || "."],
			sourceMap: false, // or true, your choice!
		  });
	  
		  // Allow included files from @use or @import to
		  // trigger rebuilds when using --incremental
		  this.addDependencies(inputPath, result.loadedUrls);
	  
		  return async () => {
			return result.css;
		  };
		},
	  });
 
	 return {
		 templateFormats: [
			"scss",
			"css",
			"md",
			"html",
			"jpg",
			"png",
			"gif",
			"ico",
			"svg",
			"njk",
			"ttf",
			"otf",
			"woff",
			"woff2",
		 ],
		 passthroughFileCopy: true,
	 };
 };