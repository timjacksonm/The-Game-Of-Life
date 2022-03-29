<h1 align="center">
   <image src="/src/assets/" width="50%"> 
</h1>

<h4 align="center">Title</h4>
<p align="center">
  <a href="#guide">Guide</a> •
  <a href="#summary">Summary</a> •
  <a href="#improvements">Improvements</a> •
  <a href="#resources">Resources</a> •
  <a href="#contact">Contact</a> •
  <a href="#license">License</a> •
</p>

### ✨ [Play The Game of Life](https://play-life.netlify.app/)

## Guide

<p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.</p>
<p>The universe of the Game of Life is an infinite, a two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead.</p>
<p>Every cell interacts with its eight neighbours and follows a set of 4 rules to determine the cells status, live or dead.</p>

<details>
    <summary><strong>Show Rules</strong></summary>
<ol>
    <li>
    <p>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</p>
    <image src="/src/assets/examplegif1.gif">
    </li>
    <li>
    <p>Any live cell with two or three live neighbours lives on to the next generation.</p>
    <image src="/src/assets/examplegif2.gif">
    </li>
    <li>
    <p>Any live cell with more than three live neighbours dies, as if by overpopulation.</p>
    <image src="/src/assets/examplegif3.gif">
    </li>
    <li>
    <p>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</p>
    <image src="/src/assets/examplegif4.gif">
    </li>
</ol>
</details>

#### Getting started

<p>By default a pattern named <strong>Squaredance</strong> will be displayed on screen. Go ahead, click the <strong>start</strong> button!</p>
<p>What happened? If you haven't familiarized yourself with the rules above go ahead and take a moment to digest. Now with the wisdom of the 4 rules here are some additional things to know.</p>

- <p>Essentially, your mouse pointer acts as a paint brush. Without a loaded pattern you can click any single cell within the grid and change its status from alive or dead.</p>
- <p>To remove a loaded pattern you can right click with your mouse or go into settings -> details and click the remove pattern button.</p>
- <p>Some patterns may be too big for your current grid size. Try zooming out! Hold Ctrl+MINUS or Ctrl+MouseScrollDown.</p>
- <p>Patterns within the two folders <strong>WikiCollection & CustomCollection</strong> are sorted by size from smallest to largest.</p>

<details>
<summary>Show Common Interactions</summary>

---

<p>Fill Grid Randomly And Reset Grid</p>
<image src="/src/assets/">

---

<p>Load A Pattern</p>
<image src="/src/assets/">

---

<p>Save A Pattern</p>
<image src="/src/assets/">

---

<p>Delete A Pattern</p>
<image src="/src/assets/">

---

<p>Search A Pattern</p>
<image src="/src/assets/">

---

<p>Combine Multiple Patterns</p>
<image src="/src/assets/">

---

<p>Adjust Speed And Color</p>
<image src="/src/assets/">

---

<p>Use A Favorite Pattern</p>
<image src="/src/assets/">
</details>

## Summary

<p>The game of life project idea came from two videos I saw back in July 2021, <a href="https://www.youtube.com/watch?v=xP5-iIeKXE8">Here</a> & <a href="https://www.youtube.com/watch?v=C2vgICfQawE">Here</a>. For anyone that knows me I love complexity and challenges. I made this my goal to replicate in React once I learned enough JavaScript to make it a reality. Over Christmas break at an Airbnb I was able to create a rough front end version that used divs as the grid. You can view the initial version in my first tweet <a href="https://twitter.com/timjacksonm/status/1477358126517129216?s=20&t=Kcd0aGp8mYR2XxYXRO9jyg">Here</a> This version was not very performant and as you can tell with the speed set to max it was pretty slow. At this point I was uncertain if I would progress the app further. I came across the <a href="https://conwaylife.com/wiki/Main_Page">Life Wiki</a> and learned they had an entire collection of patterns with RLE (Run Length Encoding) compression you could download. 5,200+ Patterns according to their wiki.</p>
<p>I was intrigued by such a huge collection and decided to research how I could use these patterns in my own project. I ended up creating my own NPM package <a href="https://www.npmjs.com/package/rle-decoder">rle-decoder.</a> This helped me convert the rle string within a file into a two-dimensional array. I also parsed the rest of the data from the file into a JavaScript object using Nodes File System. I quickly realized the collection of 5,200 patterns included extremely large arrays, over half of the files were more than 40,000 single cells. I decided I wanted the project to be BIG but not that big. So I wrote some code to filter the files and move the files that were less than 200x200 cells (40,000) into anoither folder. After sorting the files I also realized that about 200 of the files had no title so I wrote more code to sort those out and I added names manually by looking up the authors on the life wiki website.</p>
<p>After a small test to ensure I could save a JavaScript object with the data to my database, I pushed the entire filtered collection! My <a href="https://twitter.com/timjacksonm/status/1481135061101694979?s=20&t=Kcd0aGp8mYR2XxYXRO9jyg">Terminal</a> screen made me feel like an elite coder from a 90s action movie. Once it was finished I had 2,288 patterns in my database!</p>
<p>Next I created a <a href="https://github.com/timjacksonm/The-Game-Of-Life-API">REST API</a> using Node & Express. I put my api on <a href="https://rapidapi.com/timjacksonm-1jw8F2hFW3d/api/the-game-of-life">RapidAPI</a> so other developers can use it. The API consist of 7 endpoints with data from two different folders.</p>
<p>Lastly because my first version of the game of life was slow and not performant enough to run bigger patterns. I scrapped it and re-did my front end completely. I opted to use html canvas instead. I connected my front end to my backend using Redux Toolkit Query and created my own UI that wasn't to intrusive to the board itself.</p>
<p>Finishing touches included a hover effect that acted like a paint brush, a guide and tips which includes a favotire list and a way to search through the large amount of avialable patterns.</p>
<p>A technical coincidence that I built apon was the ability to zoom out to make the grid larger so you can use the larger patterns. I ended up making the UI responsive to zooming out.</p>

### Challenges

<ol>
<li>My first challenge was getting Conway's game of life algorithm working. There seemed to be so many different ways other developers implimented the algo and some were not even accurate. As the perfectionest I am I wanted to make sure that the algo allowed the cells to wrap around the screen rather than dissapear into the corners of the screen to never be seen again.</li>
<li>Using RapidAPI was a struggle. Their setup configuration seemed pretty strict and took awhile to get some endpoints to work just right i.e. DELETE. RapidAPI server kept responding NOT-AUTHORIZED one weekend and caused me to be stuck thinking it was my problem. After an email to them it was fixed on their end the following Monday.</li>
<li>Redoing my front end with canvas wasn't to diffult. But getting the hover effect to work was a huge struggle. I initially wanted the hover effect to be available while a simulation was running so you can continue to add patterns without stopping. Due to performance issues I decided to disable the hover effect once a simulation starts. My resolution for best performance was having two canvas grids on top of eachother, one for displaying the hover effect and the other for the painted grid.</li>
<li>With my API I did send the client the rle string initially and was going to have the client side convert the string to a two-dimensional array. I ended up deciding that the cleint side has enough to do and waiting longer for the conversion to happen probably wasn't the best idea. So my API now converts the rle string on the server side before sending it over.</li>
</ol>

## Improvements

<ol>
<li>I would like to implement the favorites list into the settings navigation somehow. Currently when you copy you have to switch navigations and its just to many steps.</li>
<li>When you change the color in the settings navigation it changes the color of all alive cells. I would like to change this implementation to only change the color of new painted cells. With this change you could have multiple cells on the grid with different colors. </li>
<li>I don't see this application being used on phones but mobile responsiveness could be added.</li>
<li>Could implement sorting a pattern collection by Author name or specific size.</li>
<li>Add authentication so a user would have to login to delete patterns from the CustomCollection. Allow admins to edit WikiCollection patterns.</li>
<li>More performance improvements. One known bug is if you resize the screen in quick succession the browser will crash and freeze completely.</li>
</ol>

## Resources

<ul>
<li>
<a href="https://github.com/timjacksonm/The-Game-Of-Life-API">The-Game-Of-Life-API Repository by Tim Jackson</a>
</li>
<li>
<a href="https://github.com/timjacksonm/rle-decoder">rle-decoder NPM by Tim Jackson</a>
</li>
<li>
<a href="https://rapidapi.com/timjacksonm-1jw8F2hFW3d/api/the-game-of-life">The-Game-Of-Life-API on RapidAPI</a>
</li>
<li>
<a href="https://conwaylife.com/wiki/Main_Page">LifeWiki</a>
</li>
<li>
<a href="https://codepen.io/timaikens/pen/ojqPmd?editors=0110">Honeycomb Codepen by Tim Aikens.</a> ~Gave me the hover effect idea using canvas.
</li>
<li>
<a href="https://www.youtube.com/watch?v=xP5-iIeKXE8">Life in life</a> ~Inspirational video.
</li>
<li>
<a href="https://www.youtube.com/watch?v=C2vgICfQawE">epic conway's game of life</a> ~Inspirational video.
</li>
</ul>

## Contact

👤 **Tim Jackson**

- Github: [@timjacksonm](https://github.com/timjacksonm)
- Twitter [@timjacksonm](https://twitter.com/timjacksonm)
- LinkedIn [@timjacksonm](https://linkedin.com/in/timjacksonm)

## License

<p>
  <a href="https://choosealicense.com/licenses/mit/">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg">
</p>
