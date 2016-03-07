# musicwiki
Base repository for MusicWiki
OlinJS 2016

DOCUMENTATION

app.js: Main application file. Creates connection to database, creates app endpoints, listens to port 3000 or PORT environment variable.

routes/index.js: Express router. Defines the server-side behavior of the various endpoints. Provides ability to GET all pages, POST a new page, and POST edits to a given page.

public/core.js: Angular controller. Controls DOM, sets and interacts with $scope variables to facilitate the GET/POST requests. Defines which page is currently in view/currently being edited, and the edits being made, so that these changes can be displayed/POSTed.

public/index.html: The DOM. Defines the layout of the page. Creates two tabs -- a "New Page" tab and a "View/Edit" tab. Prevents submission of empty forms.  

public/views/style.css: Defines some additional styling, in particular the alignment of the page list and the view/edit area.

models/pageModel.js: Defines a MongoDB model for a "page" object. A page has a page-name, text, an author, and a record of which user last edited it. 

