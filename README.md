<h1>Customer-comment-analyzer</h1>

<h3>Introduction</h3>

<p>Customer-comment-analyzer is an application that helps business to analyze the comments they recieve from customers on their websites. The application runs through all the comments and creates a report with totals that can be used for business intelligence and marketing. This repository holds the backend of the app.</p>

<p>The app currently analyses comments on the basis of three metrics:</p>

<ul>
    <li>Total number of comments that are shorter than 15 characters</li>
    <li>Total number of comments that refer to the "Mover" device</li>
    <li>Total number of comments that refer to the "Shaker" device</li>
    <li>Total number of comments that contain one on more question marks</li>
    <li>Total number of comments that contain a url to a web page</li>
</ul>

<h1>Running the Application Locally:</h1>

<ul>
    <li>1. Install Node.js(http://nodejs.org).</li><br>
    <li>2. Run <code>npm install</code> to install app dependencies.</li><br>
    <li>3. Run <code>npm run build</code> </li><br>
    <li>4. Run <code>npm run start</code> </li><br>
    <li>5. Navigate to <a href="http://localhost:4000">http://localhost:4000</a> in your browser.</li>
</ul>