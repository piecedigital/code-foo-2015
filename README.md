IGN's Code-Foo 2015
=============

For more information on IGN's Code-Foo 2015, visit [ign.com/code-foo/2015](http://ign.com/code-foo/2015).

To apply to Code-Foo 2015, fork this repository and answer all questions. Push your answers to your fork and send us an email at ign_code-foo@ign.com to let us know you're finished.

IGN's Code-Foo 2015 is open to US residents only.  All answers must be completed using Java, Scala, PHP, Ruby, Swift, Objective-C, or JavaScript. Application must be turned in by _Friday, May 1st at 5pm PST_. You will be notified by email if you pass the first round of submissions.

1. Create a 2-5 minute video introducing yourself and tell us why we should choose you for the Code-Foo program.

Answer: [My video]().

2. How many ping-pong balls can you fit in 747? Describe each step in your thought process.

Answer: I'll be honest, math is not my strong suit. I'm a visualizer, ergo my first response is not one with mathematical logic. In my mind I'm taking into account the literal available space within an airplane. It's the plane hollow? Or are there seats and whatnot? Can I use the bathroom space? Will the balls be pressed againts the seats to take advantage of that fluff space? Can the balls be repositioned so that they're in as much space as possible?

At this point I'd team up with a mathematician to come up with an estimate.

A quick Google search brings up the top result having the answer found [here](http://www.telegraph.co.uk/technology/social-media/8419266/Quora-the-10-most-unexpected-questions.html). It would, of course, be unrealistic for me to pretend as though I came up with the answer myself, let alone knew how.

3. Write a program to find the given words from the included word search. Both word search and words can be found at [word-search.txt](https://github.com/ign/code-foo-2015/blob/master/word-search.txt)

Answer: My language of choice was JavaScript. I have made 4 files:
The first one is "word-search.js". It's a very basic regex string matching program.
The second one is "word-search-error.js". It's exposes the flaws in the first program, in how it allows false positives to fall through.
The third one is "word-search-thorough.js". It matches and filters out the matched string to be sure it matches the given word.
The final one is "word-search-thorough-error.js" (sorry for the long names). It simply has errors in the previous program to show that it works better than the first program.

4. Using [this API](http://ign-apis.herokuapp.com), pull and display a list of both articles and videos.

Answer: The file for the plain version is "plain-app.js." It has two routes: "/videos" and "/articles".

5. Using the results from the previous question, create a web/ios/android application that displays the results and matches [this design](https://github.com/ign/code-foo-2015/blob/master/design.png). The application should be responsive to common screen/device sizes.

Answer: The main file for this "app.js". I've provided every file needed, including the "node_modules" file for convenience. It has 3 routes "/", "/videos" and "/articles". The "/" routes redirects to "/videos"

Bonus Question
--------------
Programmatically create a game similar to Battleship™ with one AI-controlled opponent and a human-controlled player.
