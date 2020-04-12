document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') == null){
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else{
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}

function setStatusClosed(e, id){
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (let item in issues){
        if (issues[item].id == id){
            issues[item].status = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));
    e.preventDefault();
    fetchIssues();
}

function deleteIssue(e, id){
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (let item in issues){
        if (issues[item].id == id){
            issues.splice(item, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));
    e.preventDefault();
    fetchIssues();
}


function fetchIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (let item in issues) {

       var {id : id, 
            description : desc, 
            severity : severity, 
            assignedTo : assignedTo,
            status : status
        } = issues[item];
       

    issuesList.innerHTML += `<div class="well">
                            <h6>Issue ID: ${id} </h6>
                            <p><span class="label label-info"> ${status} </span></p>
                            <h3>${desc}</h3>
                            <p><span class="glyphicon glyphicon-warning-sign"></span> ${severity} </p>
                            <p><span class="glyphicon glyphicon-user"></span> ${assignedTo} </p>
                            <a href="#" onclick="setStatusClosed(event, '${id}')" class="btn btn-warning">Close</a>
                            <a href="#" onclick="deleteIssue(event, '${id}')" class="btn btn-danger">Delete</a>
                            </div>`;
    }
}