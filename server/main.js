import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";
import { TaskCollection } from "../imports/api/TaskCollections";

function insertLink({ title, url }) {
  LinksCollection.insert({ title, url, createdAt: new Date() });
}

function insertTask(taskText) {
  TaskCollection.insert({ text: taskText });
}

Meteor.startup(() => {
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
