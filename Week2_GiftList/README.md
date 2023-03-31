# Gift List

To get started with the repository, clone it and then run `npm install` in the top-level directory to install the depedencies.

In order to run the app properly, you must set up the client and the server:

## Client

You can run the client from the client directory `cd client` with `npm run dev`. This will trigger a frontend vite app made with react (as in last week's project).
To open the app on your browser, go to http://localhost:5173 

Think of the client as the _prover_ here. It needs to prove to the server that some `name` is in the `MERKLE_ROOT` on the server. 

## Server

You can run the server from the server directory `cd server` with `node index`. This file is an express server which will be hosted on port 1225 and respond to the client's request.

Think of the server as the _verifier_ here. It needs to verify that the `name` passed by the client is in the `MERKLE_ROOT`. If it is, then we can send the gift! 

## How does it work

Simply write the name that you want to check on the "Name"'s field and press the "CHECK" button to send the request to the server. You will get and see the result below on the "Result" field. It's quite straight forward.