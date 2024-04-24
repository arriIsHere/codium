/**
 * Copyright 2021 Arriana Blais
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 */

const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginWebC = require('@11ty/eleventy-plugin-webc');

 module.exports = (eleventyConfig) => {
 
	 eleventyConfig.addPlugin(syntaxHighlight);
	 eleventyConfig.addPlugin(pluginWebC);
 
	 return {
		 templateFormats: [
			 "md",
			 "html",
			 "css",
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
		 passthroughFileCopy: true
	 }
 }