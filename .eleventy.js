/**
 * Copyright 2024 Arriana Blais
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 */

const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginWebC = require('@11ty/eleventy-plugin-webc');

 module.exports = (eleventyConfig) => {
 
	 eleventyConfig.addPlugin(syntaxHighlight);
	 eleventyConfig.addPlugin(pluginWebC, {
		components: "_webc/**/*.webc",
	 });

	 eleventyConfig.addExtension('webcss', {
		outputFileExtension: 'css',
		compile: async function(inputContent) {
			
			return async (data) => {
				const {WebC} = await import('@11ty/webc');
				const page = new WebC();
	
				page.setBundlerMode(true);
				page.setInputPath(inputContent.trim());
				const {css} = await page.compile();

				//Remove uneeded whitespace
				const startIndex  = css[0].search(/[^\s]/);
				const unspacedCss = css
					.join()
					.split('\n')
					.map(line => line.substring(startIndex-1));

				return unspacedCss.join('\n');
			};
		},
	 });
 
	 return {
		 templateFormats: [
			"webcss",
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