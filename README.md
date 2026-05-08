
# To-Do List App

## Description

A task organizer program that allows the user to items, items can be crossed out if done. It will have the basic CRUD operations. It also provides account deletion with cascade delete.

## ERD/Business Rules

Business Rules:
A USER may create many items. An ITEM must be created by exactly one USER.  .  

![To-Do List ERD](/public/Images/To_Do_List_ERD.png)  


## Relational Schema  

Based on the ERD presented above, here is the relational schema for the To Do List application. Item is connected to user via foreign key user_id. All relations satisfy 1st normal form due to all attributes being atomic. They also satify 2nd normal form automatically since there are no composite keys, and they satisfy 3rd normal form due to no transitive dependencies being present.  

![To-Do-List Relations Schema](/public/Images/To_Do_List_Relations.png)

## Planned Features
- Binder organization
- List management
- Reminder notifications
- User profile page
