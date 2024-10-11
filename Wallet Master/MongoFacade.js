
const { MongoClient, ServerApiVersion } = require('mongodb');
const { Idiomas } = require('./enums/Idiomas.js');
const { States } = require('./enums/States.js');
const { Monedas } = require('./enums/Monedas.js');
const mongoUrlAdmin = "mongodb+srv://private_admin_url";
const mongoUrl = "mongodb+srv://private_user_url";
const collectionName = 'private_collection_name';
const commitToFalse = false;
const MAX_TOKENS = 10;
let db;
let selectedUser;


const client = new MongoClient(mongoUrl, {
	serverApi: {
	  version: ServerApiVersion.v1,
	  strict: true,
	  deprecationErrors: true,
	}
});


async function connect() {
	if (!client.isConnected) {
        try {
            await client.connect();
            db = client.db('walletmastercollection');
            return true
        } catch (error) {
            return false;
        }
	}
    return false;
}

async function update(select, data){
	return await db.collection(collectionName).updateOne(select, {$set: data});
}
async function updateSelectedAccount(data){
	return await db.collection(collectionName).updateOne({accountId: selectedUser.accountId}, {$set: data});
}
async function pushToSelectedAccount(listName, data){
	return await db.collection(collectionName).updateOne(
    {accountId: selectedUser.accountId }, 
    {$push: { [listName]: data }});
}
async function changeValueFromListOfSelectedAccount(listName, name, newValue){
	return await db.collection(collectionName).updateOne(
    {accountId: selectedUser.accountId, [`${listName}.name`]: name}, 
    {$set: { [`${listName}.$.value`]: newValue }}
  );
}
async function deleteElementFromListOfSelectedAccount(listName, name){
	return await db.collection(collectionName).updateOne(
    {accountId: selectedUser.accountId}, 
    {$pull: { [`${listName}`]: {name: name} }}
  );
}
async function incrementListCountofSelectedAccount(listName){
	return await db.collection(collectionName).updateOne({accountId: selectedUser.accountId}, {$inc: {[`${listName}.counter`]: 1}});
}
async function decrementListCountofSelectedAccount(listName){
	return await db.collection(collectionName).updateOne({accountId: selectedUser.accountId}, {$inc: {[`${listName}.counter`]: -1}});
}
async function insert(data){
    return await db.collection(collectionName).insertOne(data);
}
async function newAccount(accountId){
    let response = await db.collection(collectionName).insertOne({
        misc: {
            lang: Idiomas.english,
            currency: Monedas.euro,
            convstate: States.normal,
            currentquery: '',
            temp: '',
            commited: true,
        },
        accountId: accountId,
        money: {
          total: 0,
          remaining: 0,
        },
        boxes:{
          counter: 0,
          boxes: [],
        },
        debts:{
          counter: 0,
          debts: [],
        },
        monthly: {
          counter: 0,
          taxes: [],
          moneyneeded: 0,
          currentmoney: 0,
        },
        yearly: {
          counter: 0,
          taxes: [],
          moneyneeded: 0,
          currentmoney: 0,
        },
        others: {
          counter: 0,
          taxes: [],
          moneyneeded: 0,
          currentmoney: 0,
        },
        futures: {
          counter: 0,
          purchases: [],
          moneyneeded: 0,
          currentmoney: 0,
        },
    });
    return response.insertedId;
}
async function resetSelectedAccount() {
    await db.collection(collectionName).updateOne({accountId: selectedUser.accountId}, {
        $set: {
            misc: {
              lang: Idiomas.english,
              currency: Monedas.euro,
              convstate: States.normal,
              currentquery: '',
              temp: '',
              commited: true,
            },
          }
      });
      await db.collection(collectionName).updateOne({accountId: selectedUser.accountId}, {
          $set: {
            money: {
              total: 0,
              remaining: 0,
            },
          }
      });
      await db.collection(collectionName).updateOne({accountId: selectedUser.accountId}, {
          $set: {
            boxes:{
              counter: 0,
              boxes: [],
            },
          }
      });
      await db.collection(collectionName).updateOne({accountId: selectedUser.accountId}, {
          $set: {
            debts:{
              counter: 0,
              debts: [],
            },
          }
      });
      await db.collection(collectionName).updateOne({accountId: selectedUser.accountId}, {
          $set: {
            monthly: {
              counter: 0,
              taxes: [],
              moneyneeded: 0,
              currentmoney: 0,
            },
          }
      });
      await db.collection(collectionName).updateOne({accountId: selectedUser.accountId}, {
          $set: {
            yearly: {
              counter: 0,
              taxes: [],
              moneyneeded: 0,
              currentmoney: 0,
            },
          }
      });
      await db.collection(collectionName).updateOne({accountId: selectedUser.accountId}, {
          $set: {
            others: {
              counter: 0,
              taxes: [],
              moneyneeded: 0,
              currentmoney: 0,
            },
          }
      });
      await db.collection(collectionName).updateOne({accountId: selectedUser.accountId}, {
          $set: {
            futures: {
              counter: 0,
              purchases: [],
              moneyneeded: 0,
              currentmoney: 0,
            },
        }
    });
}
async function selectAccount(id){
    try {
        let response = await db.collection(collectionName).findOne({accountId: id});
        if(response==null) return false;
        selectedUser = response;
        return true;
    }catch(error){
        return false;
    }
}
async function getSelectedAccount(){
    return selectedUser;
}
async function isSelectedAccountCommited(){
  return await selectedUser.misc.commited;
}
async function uncommitSelectedAccount(){
  if(commitToFalse) 
    updateSelectedAccount({"misc.commited": false});
}
async function commitSelectedAccount(){
  updateSelectedAccount({"misc.commited": true});
}
async function getFromAccount(id){
    return await db.collection(collectionName).findOne({accountId: id});
}
async function query(data){
    return await db.collection(collectionName).findOne(data);
}
async function accountExists(id){
    return (await getFromAccount(id)) != null;
}
async function close(){
    await client.close();
}
function prueba(data){
	db.collection(collectionName).updateOne({accountId: selectedUser.accountId}, {$set: {"misc.lang": 1}});
}

module.exports ={
    connect,
    update,
    updateSelectedAccount,
    pushToSelectedAccount,
    changeValueFromListOfSelectedAccount,
    deleteElementFromListOfSelectedAccount,
    incrementListCountofSelectedAccount,
    decrementListCountofSelectedAccount,
    isSelectedAccountCommited,
    uncommitSelectedAccount,
    commitSelectedAccount,
    insert,
    newAccount,
    resetSelectedAccount,
    selectAccount,
    getSelectedAccount,
    getFromAccount,
    query,
    accountExists,
    close,
    prueba,
    MAX_TOKENS,
};
