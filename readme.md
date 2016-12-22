# Where's My Hero!?

## Who is our user?
Our user is a tech savvy sandwich aficionado.  Someone who won’t be fooled by any questionable piece of meat sitting lacklusterly between a pair of tired old buns.  No!  Our user expects the greatest culinary experience offered.  But, the question remains, where to get it?  Where’s their club, their open face, their BLAT ...  where’s their hero?

Thats where we come in.  We host reviews of sandwiches to help our users find the best usage of their food oriented face holes.  We find their hero and we tell them right where to shove it!



# Planning
### Phase 1
create a new review
- button for new reviews created. 0.25 hours
- modal for new review layout created. 2 hours.
- restaurant name form.
- sandwich name form.
- review form.
- submit button.
- cancel button (plus upper right corner X button to cancel

read reviews from our database 1 hour
- start by “seeding” data in js.  allow reviews to be viewed.
- additional reviews append to the bottom.

edit a review 1.5 hours.
- start by allowing any user to edit any review

delete a review 1.5 hours.
- start by allowing any user to delete any review.

### PHASE 2
find button on the screen. 3 hours
- find button triggers modal
- modal has a drop down option form for types of sandwiches.
- modal has a form for distances that the user is willing to travel.
- modal has a submit button
- modal has a cancel button (plus upper right corner to cancel)
- back end functionality for these forms

hidden map div below the find button that expands after the find button is used.
- map will appear and place markers on the map
- need to go into the review data and enter a field for distance

GPS location of each restaurant needs to be tracked in the restaurant instances created by the model.  2 hours

### PHASE 3
Login modal front end 2 hours
- account name form
- password form
- submit button
- cancel button (and upper right X to cancel).

Login modal backend 1 hour
- need to track user account names and logins
- read review modification 3 hours
- as the user scrolls to the bottom have the page load more reviews.
- move the “new” button from below the reviews to above them

read review modification (google map api) 8 hours
- use google map API to track the location of the users and populate reviews based on the current location of the user and the location of the reviews.
- modify reviews to include the location of the restaurant

modify edit functionality to only let people with rewrite rights update a review.  5 hours
- include author data in reviews.
- provide master rights class to allow us to write over any review written by anyone.
- change edit button to check for rewrite rights before allowing anyone to rewrite.
- grey out edit button if user doesn’t have rewrite rights.  maybe a message on screen if exit button clicked.

modify delete functionality to only let people with delete rights delete a review.  2 hours
- use same code for edit to only allow specific users to delete.
- grey out delete button if user doesn’t have rewrite rights.  maybe a message on screen if delete button is clicked.

## Relationship growth and rewriting:
## Phase 1:
one user schema will have connections to multiple sandwich schemas.  Each sandwich schema will have many connections to individual review schemas.

## Phase 2:
there will be many user schemas each with a connection to multiple sandwich schemas.  There will also be many restaurant schemas each with connections to many review schemas.
