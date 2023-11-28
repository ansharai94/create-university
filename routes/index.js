var express = require('express');
var router = express.Router();

const student1 = {nume: 'Lupu', prenume:'Adrian', cnp:1940716000000, buletin:'XR666777', status:'inactive'};
const student2  = {nume: 'Lupu', prenume:'Adrian2', cnp:1940716000001, buletin:'XR666777', status:'inactive'};
let students =[];
const studentData = ['nume', 'prenume', 'CNP', 'buletin', 'status'];
students.push(student1);
students.push(student2);

const danubius = createUniversity();

/* Afiseaza toti studentii in format JSON*/
router.get('/listAllStudents', function(req, res, next) {
  res.send(danubius.listAllStudents());
});
/* Schimba statutul pentru studentul x */
router.get('/changeStudentStatus/:id', function(req, res, next) {
  danubius.changeStudentStatus(req.params.id, 'active');
  res.render('index', { title: `Studentul cu CNP-ul ${req.params.id} este acum activ!` });
});
/* Arata statutul pentru studentul x */
router.get('/showStudent/:id', function(req, res, next) {
    res.send(danubius.showStudent(req.params.id));
});
/* Afiseaza statutul pentru studentul x */
router.get('/showStudentStatus/:id', function(req, res, next) {
    res.send(danubius.showStudentStatus(req.params.id));
});

module.exports = router;

function createUniversity (){
    const noStudentMsg = (CNP) => {
        return `Universitatea Danubius in momentul de fata nu are nici un student inscris cu CNP ul :${CNP} `
    }
    function studentInformation(student,CNP){
        if(!student){
            return noStudentMsg(CNP);
        }
        return `${student.prenume} ${student.nume} este inscris la universitatea Danubius`;
    }

    function displayCourses(student){
        const studentName = `${student.prenume} ${student.nume}` ;
        if(student.materii.length < 1){
            return `Studentul ${studentName}, nu este inscris la nici un curs.`;
        }
        const materii = student.materii.reduce((materii, materie) => {
            const punctuation = materii.length > 0 ? ',' : ''
            return `${materii}${punctuation} ${materie.nume}`;
        }, '');
        return `Studentul ${studentName}, este inscris la urmatoarele materii : ${materii}`;
    }
    function findStudent(CNP){
        return students.find(s => s.cnp === parseInt(CNP));
    }
    return {
        addStudent:(student) =>{ // nume prenume cnp serie
            const isStudentValid =  Object.keys(student).every(key => {
                return studentData.includes(key)
            })
            if(isStudentValid){
                students.push({...student, materii: [],status: 'inactiv'});
            }else {
                return 'Va rugam sa va asigurati ca ati introdus toate datele studentului. Campurile necesare pentru a adauga un student sunt : nume, prenume, CNP, buletin'
            }

        },
        removeStudent: (CNP) => {
            students = students.filter(student => student.cnp !== CNP);
        },
        editStudent: (CNP, studentInfo) => { // nume prenume , serie buletin
            students = students.map(student => student.cnp === CNP ? {...student, ...studentInfo} : student);
        },

        showStudent: (CNP) => {
            const student = findStudent(CNP);
            //console.log(student);
            return studentInformation(student, CNP);
        },
        showAllStudents: () => {
            return `Universitatea Danubius are ${students.length} studenti`;
        },
        listAllStudents: () => {
            return students;
        },
        enrollCourse: (CNP, nume) => {
            students = students.map(student => student.cnp === CNP ? {...student, materii: [...student.materii, {nume, nota: ''}]} : student)
        },
        findStudentCourses: (CNP) => {
            const student = findStudent(CNP);
            return displayCourses(student);
        },
        deleteCourse: (CNP, nume) => {
            const student = findStudent(CNP);
            if(!student) {
                return noStudentMsg(CNP)
            }
            students = students.map(student => {
                return student.cnp === CNP ?
                    {...student, materii: student.materii.filter(materie => materie.nume !== nume)} : student;
            });

        },
        addGrade: function (CNP, nume, nota) {
            const student = findStudent(CNP);
            if(!student){
                return noStudentMsg(CNP) ;
            }
            students =  students.map(student => {
                return student.cnp === CNP  ?
                    {...student, materii: student.materii.map((materie) => materie.nume === nume ? {...materie, nota} : materie)} : student;
            })
        },
        changeGrade: (CNP, nume, nota) => {
            const student = findStudent(CNP);
            if(!student){
                return noStudentMsg(CNP) ;
            }
            students =  students.map(student => {
                return student.cnp === CNP  ?
                    {...student, materii: student.materii.map((materie) => materie.nume === nume ? {...materie, nota} : materie)} : student;
            })
        },
        showGrade: (CNP, nume) => {
            const student = findStudent(CNP);
            if(!student) {
                return noStudentMsg(CNP);
            }
            const findCourse = student.materii.find(materie => materie.nume === nume);
            if(!findCourse){
                return `Studentul  ${student.prenume} ${student.nume}, nu este inscris la materia ${nume}`
            }
            if(findCourse.nota){
                return  `Studentul ${student.prenume} ${student.nume}, la materia ${nume} are nota ${findCourse.nota}`;
            }else {
                return `Studentul nu are inca o nota la materia ${nume}`
            }

        },
        changeStudentStatus: (CNP,status) => {
            const student = findStudent(CNP);
            if(!student){
                return noStudentMsg(CNP);
            }
            students = students.map(student => student.cnp === parseInt(CNP) ? {...student,status: status} : student);
        },
        showStudentStatus: (CNP) => {
            const {nume, prenume, status} = findStudent(CNP);
            if(!nume){
                console.log(noStudentMsg(CNP));
            } else  {
                return `Studentul ${nume} ${prenume} este momentan ${status}`
            }
        }
    }
}
