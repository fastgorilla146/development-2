# Development

### Link to Deployed Website
https://fastgorilla146.github.io/development/

### Goal and Value of the Application
The goal of this application is to mimic a store that can sell differnet items and do 
so in an organized fashion. It allows user to view items, add to card, add/remove from wishlist, 
and sort by prices. It also displays the title, description, and price of each item and once you add 
it to the cart. 

### Usability Principles Considered
My main usability principle focus was effeciency. I thought with many filtering options, a cart, a wishlist, and lots
of data it might look bad to display everything, so I tried to keep all options compact and undoable. I also made the cart 
easy to view and added a counter to not over clutter it. I also focused on controllability since the user needs to be able to access
what is important via the filters and sorting. 

### Organization of Components
The components are split into two main components. One is the Navbar and the other is the Item Data. I put the forms 
where the data is split not into any component because there wasn't much included in the sorting data. 

### How Data is Passed Down Through Components
Data is passed through the components using state variables and there are lots of state variables that work together
to see what should be displayed and what shouldn't. It calls functions based on the click of different forms 
and then states change and new data is displayed via the html return functions.

### How the User Triggers State Changes
The user triggers state changes simply by clicking the buttons. On the click the function will be called that
will change the state variables.

