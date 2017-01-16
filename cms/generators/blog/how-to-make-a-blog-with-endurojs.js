{
	title: 'How to create a blog with enduro.js',
	$date_value: '2017-01-16',
	$date_type: 'date',
	date: 'Monday, 16 January, 2017',
	published: true,
	$doc_markdown: true,
	$doc_type: 'textarea',
	doc: 'Complete example files is available at: https://github.com/Gottwik/enduro_samples/tree/master/simple_blog\n\nThis is a short guide on how to get a simple blog up and running on your website in these easy 4 steps:\n\n## Create blog entries\nEach entry is nothing more than a [generator item](http://www.endurojs.com/docs/generators). To set it up create a template in `$$/pages/generators/blog.hbs`. To keep it simple, just have this there:\n\n```\n<article>\n	<h1>{{blog_title}}</h1>\n	<p>{{blog_text}}</p>\n</article>\n```\n\nAs you can see, each blog entry will have it\'s title and text. So let\'s set up the content file. Create a first blog entry in `$$/cms/generators/blog/hello-blog.js` with this content:\n\n```\n{\n	blog_title: \'This is a hello blog entry\',\n	blog_text: \'You just learned how to create a blog with enduro.js\'\n}\n```\n\nRun `enduro` and notice your blog page is live at `localhost:3000/blog/hello-blog`. Nice, right?\n\n## Create blog list page\nNow we need to create a page that will display all the blog entries. Just go ahead and create file $$/pages/blog.hbs with this content:\n\n```\n{{#blog}}\n    {{#each this}}\n        <article>\n            <h2>{{blog_entry.title}}</h2>\n            <p>{{{blog_entry.text}}}</p>\n            <a href="/blog/{{page_slug}}">Read more...</a>\n        </article>\n    {{/each}}\n{{/blog}}\n```\n\nNotice the **blog** helper. This helper will provide the list of articles. Go ahead and create it in $$/assets/hbs_helpers/blog.js with this content:\n\n```\nvar _ = require(\'lodash\')\nvar Promise = require(\'bluebird\')\n\n// pagelist_generator helps to fetch all the blog entries\nvar pagelist_generator = require(ENDURO_FOLDER + \'/libs/build_tools/pagelist_generator\')\n\n// flat_file_handler will load each blog entry\nvar flat_file_handler = require(ENDURO_FOLDER + \'/libs/flat_utilities/flat_file_handler\')\n\n__templating_engine.registerHelper(\'blog\', function (options) {\n\n    // will store all the blog entries\n    var blog_entries\n\n    // get_cms_list will return a structured list of all pages in a project\n    return pagelist_generator.get_cms_list()\n        .then((pagelist) => {\n\n            // will store the promises from reading all the blog entries\n            var get_content_promises = []\n\n            blog_entries = _.chain(pagelist.structured.blog)\n                .filter((o) => { return typeof o === \'object\' }).value() // filter pages only\n\n            // goes through all the blog entries and loads their content\n            for (page_id in blog_entries) {\n                var page = blog_entries[page_id]\n\n                function get_content (page) {\n                    get_content_promises.push(flat_file_handler.load(page.fullpath).then((content) => { page.content = content }))\n                }\n\n                get_content(page)\n            }\n\n            return Promise.all(get_content_promises)\n        })\n        .then(() => {\n\n            // pass blog entries as context for the template\n            return options.fn(blog_entries)\n        })\n})\n```\n\nThis implementation uses [lodash](https://github.com/lodash/lodash) and [bluebird](https://github.com/petkaantonov/bluebird) promises. These are used in enduro.js, but we should still declare them as dependencies of this particular project by running `npm i lodash bluebird -S`\n\nHey, we are done. Your blog list is accessible on `localhost:3000/blog`\n\n![](https://s3-eu-west-1.amazonaws.com/enduro.website/direct_uploads/1484569131_cp.png)\n\n## Adding more blog entries\n\nYou can always just create another file in the $$/cms/generators/blog folder which will create more pages for you.\n\nNicer way to do this is to add a blog template at $$/cms/generators/blog/blog.js. This will defines the structure for a blog entry:\n\n```\n{\n	blog_title: \'\',\n	blog_text: \'\'\n}\n```\n\nNow add a admin user by running `enduro addadmin test test` which you use to login at `localhost:5000/admin`. Now you can add blog articles using the admin as well.\n\n![](https://s3-eu-west-1.amazonaws.com/enduro.website/direct_uploads/1484570932_cp.png)\n\n## Next steps\n\nYou know...\n\n![](https://turtleboysports.files.wordpress.com/2014/08/dr-evil-pageviews-meme.png)',
	$abstracted_content_hidden: true,
	abstracted_content: {
		marked_doc: '<p>Complete example files is available at: <a href="https://github.com/Gottwik/enduro_samples/tree/master/simple_blog">https://github.com/Gottwik/enduro_samples/tree/master/simple_blog</a></p>\n<p>This is a short guide on how to get a simple blog up and running on your website in these easy 4 steps:</p>\n<h2 id="create-blog-entries">Create blog entries</h2>\n<p>Each entry is nothing more than a <a href="http://www.endurojs.com/docs/generators">generator item</a>. To set it up create a template in <code><span class="markdown_folder">/pages/generators/blog.hbs</span></code>. To keep it simple, just have this there:</p>\n<pre><code>&lt;article&gt;\n    &lt;h1&gt;{{blog_title}}&lt;/h1&gt;\n    &lt;p&gt;{{blog_text}}&lt;/p&gt;\n&lt;/article&gt;\n</code></pre><p>As you can see, each blog entry will have it&#39;s title and text. So let&#39;s set up the content file. Create a first blog entry in <code><span class="markdown_folder">/cms/generators/blog/hello-blog.js</span></code> with this content:</p>\n<pre><code>{\n    blog_title: &#39;This is a hello blog entry&#39;,\n    blog_text: &#39;You just learned how to create a blog with enduro.js&#39;\n}\n</code></pre><p>Run <code>enduro</code> and notice your blog page is live at <code>localhost:3000/blog/hello-blog</code>. Nice, right?</p>\n<h2 id="create-blog-list-page">Create blog list page</h2>\n<p>Now we need to create a page that will display all the blog entries. Just go ahead and create file <span class="markdown_folder">/pages/blog.hbs</span> with this content:</p>\n<pre><code>{{#blog}}\n    {{#each this}}\n        &lt;article&gt;\n            &lt;h2&gt;{{blog_entry.title}}&lt;/h2&gt;\n            &lt;p&gt;{{{blog_entry.text}}}&lt;/p&gt;\n            &lt;a href=&quot;/blog/{{page_slug}}&quot;&gt;Read more...&lt;/a&gt;\n        &lt;/article&gt;\n    {{/each}}\n{{/blog}}\n</code></pre><p>Notice the <strong>blog</strong> helper. This helper will provide the list of articles. Go ahead and create it in <span class="markdown_folder">/assets/hbs_helpers/blog.js</span> with this content:</p>\n<pre><code>var _ = require(&#39;lodash&#39;)\nvar Promise = require(&#39;bluebird&#39;)\n\n// pagelist_generator helps to fetch all the blog entries\nvar pagelist_generator = require(ENDURO_FOLDER + &#39;/libs/build_tools/pagelist_generator&#39;)\n\n// flat_file_handler will load each blog entry\nvar flat_file_handler = require(ENDURO_FOLDER + &#39;/libs/flat_utilities/flat_file_handler&#39;)\n\n__templating_engine.registerHelper(&#39;blog&#39;, function (options) {\n\n    // will store all the blog entries\n    var blog_entries\n\n    // get_cms_list will return a structured list of all pages in a project\n    return pagelist_generator.get_cms_list()\n        .then((pagelist) =&gt; {\n\n            // will store the promises from reading all the blog entries\n            var get_content_promises = []\n\n            blog_entries = _.chain(pagelist.structured.blog)\n                .filter((o) =&gt; { return typeof o === &#39;object&#39; }).value() // filter pages only\n\n            // goes through all the blog entries and loads their content\n            for (page_id in blog_entries) {\n                var page = blog_entries[page_id]\n\n                function get_content (page) {\n                    get_content_promises.push(flat_file_handler.load(page.fullpath).then((content) =&gt; { page.content = content }))\n                }\n\n                get_content(page)\n            }\n\n            return Promise.all(get_content_promises)\n        })\n        .then(() =&gt; {\n\n            // pass blog entries as context for the template\n            return options.fn(blog_entries)\n        })\n})\n</code></pre><p>This implementation uses <a href="https://github.com/lodash/lodash">lodash</a> and <a href="https://github.com/petkaantonov/bluebird">bluebird</a> promises. These are used in enduro.js, but we should still declare them as dependencies of this particular project by running <code>npm i lodash bluebird -S</code></p>\n<p>Hey, we are done. Your blog list is accessible on <code>localhost:3000/blog</code></p>\n<p><img src="https://s3-eu-west-1.amazonaws.com/enduro.website/direct_uploads/1484569131_cp.png" alt=""></p>\n<h2 id="adding-more-blog-entries">Adding more blog entries</h2>\n<p>You can always just create another file in the <span class="markdown_folder">/cms/generators/blog</span> folder which will create more pages for you.</p>\n<p>Nicer way to do this is to add a blog template at <span class="markdown_folder">/cms/generators/blog/blog.js.</span> This will defines the structure for a blog entry:</p>\n<pre><code>{\n    blog_title: &#39;&#39;,\n    blog_text: &#39;&#39;\n}\n</code></pre><p>Now add a admin user by running <code>enduro addadmin test test</code> which you use to login at <code>localhost:5000/admin</code>. Now you can add blog articles using the admin as well.</p>\n<p><img src="https://s3-eu-west-1.amazonaws.com/enduro.website/direct_uploads/1484570932_cp.png" alt=""></p>\n<h2 id="next-steps">Next steps</h2>\n<p>You know...</p>\n<p><img src="https://turtleboysports.files.wordpress.com/2014/08/dr-evil-pageviews-meme.png" alt=""></p>\n',
		contents: [
			{
				heading: 'Create blog entries',
				level: '2',
				link: 'create-blog-entries'
			},
			{
				heading: 'Create blog list page',
				level: '2',
				link: 'create-blog-list-page'
			},
			{
				heading: 'Adding more blog entries',
				level: '2',
				link: 'adding-more-blog-entries'
			},
			{
				heading: 'Next steps',
				level: '2',
				link: 'next-steps'
			}
		]
	},
	teaser: {
		doc: ''
	}
}