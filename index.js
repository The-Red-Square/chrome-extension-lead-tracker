const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const inputEl = document.getElementById("input-el")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
let myLeads = []
let logged = JSON.parse( localStorage.getItem("myLeads") )

if (logged) {
    myLeads = logged
    render(myLeads)
}

tabBtn.addEventListener("click", function() {
    //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //})
    chrome.tabs.query({active: true, currentWindow: ture}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li> 
            <a href='${leads[i]}' target='_blank'> 
                ${leads[i]} 
            </a> 
        </li>`


    }

    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)


})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    ulEl.innerHTML = null
    myLeads = []
})

