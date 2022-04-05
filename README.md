# CSE 435 - Pedestrian Backup Assist System (PBAS) Project
## Team: Team Nosowsky
## Team Members:
- Dave Ackley
- Chris Nosowsky
- Lukas Richters

## GitHub Repository
https://github.com/ChrisNosowsky/PBAS-prototype

#

### How to Run Project
#### Prerequisites:
1. Node.js (https://nodejs.org/en/). To test if you have Node.js, go to command prompt and type:
    ```
    npm -v
    ```
     You should get a version (mine is 6.14.8). If you get a command error, then you do not have Node.js installed.

#

### Serve Build on Static Server
1. Install serve. Open up command prompt and run:
    ```
    npm install -g serve
    ```
    This will install the npm package "serve" globally.
2. Open up command prompt, navigate to the root directory, and run the following:
    ```
    serve -s build
    ```
    Additionally, you could change the port the app is run on by running:
    ```
    serve -s build -l [port]
    ```
    where [port] is the desired port number
3. Wait for the build to compile. If you ran the first command, it will host the app on localhost:5000. Once you navigate there, you will be presented with our app.
