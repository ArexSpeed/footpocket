## FootPocket


![main](https://user-images.githubusercontent.com/62649296/218275031-c63621ff-a5d7-4aca-a13a-3209881df285.png)


## Description

Mobile app for football simulation. You can play in your favorite league simulate, change teams values and check how your team will finish the league. There is also typer league where you can invite your friends and create your own typer league, then choose games and bet your score if you have a trouble you can also check Stats which are build in app and be familliar with current standings situation in your league.

## Features


- tabs navigation and stack navigation for each tab
- modals in react native
- authentication with firebase (using your email)
- read and write data into firebase realtime database and keep your data across all your device
- auto-generation function for competitions
- fetch data from RapidAPI with FootballApi for checking current standigs data for your favorite leagues

## Stack

- ReactNative
- Firebase Auth
- Firebase Realtime Database
- TypeScript
- Redux Toolkit
- RapidAPI (Football api)

## App details

# Routing
- routing using tabs where every tab includes few stack screens.

# Home
Home Screen contains AuthContent with user authentication for SingUp and SignIn to game. Authentication Form is connected to Firebase account where user data are stored.
If user is signed in then view is changin to User Card when users are able to change there data information. This data like username, email and token are stored in redux toolkit
and it will be used in other parts of application via useSelector, thanks it they can see more features than anonnymus users.

![home1](https://user-images.githubusercontent.com/62649296/218275280-6c42b69e-6e50-42a8-bda2-2ce55f99d950.png)

![home2](https://user-images.githubusercontent.com/62649296/218275296-64335476-44cd-4ba0-8be0-f38e78538db3.png)

# Simulator
The most interesting part where you can simulate your favorite football leagues like Premier League, La Liga or Serie A.
You are able to change teams power before you start the game. Each team have skills like attack, midfield and defence. The scores depends on these skills.
The simulator engine counts how the game will finished and who will be the champion of the league at the end of the season.
You can simulate each score by clicking play button.
Change the view between Schedule and Table to see current results.

![Sim1](https://user-images.githubusercontent.com/62649296/218275593-a7a85914-f677-4b3e-af96-5d643118615c.png)
![Sim2](https://user-images.githubusercontent.com/62649296/218275617-77af27c6-f749-4235-89bb-92d6a64efe14.png)
![Sim3](https://user-images.githubusercontent.com/62649296/218275624-16b2aec5-8e7e-4abb-8c2d-8213f2ccdff0.png)

# Typer
Another feature where you can bet scores of real teams in real competitions. Thanks this feature you can create your own typer league and invite your friends.
Enjoy this game and discover who has the most knowledge about your favorite league. In this module you have access to bet games, checking previous scores and how you 
and your friends bet all games in one summary table and table for each match.

![Typer2](https://user-images.githubusercontent.com/62649296/218275994-5e1617a6-dde4-42ba-8dac-12241d4a8521.png)
![Typer3](https://user-images.githubusercontent.com/62649296/218276051-053bad02-2815-4115-8848-14353c176d94.png)
![Typer4](https://user-images.githubusercontent.com/62649296/218276054-50ff41c6-c43a-415e-8046-5a03b7b0a42f.png)


# Stats
Current standings and fixtures for leagues. It is fetching from Football API and saving in app memory to quick access for your statistics.

![Stats1](https://user-images.githubusercontent.com/62649296/218276194-36065c91-2f01-4d93-b219-b864e0d2f098.png)


## License

The MIT License
