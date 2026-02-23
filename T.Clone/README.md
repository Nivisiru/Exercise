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
