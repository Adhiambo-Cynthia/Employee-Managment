const addUser= document.getElementById("add-profile")
const bonus= document.getElementById("bonus")
const Showsupervisors= document.getElementById("show-supervisors")
const sortEmp= document.getElementById("sort")
const totalSal= document.getElementById("calculate-all")
const main= document.getElementById("main")
const aside= document.getElementById("aside")
// const addUser= document.getElementById("add-user")
// const addUser= document.getElementById("add-user")
employees=[]


//fetch employees
 async function getEmployees(){
     let res= await fetch("https://randomuser.me/api")
     let data= await res.json()
     
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
     employees.push(newUser)
    //  console.log(employees)
     updateDOM()
    
}
 function updateDOM(dataProvided=employees){
     main.innerHTML=''
     dataProvided.forEach(employee=>{
         const element=document.createElement('div')
         
        if(employee.salary > 150000){
            console.log(employee)
            element.classList.add('person','supervisor')
            const badge=document.createElement('p')
            badge.innerHTML="&#127775"
            element.appendChild(badge)
        }
        else{
            element.classList.add('person')
        }
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
 //sorting employees
 function sorting(){
    employees.sort((a,b)=> b.salary-a.salary)
    updateDOM()
 }
 //supervisors
 function supervisors(){
     employees=employees.filter(employee => employee.salary >150000)
     updateDOM()
 }
 function totalSalary(){
     let total = employees.reduce((sum,employee)=> (sum += employee.salary),0)
     console.log(total)
     button= document.createElement('button')
     button.classList.add('total')
     button.innerHTML=`<h4>The total salary: ${formatMoney(total)}</h4>`
     aside.appendChild(button)
     setTimeout(() => {
        button.parentNode.removeChild(button);
    }, 3000);
 }

 //give bonus
 function giveBonus(){
     employees= employees.map((employee)=>{
         return {...employee, salary: employee.salary * 1.1 , boss:"Adhis"} //you can reassign or create new keys but you have to return an object
        // let NewEmployee={}
        // NewEmployee["salary"]= employee.salary * 1.12  // an alternative methid if you want to reassign every value
        // return NewEmployee
                                                //the spread operator above is what is helping it reassign the key and values again
     })
     console.log(employees)
     updateDOM()
 }
 //events
 addUser.addEventListener('click', getEmployees)
 bonus.addEventListener('click', giveBonus)
 Showsupervisors.addEventListener('click', supervisors)
 sortEmp.addEventListener('click', sorting)
 totalSal.addEventListener('click', totalSalary)
 getEmployees()