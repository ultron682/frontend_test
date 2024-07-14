#PomyślnaRekrutacja

This project was generated with Angular CLI 18.1.0.

I tried to use as many Angular tools as possible that the framework provides. I also made use of rxjs.

I managed to complete all the main requirements and all the additional tasks along with the task for 6.

All elements of the application are very close to the given jpg files.




LIST OF THINGS COMPLETED (all that was available in the README.md file):
- Header permanently glued to the top, HTML5 logo links to the beginning of the page.  

- Page footer always at the very bottom of the page.

- There are radiobuttons in block one, selecting them and then clicking the button in block two performs the replace or paste text action in the last block. 
The content used is retrieved from JSON and saved to localStorage.
Option one always selects content one, option two selects content two and the random option selects any of the others. Each separate content in the last block is covered by the <article> tag. 
By pasting the content, the application logic avoids duplicating existing content (if the random option is used, another content not yet used will be drawn). 

- The "POKAŻ" button in the footer, when clicked, shows a frame with 2 clickable options. The first restores the page to its initial settings, the second in the header pastes your name.

- No bootstrap etc.

- SCSS used.

- Below 960px, the site rearranges many elements to adapt the site in the best possible form for devices with small screens.

- Embedding the entire project in the Angular framework.

- No image files in the final design (no jpg, gif, png, svg files). The html logo comes from the CDN.

- CSS IS AWESOME in the footer - when the mouse hovers, the frame (without text) performs an animated rotation.

- BEM applied.

- Meeting a11y rules. The topic of accessibility is very broad, which is why there is the least amount of it on the page, but I have added aria-label to a couple of application elements. 

- Use of rem, em, vh, vw units (in effect, using the px unit as little as possible) - I avoided the px unit wherever possible.

- Mobile first. The mobile view was tested on the Safari, Edge and Chrome mobile browsers. CSS styles applied to mobile devices realise a perfect mobile view. 

- By pasting the content, make the content alphabetically sorted in the last block. Sorting is done using RowSortPipe (Pipe from angular).

- When pasting content, an alert message is displayed if the condition for unique content cannot be met.

- A button in the footer ("POKAŻ") extends the frame without the use of JS. Everything is implemented using CSS styles.

- The result of the work can be viewed on the github pages. https://ultron682.github.io/frontend_test/

- Used localStorage to load previously downloaded content and manage it later.




LIST OF THINGS DONE IN ADDITION:
- All items in "DODATKOWE PLUSY"

- Closing menus when clicking on options or off menus.

- Simple unit tests of the main application components.

- Applied Normalize.css to standardise the appearance on multiple browsers.

- Hiding the First and Last Name along with changing the text (the design was to show only).

- The repository uses github actions and github pages.




Repository: https://github.com/ultron682/frontend_test.
The page to test is available at: https://ultron682.github.io/frontend_test/

Best regards Michał Mazur