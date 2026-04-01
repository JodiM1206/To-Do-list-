
# To-Do List App

## Description

A task organizer program that allows the user to create lists with specific tags to differentiate between task categories. 
Users can also create reminders for each list to be reminded of ongoing tasks to complete. Lists will also organize items 
by priority, items with a deadline with be at the top of the lists whereas items without deadlines will be lower. The deadlines
for each task will also send a reminder to the user of the upcoming deadline approaching. 


## ERD/Business Rules

Business Rules:
A USER may create many items. An ITEM must be created by exactly one USER.  
A USER may create many lists. A LIST must be created by exactly one USER.  
A USER may create many REMINDERS. A REMINDER must be created by exactly one  USER.  
A LIST may have a REMINDER. A REMINDER must have exactly one LIST.  
A LIST may contain many items. An ITEM must be contained in exactly one LIST.  
A BINDER may contain many LISTS. A Iist must be contained in exactly one BINDER.  

![To-Do List ERD](Images/To_Do_List_ERD.png)  


## Relational Schema  

Based on the ERD presented above, here is the relational schema for the To Do List application. Item and Reminders are connected to List via foreign key ListID. List itself is connected to Binder via the foreign key BinderID. Finally Binder is connected to User via the UserID foreign key. All relations satisfy 1st normal form due to all attributes being atomic. They also satify 2nd normal form automatically since there are no composite keys, and they satisfy 3rd normal form due to no transitive dependencies being present.  

![To-Do-List Relations Schema](Images/To_Do_List_Relations.png)
