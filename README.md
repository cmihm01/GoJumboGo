GoJumboGo! 
Katie Hoskins, Jenny Duong, Claudia Mihm


Problem statement (i.e., what is the problem?)
Need a tool to introduce young children to simple coding concepts in a fun and accessible way through a game. 


How do you solve the problem?
We will build an application in which users guide an animated elephant through a series of mazes by arranging action blocks. Action blocks will either be direction blocks, repeat blocks, or conditional blocks. Blocks can be arranged by clicking on them and dragging them into an ordered list on the screen. Direction blocks are associated with a direction -- up, down, left, right. Repeat blocks can be used to repeat an individual or a series of blocks. Conditional blocks can be used to sense things in the environment and act in a particular way based on the result. 
This teaches basic coding concepts by introducing users to the computational thinking mindset. By sequencing blocks, users begin to understand control-flow. Conditional blocks and repeat blocks are introductory to if statements and loops used in higher-level coding languages. 


List of all the features that your team will implement (including which of the "Pick 4" items were chosen by the team). Your team will be held accountable for the features you list!


Create and load different difficulties of “mazes” for the game. Mazes are created with walls and distinct paths the user must stay on throughout the game. A target is placed somewhere, which the user must reach to finish the level, and more difficult versions will have obstacles that affect the user’s path in a particular way.
Have a bank of maze implementations for different levels on the server side (Server-side data persistence)
Render a jumbo character on the maze that will move according to the arrangement of the action blocks that the user creates.
Create a bank of action blocks that can be used to solve the particular level. Blocks can be clicked and dragged onto a window containing a list of actions to be run. Associated with this is a button that says “GoJumboGo” which will execute all the action blocks in the list. 
Create alerts on the screen when Jumbo reaches the target or hits an obstacle to let the user know that something has happened they should pay attention to. 
Allow users to create a login in order to save their progress. This information will be stored server-side. (Server-side data persistence)
Maintain a high score tracker, which will hold the highest level reached on the user’s computer yet. This will be stored client-side.(Client-side data persistence)
Use a JavaScript framework for games to develop the page (e.g., phaser.io, Panda.js, JS Gamepad API)
Use a front-end framework to design the page around the gameplay windows
Use the Google Gmail API to send a message to the user after gameplay with a summary of the levels they completed, the concepts that they learned from completing those levels and links to external information if they would like to learn more about a topic (conditionals in C++, while loops, etc.)


What data will your prototype be using and collecting
	Each user will have a username and password attached to their account. Each account will include profile information including an email address to send the summary email to, as well as gameplay information of which level the user is on. 


Any algorithms or special techniques that will be necessary
	Because each action block is a single action, we will need an algorithm to translate block lists into actual executable code, if that translation is even possible given a particular list of actions. 


Electronic mockups of what your team will be developing using wireframes. No hand-drawn mockups accepted. Tools to create wireframes includeBalsamiq (commercial; de facto standard), Gliffy, MockFlow, and even Microsoft PowerPoint.


Mock Ups
![Alt Text](/GoJumboGoLanding.pdf?raw=true "Title")

