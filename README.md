# MovieQueue V.1.0

<h2>Synopsis</h2>
    <p>Has a friend ever recommended a movie to you and you can't for the life of you remember what it is? MovieQueue is a web-based social application that allows users to create and build a queue of movies to watch in the future! Users can view other users' profiles for ideas on what to watch as well! Splendid!</p>

<h2>API's Used</h2>
<h3>Facebook API</h3>
    <p>User Log In and Authentication </p>
    <p>To make it as easy as possible for users to get started, we utilize Facebook's secure log in and authentication to get quick access to our web application. *NOTE Facebook will ask you for permissions to your Friend's List. You must say yes or you will not be able to access your friends' movie queue.*</p>

<h3>The Movie Database (TMDb)</h3>
    <p>Fetch Movie</p>
    <p>Given a movie name, we use TMDb's API to find that movie and all sorts of information associated with that movie.</p>


<h2>MEEN Stack</h2>
    <p>The Facebook API would not co-operate with AngularJS without having Facebook's API Key. Therefore, we had to replace Angular with .EJS template incorporation. We also used Bootstrap for styling.</p>
    
<h2>Models</h2>
    <h3>User</h3>
    <p>Here we store a user's basic personal information provided by Facebook. The user will also have associated users (friends from Facebook) and associated movies.</p>
    
    <h3>Movie</h3>
    <p>Here we store a movie's basic information, such as title, duration, release date, and movie rating. Movies are added and removed by the user.</p>
    
    <h2>License</h2>
    <h3>The MIT License (MIT)</h3>

Copyright (c) 2015 Patrick Dang-Ho, Ankai Jie, Sean Marchand, Matthew Sims

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.