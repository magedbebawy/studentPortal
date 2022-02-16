# studentPortal
Protected routes will require a token (x-auth-token) in the header, this token is generated when a
new professor is created or when existing professor signs in

route: /professor/register
create a professor account
method: post
payload: {
    "name": "mark",
    "email": "mark@school.com",
    "password": "1234567"
}

/-------------------------------------------------------/

route: /professor/login
professor login
method: post
payload: {
    "email": "mark@school.com",
    "password": "1234567"
}

/---------------------------------------------------------/

protected route
create a student
route: /student
method: post
payload:{
    "name": "maged",
    "email": "mbebawy@yahoo.com"
}

/---------------------------------------------------------/

protected route
get a student
route: /student
method: get
payload:{
    "email": "mbebawy@yahoo.com"
}

/---------------------------------------------------------/

protected route
get all students
route: /allstudents
method: get
payload: none

/---------------------------------------------------------/

protected route
dlete student
route: /student/delete/:student_id
method: delete
payload: none

/---------------------------------------------------------/

protected route
delete all students
route: /deleteall
method: delete
payload:none

/---------------------------------------------------------/

protected route
update student
route: /student/:student_id
method: put
payload: {
    "name": "bebawy",
     "email": "mbebawy@yahoo.com"
}

/---------------------------------------------------------/

protected route
create grade
route: /grades/
method: post
payload:{
    "assignment": "Test 2",
    "grade": 95
}

/---------------------------------------------------------/

get grade
route: /grades/:student_id/grade_id
method: get
payload: none

/---------------------------------------------------------/

get all grades
route: /grades/grades/allGrades/:student_id
method: get
payload: none

/---------------------------------------------------------/

protected route
delete grade
route: /grades/delete/:grade_id
method: delete
payload: none

/---------------------------------------------------------/

protected route
delete all grades
route: /grades/deleteAll/:student_id
method: delete
payload: none

/---------------------------------------------------------/

protected route
edit grade
route: /grades/:grade_id
method: put
payload: {
    "assignment": "Test 2",
    "grade": 98
}

/---------------------------------------------------------/