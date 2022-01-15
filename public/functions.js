const stock_name = document.getElementById('stock_name');
const amount = document.getElementById('amount');
const weight = document.getElementById('weight');

const up_ID = document.getElementById('up_ID');
const up_stock_name = document.getElementById('up_stock_name');
const up_amount = document.getElementById('up_amount');
const up_weight = document.getElementById('up_weight');

const rm_ID = document.getElementById('rm_ID');

const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn'); 
const highestbtn = document.getElementById('highestbtn');
const listBtn = document.getElementById('listBtn');




  // Initialize Firebase

const database = firebase.database();
const usersRef = database.ref('/stocks');
addBtn.addEventListener('click', e => {
    e.preventDefault();
    const autoId = usersRef.push().key
    usersRef.child(autoId).set({
      stock_name: stock_name.value,
      amount: amount.value,
      weight: weight.value,
    })
    .then(()=> { console.log('created!'); })
    .catch(error => { console.error(error); });
  });


updateBtn.addEventListener('click', e => {
    e.preventDefault();
    const newData = {
        stock_name: up_stock_name.value,
        amount: up_amount.value,
        weight: up_weight.value,
    };

usersRef.once("value")
    .then(function(snapshot) {
        if (snapshot.child(up_ID.value).exists()){
            usersRef.child(up_ID.value).update(newData)
            .then(()=> { console.log('Updated!'); })
            }
        });
});


removeBtn.addEventListener('click', e => {
    e.preventDefault();
    usersRef.child(rm_ID.value).remove()
    .then(()=> { console.log('Deleted!'); })
    .catch(error => { console.error(error); });
});


listBtn.addEventListener('click', e => {
        e.preventDefault();
        usersRef.orderByKey().on('value', snapshot => {
        console.log(snapshot.val()); }); 
}); 

highestbtn.addEventListener('click', e => {
        e.preventDefault();
        usersRef.orderByChild('amount').limitToLast(1).on('value', snapshot => {
        console.log(snapshot.val()); }); 
}); 


