# Getting Started with AdmitHub Coding Exercise
#### This is the frontend ui for the coding exercise

---

Get the project from my GitHub repository: email me @ shijunarayan@gmail.com to get access to this repo

- git clone `git@github.com:shijunarayan/admithub-coding-exercise-ui.git`
- cd into the directory `admithub-coding-exercise-ui`
- run `npm install`
- run `npm run build`
- run `npm run start`

--- 


## Requirements

### Part 1: List Item
Create a React component <CountryListItem /> which takes the name of a country and a url to a flag image as props, and displays it like so:

Don't worry about the specific sizing or exact layout, but ensure that there is a '+' button justified on the right side. It won't do anything yet. You can use bootstrap classes for styling, it's packaged into this codepen.

--- 

### Part 2: Search
Whenever the user starts typing in the search bar, make a request to the REST Countries search endpoint [documentation here](https://restcountries.eu/#api-endpoints-name), which takes a search string and returns all the countries that contain the given string. This is the endpoint you want to hit [example](https://restcountries.eu/rest/v2/name/mexi):

https://restcountries.eu/rest/v2/name/{name}

Using the component created in part 1, display the name/image of the first 5 results returned from the API endpoint. Whenever the user changes what they've typed, the search results should update. While the network call is in progress, some loading state / message should be shown in the Search Results.

--- 

### Part 3: Pinned List
Now that you have a functioning search, we want to make it so the user can "pin" certain items from that search to a separately managed list. Make it so that when the user hits the "+" button on a search item, it adds it to the "Selected Countries" list on the right, but only if that country is not already in the "Selected Countries" List.
The "Selected Countries" list items should have the same UI as the items in the search list, but there should be an "x" button in place of the "+" button. Clicking on the "x" should remove that item from the list.

--- 

### Part 4: (Backend) Persistence
Pinning items is great, but as you may have noticed, the pinned items reset every time the user refreshes the page. We'd like to add some persistence.
Create a separately running service (it's okay if it runs on localhost), in the language and frameworks of your choosing, that gets called whenever the user hits the "+" icon that adds something to the "Selected Countries" list. This service should in some way keep track of the countries added to that list. When you hit "x" on a selected country, it should indicate to this service that the country was removed.
When you are initially seeding the list of countries (e.g. on page load), you should make a request to your service to return the set of previously saved countries, and have that populate the initial list of selected countries.
Something to consider: If your backend resets the data every time it's restarted, consider having it work in a way that keeps that data persistent through restarts.

--- 

### Part 5: (Backend) Supplemental Countries
You’ve come to realize that, while the REST Countries API is great, it doesn’t recognize nearly all of the regions you’d like to represent and make pinnable on your Country Search app. Fictional countries like Narnia, Atlantis, and others don’t even make the list! You’ve also realized that the flag for Canada just isn’t cool enough, and you’d like to show something a little bit more stylish when people search for it and/or pin it.
Update your search component such that, in addition to searching the countries that are returned by the REST Countries API, the “countries” below are also returned if they match the user’s search criteria. For Canada and any other real countries in the table below, you want to return the flag image from the table below when possible. The limit of 5 search results still applies. All the search requests to REST Countries will be proxied through your backend as part of this.
As part of this piece, try to also ensure that the frontend of your app does not fully fall over if the backend is down or unreachable for whatever reason. When the backend is down,  the search on the frontend should still work with the REST Countries API directly as a fallback, and it should still let you pin items (even though those obviously won’t persist through a refresh in such a scenario).

--- 

| Country        | Flag Url           |
| ------------- |-------------|
| Antegria |  https://static.wikia.nocookie.net/papersplease/images/4/47/Antegria_emblem.png |
| Arstotzka | https://i.imgur.com/gMszxk1.png |
| Atlantis | https://i.imgur.com/ddprV9V.png |
| Canada | https://i.imgur.com/O6oEdxf.png |
| Grenyarnia | https://static.wikia.nocookie.net/orbis-novus/images/d/dd/Grenyarnia.png |
| Narnia | https://upload.wikimedia.org/wikipedia/commons/0/0b/Flag_of_Narnia.svg |
| Qumar | https://i.imgur.com/LkqeQPY.png |
| Yoshi’s Island | https://i.imgur.com/YIAZ2ZH.png |
