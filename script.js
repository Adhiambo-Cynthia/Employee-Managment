const addUser= document.getElementById("add-profile")
const doubleSal= document.getElementById("double")
const Showsupervisors= document.getElementById("show-supervisors")
const sortEmp= document.getElementById("sort")
const totalSal= document.getElementById("calculate-all")
const main= document.getElementById("main")
// const addUser= document.getElementById("add-user")
// const addUser= document.getElementById("add-user")
data=[]

getEmployees()
//fetch employees
 async function getEmployees(){
     let res= await fetch("https://randomuser.me/api")
     let data= await res.json()
     console.log(data)
     const user = data.results[0]
     const newUser={
         name: `${user.name.first} ${user.name.last}`,
         pic: user.picture.large,
         gender:user.gender,
         age: user.dob.age,
         address: `${user.location.country}, ${user.location.city} ${user.location.postcode}`,
         contact:`Email: ${user.email}`,
         phone:` Phone: ${user.phone}`,
         salary: Math.floor(Math.random()* 300000)
     }
     addData(newUser)
 }
 // add objects to the data array
 function addData(obj){
     data.push(obj)
     updateDOM()
 }
 function updateDOM(dataProvided=data){
     dataProvided.forEach(employee=>{
         const element=document.createElement('div')
         element.classList.add('person')
         main.innerHTML=''
         element.innerHTML=`
         <img src=${employee.pic} alt="profile">
         <h3>Name: ${employee.name}</h3> 
         <p>Gender: ${employee.gender}</p>
          <p>Age: ${employee.age}</p> 
          <p>Address: ${employee.address}</p> 
          <p>${employee.contact}</p>
          <p>${employee.phone}</p>
          <p>Salary: ${formatMoney(employee.salary)}</p>`
         main.appendChild(element)
     })
 }
 //format money
 function formatMoney(num){
     return "$"+ (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
 }
 //events
 addUser.addEventListener('click', getEmployees)