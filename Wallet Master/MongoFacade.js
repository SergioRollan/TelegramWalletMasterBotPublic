
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
	    console.log("Reconectando a MongoDB Atlas...");
        try {
            await client.connect();
            console.log("Conectado exitosamente a MongoDB Atlas:");
            db = client.db('walletmastercollection');
            return true
        } catch (error) {
            console.error("Error conectando a MongoDB", error);
            return false;
        }
	}
    console.log('cliente ya conectado');
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
        console.log(error);
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




/*
$set

Establece el valor de un campo. Si el campo no existe, lo crea.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $set: { nombre: "Juan", edad: 30 } }
);
$inc

Incrementa el valor de un campo por una cantidad especificada.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $inc: { visitas: 1 } }
);
$unset

Elimina un campo de un documento.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $unset: { campoInnecesario: "" } }
);
$rename

Cambia el nombre de un campo.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $rename: { nombreAntiguo: "nombreNuevo" } }
);
$push

Añade un elemento al final de un array. Si el campo no existe, se crea.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $push: { lista: "nuevoElemento" } }
);
$addToSet

Añade un elemento a un array solo si no está ya presente.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $addToSet: { lista: "elementoUnico" } }
);
$pop

Elimina el primer o último elemento de un array. Usa -1 para el primero y 1 para el último.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $pop: { lista: 1 } }
);
$pull

Elimina todos los elementos de un array que coincidan con una condición.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $pull: { lista: "elementoAEliminar" } }
);
$pullAll

Elimina múltiples valores específicos de un array.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $pullAll: { lista: ["elemento1", "elemento2"] } }
);
$each

Utilizado con $push para añadir múltiples elementos a un array.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $push: { lista: { $each: ["elemento1", "elemento2"] } } }
);
$slice

Limita el número de elementos en un array. Utilizado con $push y $each.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $push: { lista: { $each: ["nuevoElemento"], $slice: 3 } } }
);
$sort

Ordena los elementos de un array. Utilizado con $push y $each.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $push: { lista: { $each: ["nuevoElemento"], $sort: 1 } } }
);
$min

Establece el valor de un campo si el nuevo valor es menor que el valor actual.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $min: { puntuacion: 85 } }
);
$max

Establece el valor de un campo si el nuevo valor es mayor que el valor actual.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $max: { puntuacion: 90 } }
);
$mul

Multiplica el valor de un campo por un número especificado.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $mul: { precio: 1.1 } } // Incrementa el precio en un 10%
);
$currentDate

Establece el valor de un campo como la fecha y hora actuales. Puedes usar true para almacenar como Date o { $type: "timestamp" }.

javascript
Copiar código
db.collection.updateOne(
  { _id: 1 },
  { $currentDate: { ultimaActualizacion: true } }
);



*/
