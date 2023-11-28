var express = require("express");
var router = express.Router();

const danubius = createUniversity();
const student = {
  nume: "Lupu",
  prenume: "Adrian",
  CNP: 1940716000000,
  buletin: "XR666777",
};

/* Afiseaza toti studentii in format JSON*/
router.get("/", function (req, res, next) {
  res.status(200).send(danubius.listAllStudents());
});
// Add a student to the student database
router.post("/addStudent", function (req, res) {
  const data = req.body;
  danubius.addStudent(data);
  res.status(200).send();
});
// Edit student informations
router.put("/editStudent", function (req, res) {
  const data = req.body;
  danubius.editStudent(data.CNP, data.studentInfo);
  res.status(200).redirect("/");
});
/* Schimba statutul pentru studentul 2 */
router.delete("/removeStudent", function (req, res, next) {
  const data = req.body;
  danubius.removeStudent(data.CNP);
  res.status(200).redirect("/");
});
router.get("/findStudent", function (req, res) {
  const data = req.body;
  const student = danubius.findStudent(data.CNP);
  res.status(200).send(student);
});

router.post("/addCourse", function (req, res) {
  const data = req.body;
  danubius.enrollCourse(data.CNP, data.nume);
  res.status(200);
});

router.get("/courses", function (req, res) {
  const data = req.body;
  const courses = danubius.findStudentCourses(data.CNP);
  res.status(200).send(courses);
});
router.delete("/course", function (req, res) {
  const data = req.body;
  danubius.deleteCourse(data.CNP, data.nume);
  res.send(200);
});
//Grade

router.post("/addGrade", function (req, res) {
  const data = req.body;
  danubius.addGrade(data.CNP, data.nume, data.nota);
  res.status(200);
});

router.put("/editGrade", function (req, res) {
  const data = req.body;
  danubius.changeGrade(data.CNP, data.nume, data.nota);
  res.status(200);
});
router.get("/grade", function (req, res) {
  const data = req.body;
  const grade = danubius.showGrade(data.CNP, data.nume);
  req.status(200).send(grade);
});
router.put("/studentStatus", function (req, res) {
  const data = req.body;
  danubius.changeStudentStatus(data.CNP, data.status);
  res.status(200);
});

module.exports = router;

function createUniversity() {
  let students = [];
  const studentData = ["nume", "prenume", "CNP", "buletin"];
  const noStudentMsg = (CNP) => {
    return `Universitatea Danubius in momentul de fata nu are nici un student inscris cu CNP ul :${CNP} `;
  };
  function studentInformation(student, CNP) {
    if (!student) {
      return noStudentMsg(CNP);
    }
    return `${student.prenume} ${student.nume} este inscris la universitatea Danubius`;
  }

  function displayCourses(student) {
    const studentName = `${student.prenume} ${student.nume}`;
    if (student.materii.length < 1) {
      return `Studentul ${studentName}, nu este inscris la nici un curs.`;
    }
    const materii = student.materii.reduce((materii, materie) => {
      const punctuation = materii.length > 0 ? "," : "";
      return `${materii}${punctuation} ${materie.nume}`;
    }, "");
    return `Studentul ${studentName}, este inscris la urmatoarele materii : ${materii}`;
  }
  const findStudent = (CNP) => {
    return students.find((student) => student.CNP === CNP);
  };
  return {
    addStudent: (student) => {
      // nume prenume cnp serie
      const isStudentValid = Object.keys(student).every((key) => {
        return studentData.includes(key);
      });
      if (isStudentValid) {
        students.push({ ...student, materii: [], status: "inactiv" });
      } else {
        return "Va rugam sa va asigurati ca ati introdus toate datele studentului. Campurile necesare pentru a adauga un student sunt : nume, prenume, CNP, buletin";
      }
    },
    removeStudent: (CNP) => {
      students = students.filter((student) => student.CNP !== CNP);
    },
    editStudent: (CNP, studentInfo) => {
      // nume prenume , serie buletin
      students = students.map((student) =>
        student.CNP === CNP ? { ...student, ...studentInfo } : student
      );
    },
    showStudent: (CNP) => {
      const student = findStudent(CNP);
      return studentInformation(student, CNP);
    },
    listAllStudents: () => {
      return students;
    },
    enrollCourse: (CNP, nume) => {
      students = students.map((student) =>
        student.CNP === CNP
          ? { ...student, materii: [...student.materii, { nume, nota: "" }] }
          : student
      );
    },
    findStudentCourses: (CNP) => {
      const student = findStudent(CNP);
      return displayCourses(student);
    },
    deleteCourse: (CNP, nume) => {
      const student = findStudent(CNP);
      if (!student) {
        return noStudentMsg(CNP);
      }
      students = students.map((student) => {
        return student.CNP === CNP
          ? {
              ...student,
              materii: student.materii.filter(
                (materie) => materie.nume !== nume
              ),
            }
          : student;
      });
    },
    addGrade: function (CNP, nume, nota) {
      const student = findStudent(CNP);
      if (!student) {
        return noStudentMsg(CNP);
      }
      students = students.map((student) => {
        return student.CNP === CNP
          ? {
              ...student,
              materii: student.materii.map((materie) =>
                materie.nume === nume ? { ...materie, nota } : materie
              ),
            }
          : student;
      });
    },
    changeGrade: (CNP, nume, nota) => {
      const student = findStudent(CNP);
      if (!student) {
        return noStudentMsg(CNP);
      }
      students = students.map((student) => {
        return student.CNP === CNP
          ? {
              ...student,
              materii: student.materii.map((materie) =>
                materie.nume === nume ? { ...materie, nota } : materie
              ),
            }
          : student;
      });
    },
    showGrade: (CNP, nume) => {
      const student = findStudent(CNP);
      if (!student) {
        return noStudentMsg(CNP);
      }
      const findCourse = student.materii.find(
        (materie) => materie.nume === nume
      );
      if (!findCourse) {
        return `Studentul  ${student.prenume} ${student.nume}, nu este inscris la materia ${nume}`;
      }
      if (findCourse.nota) {
        return `Studentul ${student.prenume} ${student.nume}, la materia ${nume} are nota ${findCourse.nota}`;
      } else {
        return `Studentul nu are inca o nota la materia ${nume}`;
      }
    },
    changeStudentStatus: (CNP, status) => {
      const student = findStudent(CNP);
      if (!student) {
        return noStudentMsg(CNP);
      }
      students = students.map((student) =>
        student.CNP === CNP ? { ...student, status: status } : student
      );
    },
    showStudentStatus: (CNP) => {
      const { nume, prenume, status } = findStudent(CNP);
      if (!nume) {
        return noStudentMsg(CNP);
      } else {
        return `Studentul ${nume} ${prenume} este momentan ${status}`;
      }
    },
  };
}
