**Part One: Fix Current Features**

Database Schema

USERS
- id (PK)
- email (unique)
- username (unique)
- password
- image_url
- header_image_url
- bio
- location

MESSAGES
- id (PK)
- text
- timestamp
- user_id (FK → users.id)

FOLLOWS
- user_following_id (FK → users.id)
- user_being_followed_id (FK → users.id)
- (composite primary key)

LIKES
- id (PK)
- user_id (FK → users.id)
- message_id (FK → messages.id)



**Part Two: Fix Logout:**

Called do_logout() to remove the user ID from the session.
Flashed a success message to confirm logout.
Redirected the user to the login page.

Starting Code:

@app.route('/logout')
def logout():
    """Handle logout of user."""

Completed Code:

def do_logout():
    """Logout user."""

    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]

**Step Three: Fix User Profile Display**
The user profile page rendered correctly, but several user attributes were not being displayed:

User header image was not shown as a background
User bio was not displayed
User location was not displayed
The template contained placeholder content instead of user data.

These issues were located in:templates/users/detail.html

The header image was empty:
<div id="warbler-hero" class="full-width"></div>

replaced with:
<div id="warbler-hero" class="full-width"
     style="background-image: url('{{ user.header_image_url }}');">
</div>

The bio and location were placeholders:
<p>BIO HERE</p>

Replaced with: 
<p>{{ user.bio }}</p>


Location placeholder:
<p class="user-location"><span class="fa fa-map-marker"></span>LOCATION HERE</p>

Replaced with:
<p class="user-location"><span class="fa fa-map-marker"></span> {{ user.location }}</p>

Likes Count:
<h4>TBD</h4>

Updated Likes Count:
<a href="/users/{{user.id}}/likes">{{ user.likes|length }}</a>








