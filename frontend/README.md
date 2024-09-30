* the appname is PROJECT_MANAGER app
* app is made for individual user task and project handling

!!app is currently in tasting type not in build form.

-> please configure some points before starting the app.
    1. start the database either local or cloude.
    2. configure the mongoDB database credentials or local host IP.
    3. script for starting app is "npm start" for both backend and frondend.
    4. always start the backend server before hosting the frontend part.
    5. install all the package modules before starting the app.

-> there are two types of access are avilable first one is individual and the second one is ADMIN access

-> for user registration admin access is false by default if you want to get admin access then make true the isAdmin value manually in database before login.

-> after individual user login you will be redirected to the home page where you can see the all projects and progress chart.

-> for creating a new project click on the + button located at bottom right.

-> use can create delete and modify the task after click on the project models.

-> in admin acess you can see all the projects with user associate and project progress chart.

-> you can also see all the users and number of project assigned with the user.

-> there are a lot of features are pending to make this app a fantastic app like multiple users connection to a single project, live chat window for assigned team members, live traking of the project progress and many more...