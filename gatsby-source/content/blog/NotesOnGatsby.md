---
date: Jun 02, 2020 4:44 PM
title: Gatsby Development 101 - A Condensed Tutorial
description: "A condensed version of the standard Gatsby tutorial"
---

## Part 1: Gatsby Building Blocks

After creating the "hello world" site from the gatsby-cli, there are many such starters that allow you to start with more than nothing, using:

```ocaml
gatsby new [SITE_NAME] [GITHUB_URL]
```

So we're creating a new [SITE_NAME] by pulling from the starter located at [GITHUB_URL]

---

### Gatsby Page Development

With that out of the way, let's get down to business and look at the websites in a bit more detail. Like any static-site generation software, we know that creating websites using Gatsby must involve some form of programming voodoo to ensure that we get more code out of less, and hopefully some easy way to separate presentation from the data on our website

For Gatsby, this is done through React! React is a framework created by Facebook for the sakes of simplifying website development through components, which basically serve as a way to compose website elements accordingly. 

To do so, React involves "JSX", which serves as a way to take HTML and make it into Javascript Fragments. Given all of this, Gatsby will then pull all of these components together into a website via `gatsby build` , which we can then put on the website itself. 

So, as an example from the site, the following code:

```ocaml
import React from "react"

export default function Home() {
  return <div>Hello world!</div>
}
```

Really does something similar to the following, but with the ability to keep things cleaner in the long run:

```ocaml
import React from "react"

export default function Home() {
  return React.createElement("div", null, "Hello world!")
}
```

---

### Building with components

The above function, which is then converted into a real piece of HTML, is called a React **component**. These serve as the building blocks of any website created in React, and, if done right, can lead to a lot of ease with minimal overhead. By composing components into each other, we can create a lot of html out of very little work, so we could have the following website JSX:

```ocaml
<Page>
    <Header/>
    <BlogLayout>
      <BlogPost data={data}/>
       ...
    </BlogLayout>
</Page>
```

Unlike standard HTML, React includes so-called "self-closing" tags, which primarily allow us to save time and make for easier layouts, turning something like `<Button></Button>` into `<Button/>`. I'll make use of them for this website, and I encourage all of you to do as well!

Playing on this feature of React, Gatsby designates each page of the website as its own component in a js file in the `src/pages` directory.  So, I could add an about page to my website using the following code in `src/pages/about.js`:

 

```ocaml
import React from "react"

export default function About() {
  return (
    <div style={{ color: `teal` }}>
      <h1>About Gatsby</h1>
      <p>Such wow. Very React.</p>
    </div>
  )
}
```

A few last notes of importance before we continue with this high-level overview. 

- If you're familiar with older React versions, it might seem weird that we're using the less expressive "functional" syntax instead of the more traditional "class-based" syntax. React now has a feature known as "React-Hooks", which makes functional components easier to use with state, and allow us to have stateful components without some of the pitfalls of Javascript classes. I'd recommend using them, if only to test them out for a bit!
- Additionally, as each of these components are functions, it makes sense that we should be able to pass information to them. We can do that by passing stuff similar to attributes, so if we had `<Header prop1="LOL"/>` , we're passing 
"LOL" into `prop1` input of our function.
    - You can access this anywhere in your React Component via `props.prop1` , or other names
    - Additionally, you can also specify the input and then use that to pass it through. I'd choose this approach for most functional argument passing, but the above approach can be useful if you're trying to do something complex

    ---

### Linking between pages

Besides traditional `<a>` tags, Gatsby also allows us to use the `<Link/>` tag to dramatic effect in our code. 

As Gatsby is a static-site generator, using `<Link/>` for internal portions of the website and `<a/>` for the external portions of the website will lead to optimal performance,  as it'll allow Gatsby to make the routing easier and allow your site to look more responsive, preventing some of the times associated with querying the server directly each page change

---

## Part 2: Introduction to Styling in Gatsby

Obviously, simply using the default styling of the web will lead to a very.... unimpressive website. Thus, for any custom styling you might want to use, Gatsby offers a great amount of flexibility. 

Firstly, it offers global styles. These `.css` files serve as generic CSS that can apply to any and all components you make for the website, and are very similar to the traditional way CSS was done on the web. However, unlike standard `.css` files, which simply work when they're imported into the HTML for a website, these need to work with `gatsby-browser.js`, a file in your base Gatsby directory that helps Gatsby know how to import everything and build it together into a final website.  You do this by simply importing the css file in that file, by adding a line like the following:

```ocaml
import "./src/styles/global.css"
```

Besides global CSS, however, most people generally want some way to create so-called **locally-scoped CSS**, which serves as a way to use similar names for multiple bits of CSS without needing to worry about naming conflicts or weird things happening in different parts of the code. 

To do this in Gatsby, it uses so-called `CSS Modules`. To use them, simply create some CSS in a file with the `.modules.css` extension, rather than the traditional `.css` extension. In doing so, we can then import the CSS module into any component we desire and use them accordingly:

```ocaml
import localStyles from "./blogpost.module.css"

export default function Page({ data }) {
   return <div className={localStyles.CSSClassName}>{data}</div>
}
```

So here, we import the CSS Module like we'd import a React component, and then simply pass the className as a prop, and it just works!

However, for those who liked the idea of removing an additional file, the HTML file, in React, we can go further beyond - we can put even the CSS into the React code itself!

We can do this through the `CSS-in-JS` approach. This is either done via the Emotion library or the Styled-Components library. While I will not get into detail on them here, the idea is rather simple - just create a wrapper component with some style and stick our current component within it, sort of like a React-nesting doll. These make the development process easy and reliable, so use them to your advantage!

---

## Part 3: Creating Nested Layout Components

Again -  as the process of building most simple website can be rather tedious, Gatsby uses React to simplify constructing websites. It does this by relying on React's **compositionality,** by creating outer Layout components and layering them up, building your website bit-by-bit.

Again, in order to make static site development easier, Gatsby takes this compositionality one step further, through so-called **Gatsby Plugins**. These serve as little bits of code that allow you to get a bit more out of your build process.

To use them, you'll do the following:

- npm install the plugin, using whatever command is given to you
- edit the `gatsby-config.js` file, which directs Gatsby to the fact you have a plugin installed, and directs it to any  needed config files
- create and modify the configuration files accordingly, so you get the desired effect

gatsby-plugin-typography looks like a really nice typography plugin. I might need to check that one out for the actual site.

---

## Part 4: Data in Gatsby

So so far, we have been working with a lot of the presentational components of a website. Theoretically, you could simply make a website out of these, and then serve it to whoever you want to serve it to. 

However, when any static site gets large enough, React's simple compositionality can fail. For example, let's say that you want to create a collection of blogposts, and render all of that for your site.

You could create a tool that turns all of these posts into JSON, and import that data into your website, but that seems a bit excessive, doesn't it? If we could simple remove the dependency between our data and our presentational layers, then we could manage our code easier, and simply let Gatsby do our work for us

After all, we want to be lazy and make nice, readable code. If we had to build our own tools while using a supposed "cure-all", it'd probably either cost us time, money, or lots and lots of energy

Luckily, such a thing is not just "possible", but it is very doable. How? Through Gatsby plugins and its Data API!

We can do this in two different ways: the `createPages API` to pull in unstructured data into pages directly, which is more recommended for smaller websites, or the GraphQL data layer, which is more recommended for larger websites.

For the former approach, we can simply edit the gatsby-node.js accordingly to pass in the context:

```jsx
exposts.createPages = async ({ actions: {createPage}}) => {
   const data_to_pass_in = call_function_to_get(data)     
createpage({
        path: `route`,
        component: require.resolve("path_to_source"),
        context: { data_to_pass_in },
}}
}}

```

And then, when you're passing in the data to our React functions, we simply pass the data through the `pageContext` parameter!

For the latter approach, however, we'll need to explain quite a bit. So let's jump in!

As GraphQL is another whole can of worms to explain, I'll try to summarize. For more details, the tutorial page goes to the following, and it looks great!

[How to GraphQL - The Fullstack Tutorial for GraphQL](https://www.howtographql.com/)

 Before we get into it, I want to explain the overall process in more detail:

First of all, we start by getting the data in some shape / form we can work with. This could be as traditional as a basic SQL database, to stuff like Markdown files for blogposts, machine learning models, and so on. Gatsby considers data to be anything outside of a React component, so anything that feeds into the content of your website, that you think is updateable often enough and is used often enough to separate out, is something that could be considered "data"

Secondly, we then take in the data and bring it into our site in some way. In Gatsby, this process of bringing data into our website is done through a so-called "source plugin", which lets us grab data and bring it in as structured data, like an internal database.

Thirdly, we then take this data, and further warp it using a transformer plugin, which can help ensure that the data is what we desire it to be. 

Lastly, we then query this internal database through GraphQL, which will allow us to grab this data into our components, and build some high-quality components!

---

With this process in mind, then, we can now look at an, admittedly simple, but straightforward example. 

Let's say that we wanted to abstract our title away from our components, allowing us to change it at will or to make it cleaner for another developer to look at. 

To do so, instead of using a Source Plugin or a Transformer Plugin, we'll plug in our data directly into Gatsby by adding a field to the module.exports section of our site called "siteMetadata":

```jsx
module.exports = {
    siteMetadata: {
       title: "Data-driven title",
},
...
}
```

With this data now in our system, we can add a query to one of our pages to grab it  using GraphQL. To do so, we'll need to add an import to the GraphQL library:

```jsx
import { graphql } from "gatsby"
```

Then we'll pass in the data as the "data" parameter to our component:

```jsx
export default function About({ data }) {
...
}
```

Then, we'll need to add a query to the bottom of our file,  as another global object. This is so that we can query our GraphQL data to get our title:

```jsx
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
```

Here, we are querying a general query, then looking at our site's data in general, then looking for the siteMetadata section in general, and then grabbing the title we wanted. 

From there, then, we can access the data directly in our function like the following:

```jsx
{data.site.siteMetadata.title}
```

As you can see, while GraphQL is a bit verbose, it is super easy to tell how the data will come out of it, making it easy to predict how the data will come out and thus speed up development speed.

Queries created in this manner only work on page components, and NOT on the sub-components you want to use them on. You'll need to use the "useStaticQuery" hook to grab the data, but it's the same process in the end.

---

## Part 5: Source Plugins

With the basics of GraphQL over with, let's go over a tool that helps speedup Gatsby development with GraphQL: GraphiQL. 

If you go to your dev server, and go to route `/__graphql` , you'll notice that there's an explorer window. This will let you craft queries, run them to see what data you can pull out of your website, and so on. 

When starting out, it's a great idea to mess around with data and use this extensively, as this allows us to check our queries and get information out of them without needing to look at the website's progress.

With the ability to explore the data you import, we can start using Source plugins. 

As you might recall, Source plugins are the ways Gatsby can import data into the GraphQL system. 

To use them, you import them like any other plugin: Firstly import them via NPM, then add then add the necessary configuration information to gatsby-config. 

After that, the data will be easily visible and usable in the Gatsby system, which you can then access via GraphiQL to generate and process your queries. 

---

## Part 5: Transformer Plugins

While source plugins make data come to us, transformer plugins make that data usable.  Again, the process is really simple, and is like installing any other plugin. Once you install them, the GraphiQL manager will update accordingly, and give you the information you need to turn your data into what you want it to be, like if you wanted to convert a webpage from Markdown to true HTML. 

Transformer plugins do not pull in new data but transform existing data, so remember that you'll need some filesystem source plugin to use the remark transformer plugin to get HTML out of your markdown blogposts.

---

## Part 7: Programmatically create pages from data

Now, with most pieces of data, we can probably just import it into a webpage and act accordingly.

However, for a lot of our data, we'd like methods by which to create webpages dynamically, i.e. without needing to create the route for each and every webpage.

To do so, we'll use the "onCreateNode" and the "createPages" APIs, which allow us to take our data, its corresponding routing information, and combine them into a webpage. 

Now, doing this process can seem daunting at first, but it's totally worth it.

To create a webpage, we need two pieces of information:

1. The slug, or the path information for the webpage in question
2. The page itself, including the component we're rendering and the associated data

To make the slugs, we're going to get the data and attach it to the markdown data in our database, in effect augmenting it:

```jsx
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
```

Here, upon the creation of a reMark node, which signals the creation of the data that contains the information we need, we then grab the sub-information we'll use for the path, the slug. 

Then, we need to grab the page information and use it to create a page:

```jsx
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}
```

So here, we're first grabbing our slug through a GraphQL query, passing the data to our component, and then letting Gatsby work it's magic.

For the actual blog post, then, we simply make our component template:

```jsx
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default function BlogPost({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
```

Besides the clear "dangerouslySetInnerHTML" query, which allows us to add HTML directly through a ReMark transformer plugin, notice that we added a GraphQL based on our slug,  which allowed us to get our data programmatically and get the correct blog post as, even though this is a page template, it's still a page, so we do not need to use the "useStaticQuery" GraphQL plugin. 

But, overall, it's easy to see that this process will work and allow us to turn data into pages. It's more complicated than simply generating pages directly, but it allows us to make truly amazing websites really really quickly.

---

## Part 8: Preparing a Site to Go Live

For live websites, there are obviously some kinds of tests that someone who spends their time on the development side of things may or may not remember to use.

For this reason, Gatsby's tutorial ends off with running Lighthouse, which is a web auditing software that gives us an idea as to what sorts of things we can do to make our website better.

To run the test, we simply use Incognito Mode and the Developer's Console to run the audit. 

After running the tests, you'll get scores in 5 categories: Performance, PWA Best Practices, Accessibility, General Best Practices, and SEO (Search Engine Optimization). 

Additionally, it will also give you suggestions as to what to do to improve your skills in these efforts. While these do seem like more work, they make sure your website is the best it can be for all, making it useful and important for anyone using it. 

For Gatsby apps in particular, we'll need to add some basic configs to ensure that our website does what it needs to do.

### Adding a Manifest

PWAs, or Progressive Web Apps, are hybrid web-app interfaces that allow websites to have app based features and be downloaded onto phones. 

These tend to be highly mobile-friendly sites that users will want to come back to time and time again. 

In order to improve our Lighthouse scores all together, we'll need to fully turn our website into a PWA. To do so, we'll need to add a so-called "manifest" file, which serves as a way to tell our website how it can be downloaded. 

To do this in Gatsby, we simple need to add the plugin `gatsby-plugin-manifest` , add a favicon to the path `src/images/icon.png` , and add the needed config info in the `gatsby-config.js` 

---

### Add offline support

Besides the Manifest file, we also need to add a "service worker", which serves to manage network or cached content accordingly. Without this, our app will not work offline or with partial connectivity, all of which are needed for most mobile users.

Again, while doing this manually can be challenging, gatsby makes this whole process very very easy. Simply run `npm install --save gatsby-plugin-offline` , and add the config to your gatsby-config system. 

NOTICE: In the config file, you need the offline plugin to be listed *after* the manifest plugin, so we cache the manifest file and ensure PWA-ness

---

### Add page metadata

Besides PWA-scores, you can also easily improve your Gatsby SEO scores through React-Helmet, which let's you manage your document head. 

By configuring it and adding things accordingly, you can add to the layout the needed SEO materials, so that you can configure everything and combine everything together. 

With that done - you're now familiar enough with Gatsby to start moving forward with it. It's time to stop reading and get to the main action of any programming endeavor - programming!

---

## Post-Usage Notes, or Useful Odds-and-Ends

- If you're using Gatsby with WSL2, and are NOT getting hot-reloading with Gatsby Develop to work, then you need to do the following to make it work:
    1. Make sure your project is within the WSL2 portion of the filesystem (Not in /mnt/c....., but in /home!). Additionally, make sure that this is not a symlink, but the actual files located there. 
    2. Additionally, with the augmentation, if you prefer to use VS Code for FullStack development like I do, then you'll need to  install the Remote Viewing Extension, which lets you peer into your inner VM and use it directly. This lets you get the best of both worlds: A WSL2 Container, ensuring you get perfect coverage and clean Linux code, AND programming with VSCode, which makes it easier for others to look at your process and use it's plugins ( even if I prefer Vim for most other things... )
- If you have a webpage, and are trying to do an incremental update of Gatsby code to a certain route, you can do this through the following approach:
    1. In the gatsby-config.js file, we need to change pathPrefix to the subroute the file will be posted in. This will ensure that all routes include that prefix to them before we use them. 
    2. Instead of building normally, we need to build with `gatsby build --prefix-paths` . This allows us to include these prefixes, and thus ensure that you can make that update easier.