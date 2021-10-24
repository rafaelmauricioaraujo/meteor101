import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";
import { TaskCollection } from "../imports/api/TaskCollections";

import { Accounts } from "meteor/accounts-base";

function insertLink({ title, url }) {
    LinksCollection.insert({ title, url, createdAt: new Date() });
}

function insertTask(taskText) {
    TaskCollection.insert({ text: taskText });
}

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }

    if (TaskCollection.find().count() === 0) {
        ["First", "Second", "Third"].forEach(insertTask);
    }

    // If the Links collection is empty, add some data.
    if (LinksCollection.find().count() === 0) {
        insertLink({
            title: "Do the Tutorial",
            url: "https://www.meteor.com/tutorials/react/creating-an-app",
        });

        insertLink({
            title: "Follow the Guide",
            url: "http://guide.meteor.com",
        });

        insertLink({
            title: "Read the Docs",
            url: "https://docs.meteor.com",
        });

        insertLink({
            title: "Discussions",
            url: "https://forums.meteor.com",
        });
    }
});
