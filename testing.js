import fs from "fs";
const users = fs.readFileSync("./wmreplica20231018.users.json", "utf-8");
const buyers = fs.readFileSync("./buyers_success_log.data.json", "utf-8");
const usersString = JSON.parse(users);
const buyersString = JSON.parse(buyers);
let globalString=""

let level1Keys = Object.keys(buyersString);
let level2Keys = level1Keys.map((each) => Object.keys(buyersString[each]));
for (let i = 0; i < level1Keys.length; i++) {
  const key1 = level1Keys[i];

  for (let j = 0; j < level2Keys[i].length; j++) {
    const key2 = level2Keys[i][j];
    const keysOfKey2 = Object.keys(buyersString[key1][key2]);
    for(let i=0;i<keysOfKey2.length;i++){
        let temp=usersString.filter(each=>{if(each._id.$oid==keysOfKey2[i]){
            return each;
        }})
        function validate(a,b){
            if(b===""){
                return a;
            }
            else{
                return a+" "+b;
            }
        }
        let string1 = `update customer set first_name = ${validate(temp[0].firstname,temp[0].middlename)}, last_name = ${temp[0].lastname} where id = ${buyersString[key1][key2][keysOfKey2[i]].id};`
        globalString+=string1;
    }

}
}
fs.writeFileSync(
    "updateBuyerNames.sql",
    JSON.stringify(globalString)
  );
