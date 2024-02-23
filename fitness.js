// script.js 

const editIcon = `<i class="fas fa-edit"></i>` 

const deleteIcon = `<i class="fas fa-trash"></i>` 

function clearInputs() { 
	wInput.value = ""
	cInput.value = ""
	sInput.value = ""
} 

function addToLocalStorage(){ 
	localStorage.setItem("date", JSON.stringify(date)) 
	localStorage.setItem("workoutType", JSON.stringify(workoutType)) 
	localStorage.setItem("caloriesBurned", JSON.stringify(caloriesBurned)) 
	localStorage.setItem("stepsTaken", JSON.stringify(stepsTaken)) 
} 

function activateEdit(i){ 
	wInput.value = workoutType[i] 
	cInput.value = caloriesBurned[i] 
	sInput.value = stepsTaken[i] 
	editIndex = i 
	submitButton.classList.add("hidden") 
	editSection.classList.remove("hidden") 
} 

function cancelEdit() { 
	clearInputs() 
	editIndex = -1 
	submitButton.classList.remove("hidden") 
	editSection.classList.add("hidden") 
} 

function editRow(){ 
	if(editIndex==-1) return
	workoutType[editIndex] = wInput.value 
	caloriesBurned[editIndex] = cInput.value 
	stepsTaken[editIndex] = sInput.value 
	fillTable() 
	addToLocalStorage() 
	cancelEdit() 
} 

function deleteRow(i){ 
	if(!confirm( 
	`Confirm that you want to delete the entry: 
	\n ${date[i]}: ${workoutType[i]}, ${caloriesBurned[i]}, 
${stepsTaken[i]}`)) 
return
	date.splice(i, 1) 
	workoutType.splice(i, 1) 
	caloriesBurned.splice(i, 1) 
	stepsTaken.splice(i, 1) 
document.querySelector(`#output > tr:nth-child(${i+1})`) 
	.classList.add("delete-animation") 
	addToLocalStorage() 
	setTimeout(fillTable, 500) 
} 

function fillTable(){ 
	const tbody = document.getElementById("output") 
	const rows = 
		Math.max(workoutType.length, caloriesBurned.length, stepsTaken.length) 
	let html = ""
	for(let i=0; i<rows; i++){ 
		let w = workoutType[i] || "N/A"
		let c = caloriesBurned[i] || "N/A"
		let s = stepsTaken[i] || "N/A"
		let d = date[i] || "N/A"
		html+=`<tr> 
			<td>${d}</td> 
			<td>${w}</td> 
			<td>${c}</td> 
			<td>${s}</td> 
			<td> 
				<button onclick="activateEdit(${i})"
						class="edit">${editIcon} 
				</button> 
			</td> 
			<td> 
				<button 
					onclick="deleteRow(${i})"
					class="delete">${deleteIcon} 
				</button> 
			</td> 
		</tr>`		 
	} 
	tbody.innerHTML = html; 
} 

let editIndex = -1; 

let date = 
	JSON.parse(localStorage.getItem("date")) || [] 
let workoutType = 
	JSON.parse(localStorage.getItem("workoutType")) || [] 
let caloriesBurned = 
	JSON.parse(localStorage.getItem("caloriesBurned")) || [] 
let stepsTaken = 
	JSON.parse(localStorage.getItem("StepsTaken")) || [] 

const wInput = document.getElementById("workoutType") 
const cInput = document.getElementById("caloriesBurned") 
const sInput = document.getElementById("stepsTaken") 

const submitButton = document.getElementById("submit") 
const editSection = document.getElementById("editSection") 

fillTable() 

submitButton.addEventListener("click", ()=>{ 
	const w = wInput.value || null; 
	const c = cInput.value || null; 
	const s = sInput.value || null; 
	if(w===null || c===null || s===null) { 
		alert("Please enter all the fields.") 
		return
	} 
	const d = new Date().toLocaleDateString() 
	date = [d, ...date] 
	workoutType = [w, ...workoutType] 
	caloriesBurned = [c, ...caloriesBurned] 
	stepsTaken = [s, ...stepsTaken] 
	// date.push(d) 
	// workoutType.push(w) 
	// caloroiesBurned.push(c) 
	// stepsTaken.push(s) 
	clearInputs() 
	fillTable() 
	addToLocalStorage() 
})
