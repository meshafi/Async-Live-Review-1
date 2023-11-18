

async function fetchUsersAndTodos() {
  try {
    const res = await fetch('http://localhost:3000/users');
    const data = await res.json();

    const dataArray = data.users;
  
    let index = 0;
    let itemsFetched = 0;
    const resultArray = [];
   async function fetchDataBatch() {
      while (index < dataArray.length && itemsFetched < 5) {
        const todos = await fetch(`http://localhost:3000${dataArray[index].todos}`)
        .then(todos => todos.json())
        .then(todosData => resultArray.push(todosData.todos));

        index++;
        itemsFetched++;
  
        if (itemsFetched === 5) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          itemsFetched = 0; 
        }
      }
  
      if (index < dataArray.length) {
        fetchDataBatch();
      }
    };
    await fetchDataBatch();    
    return Promise.all(resultArray);
  }
  catch (error) {
    console.error('An error occurred:', error);
  }
  
}

async function resultTodos(data){
  const countTodos={}
   for(const array of data){
     for(let index=0;index<array.length;index++){
        const obj=array[index];
        let splitId=obj.id.split('-');


        if(obj.isCompleted == true){
          if(countTodos[splitId[1]] == undefined){
            countTodos[splitId[1]]=1;
          }
          else{
          countTodos[splitId[1]]++;
          }
        }

     }
   }

   const result=[];
   for(let key in countTodos){
       let obj={};
       obj['id']=parseInt(key,10);
       obj['name']=`User ${key}`;
       obj['numTodosCompleted']=countTodos[key];

       result.push(obj);
   }
   return result;
}


async function main() {
  try{
  const data=await fetchUsersAndTodos();
  const result= await resultTodos(data);
  console.log(result);
  }
  catch(error){
    console.log('Error occured',error);
  }
}
main();


