const axios = require("axios");
const fs = require("fs");
const latestForumId = 550;

let users = [];

async function main()
{
    for (let index = 0; index < latestForumId; index++) {
        console.log(`>> Grabbing Account Information from Forum ID ${index}.`);
        try 
        {
            await axios.post("https://ucp.pegasusrp.de/api/account/validateCharacter", {
                id: index
            }).then(function (response) {
                console.log(`> Found account! Storing user data... (${response.data.user.name})`);
                users.push(response.data.user)
            });   
        } 
        catch (error) 
        {
            console.log(`> ${index} doesn't have a Ingame Character, trying next...`);
        }
    }

    const usersJson = JSON.stringify(users, null, 2);

    fs.writeFile("users.json", usersJson, 'utf8', (err) => {
        if(err) {
            console.error(err);
        }
        else {
            console.log(">> Data got successfully saved.")
        }
    });
}

main();