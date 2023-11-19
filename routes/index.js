var express = require('express');
var router = express.Router();

const danubius = createUniversity();
const student = {nume: 'Lupu', prenume:'Adrian', CNP:1940716000000, buletin:'XR666777'};
const student2  = {nume: 'Lupu', prenume:'Adrian2', CNP:1940716000001, buletin:'XR666777'};

/* Populeaza baza de date */
router.get('/createUniversity', function(req, res, next) {
  danubius.addStudent(student);
  danubius.addStudent(student2);
  res.render('index', { title: 'Studentii au fost adaugati!' });
});
/* Afiseaza toti studentii in format JSON*/
router.get('/listAllStudents', function(req, res, next) {
  //res.render('index', { title: "Hello students!" });
  res.send(danubius.listAllStudents());
});
/* Schimba statutul pentru studentul 2 */
router.get('/changeStudentStatus', function(req, res, next) {
  danubius.changeStudentStatus(student2.CNP, 'active');
  res.render('index', { title: 'Studentul 2 este acum activ!' });
});

module.exports = router;

function createUniversity() {
    let students = [];
    const studentData = ['nume', 'prenume', 'CNP', 'buletin'];
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
    const findStudent = (CNP) => {
        return students.find(student => student.CNP === CNP);
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
           students = students.filter(student => student.CNP !== CNP);
        },
        editStudent: (CNP, studentInfo) => { // nume prenume , serie buletin 
            students = students.map(student => student.CNP === CNP ? {...student, ...studentInfo} : student);
        },

        showStudent: (CNP) => {
            const student = findStudent(CNP);
            return studentInformation(student, CNP);
        },
        showAllStudents: () => {
            return `Universitatea Danubius are ${students.length} studenti`;
        },
        listAllStudents: () => {
            //console.table(students);
			return JSON.stringify(students);
        },
        enrollCourse: (CNP, nume) => {
            students = students.map(student => student.CNP === CNP ? {...student, materii: [...student.materii, {nume, nota: ''}]} : student)
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
              return student.CNP === CNP ? 
                    {...student, materii: student.materii.filter(materie => materie.nume !== nume)} : student;
            });
  
        },
        addGrade: function (CNP, nume, nota) {
            const student = findStudent(CNP);
            if(!student){
               return noStudentMsg(CNP) ;
            }
            students =  students.map(student => {
               return student.CNP === CNP  ? 
                {...student, materii: student.materii.map((materie) => materie.nume === nume ? {...materie, nota} : materie)} : student;
            })
        },
        changeGrade: (CNP, nume, nota) => {
            const student = findStudent(CNP);
            if(!student){
               return noStudentMsg(CNP) ;
            }
            students =  students.map(student => {
               return student.CNP === CNP  ? 
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
            students = students.map(student => student.CNP === CNP ? {...student,status: status} : student);
        },
        showStudentStatus: (CNP) => {
            const {nume, prenume, status} = findStudent(CNP);
            if(!nume){
                return noStudentMsg(CNP);
            } else  {
                return `Studentul ${nume} ${prenume} este momentan ${status}`
            }
        } 
    }
}
