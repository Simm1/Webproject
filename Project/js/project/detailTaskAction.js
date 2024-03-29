function renderActionButtons(task, parent){

    //Confirm changes - Push out to dataset
    const confirmBtn = newElem("button");
    confirmBtn.classList.add("taskConfirm");
    confirmBtn.classList.add("taskActionButton");
    confirmBtn.innerText = "Confirm";
    confirmBtn.addEventListener("click", e => {
        let assignedMemberList = [];
        for(let user of task.assignee){
            assignedMemberList.push(user);
        }
        if(assignedMemberList.length === 0){
            assignedMemberList = []; //For default empty
        }

        // Subtask object handling
        const subtaskList = [];
        for(let i = 0; i < task.subtasks.length; i++){
            const subtaskStatus = getElemById("subStatus" + i)
            const subtaskText = getElemById("subText" + i);
            subtaskList.push({
                isComplete: subtaskStatus.checked,
                name: subtaskText.value
            });
        }
        const detailContent = {
            name: getElemById("name").value,
            desc: getElemById("description").value,
            color: getElemById("colorType").value,
            assignee: assignedMemberList,
            date: getElemById("deadline").value,
            priority: parseInt(getElemById("priority").selectedIndex),
            isComplete: getElemById("complete").checked,
            subtask: subtaskList
        }
        console.log(detailContent.isComplete);
        console.log("Task Selected: " + task.projectIndex + " "+ task.columnIndex + " " + task.rowIndex);
        
        applyChanges(task,detailContent);

        closeDetailWindow();
    });
    parent.appendChild(confirmBtn);



    //Abort changes - Don't push out to dataset
    const cancelBtn = newElem("button");
    cancelBtn.classList.add("taskCancel");
    cancelBtn.classList.add("taskActionButton");
    cancelBtn.innerText = "Cancel";
    cancelBtn.addEventListener("click",e => {
        closeDetailWindow();
    })
    parent.appendChild(cancelBtn);

    openDetailWindow();
}
