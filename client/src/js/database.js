import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("request to update the Database");

  //create and  connect the database and set version we want to use
  const jateDatabase = await openDB("jate", 1);

  // make new transaction... and specify the database
  const transaction = jateDatabase.transaction("jate", "readwrite");

  //object store configaration
  const objStore = transaction.objectStore("jate");

  // use the .put() method to pass the content
  const req = objStore.put({ id: 1, value: content });

  // confirm the data was added
  const res = await req;
  console.log("the data have been saved to database", res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (value) => {
  console.log("receive the data from the database");

  //create and  connect the database and set version we want to use
  const jateDatabase = await openDB("jate", 1);

  // make new transaction... and specify the database
  const transaction = jateDatabase.transaction("jate", "readwrite");
  // open the object store
  const objStore = transaction.objectStore("jate");

  // use .getAll() method to receive all the content from database

  const req = objStore.getAll();

  const res = await req;
  console.log("data received from database", res);
};

initdb();
