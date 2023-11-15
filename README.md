# Project Title

Create your University Database and play with the api by adding removing students ,adding grades and changing them .
Happy coding

## Installation

No installation necessary , you just import the module exported from index.js and use that function to create your university database

## API Reference

#### Get all items

Create university by executing the function
example : const danubius = createUniversity();

```http
  addStudent Method
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `nume`    | `string` | **Required**. Numele studentului    |
| `prenume` | `string` | **Required**. Prenumele studentului |
| `CNP`     | `string` | **Required**. CNP-ul studentului    |
| `buletin` | `string` | **Required**. Buletinul studentului |

#### danubius.addStudent( {nume: 'Lupu', prenume:'Adrian', CNP:1940716000000, buletin:'XR666777'})

```http
  showStudent Method
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `CNP`     | `string` | **Required**. CNP-ul studentului |

#### danubius.showStudent(1940716000000)

```http
  showAllStudents Method
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
|           |      |             |

#### danubius.showAllStudents()

```http
  listAllStudents Method
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
|           |      |             |

#### danubius.listAllStudents()

```http
  editStudent Method
```

| Parameter     | Type     | Description                                                                     |
| :------------ | :------- | :------------------------------------------------------------------------------ |
| `CNP`         | `string` | **Required**. CNP studentului                                                   |
| `studentInfo` | `Object` | **Required**.{nume: **optional**, prenume: **optional**, buletin: **optional**} |

#### danubius.editStudent(1940716000000, {nume: 'Lupu2'})

```http
  enrollCourse Method
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `CNP`     | `string` | **Required**. CNP studentului       |
| `materie` | `string` | **Required**. materia de invatamant |

#### danubius.enrollCourse(1940716000000, 'Informatica')

```http
  findStudentCourses Method
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `CNP`     | `string` | **Required**. CNP studentului |

#### danubius.findStudentCourses(1940716000000)

```http
  deleteCourse Method
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `CNP`     | `string` | **Required**. CNP studentului       |
| `materie` | `string` | **Required**. materia de invatamant |

#### danubius.deleteCourse(1940716000000, 'Informatica')

```http
  addGrade Method
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `CNP`     | `string` | **Required**. CNP studentului       |
| `materie` | `string` | **Required**. materia de invatamant |
| `nota`    | `number` | **Required**. nota de la 1 la 10    |

#### danubius.addGrade(1940716000000, 'Informatica', 10)

```http
  changeGrade Method
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `CNP`     | `string` | **Required**. CNP studentului       |
| `materie` | `string` | **Required**. materia de invatamant |
| `nota`    | `number` | **Required**. nota de la 1 la 10    |

#### danubius.changeGrade(1940716000000, 'Informatica', 10)

```http
  showGrade Method
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `CNP`     | `string` | **Required**. CNP studentului       |
| `materie` | `string` | **Required**. materia de invatamant |

#### danubius.showGrade(1940716000000, 'Informatica')

```http
  changeStudentStatus Method
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- | ------- |
| `CNP`     | `string` | **Required**. CNP studentului |
| `status`  | `string` | **Required**. active          | inactiv |

#### danubius.changeStudentStatus(1940716000000, 'active')

```http
  showStudentStatus Method
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `CNP`     | `string` | **Required**. CNP studentului |

#### danubius.showStudentStatus(1940716000000, 'active')

## Usage/Examples

```javascript
const student = {nume: 'Lupu', prenume:'Adrian', CNP:1940716000000, buletin:'XR666777'};
const student2  = {nume: 'Lupu', prenume:'Adrian2', CNP:1940716000001, buletin:'XR666777'};
const danubius = createUniversity();
danubius.addStudent(student);
danubius.showStudent(student.CNP);
danubius.addStudent(student2);
danubius.showAllStudents();
danubius.listAllStudents();
danubius.showStudent(student2.CNP);
danubius.editStudent(student2.CNP, {prenume: 'Vasile'});
danubius.showStudent(student2.CNP);
danubius.enrollCourse(student2.CNP, 'Informatica');
danubius.findStudentCourses(student2.CNP);
danubius.deleteCourse(student2.CNP, 'Informatica')
danubius.findStudentCourses(student2.CNP)
danubius.enrollCourse(student2.CNP, 'Informatica');
danubius.addGrade(student2.CNP, 'Informatica', 10);
danubius.changeGrade(student2.CNP, 'Informatica', 9);
danubius.showGrade(student2.CNP, 'Matematica');
danubius.changeStudentStatus(student2.CNP, 'active');
danubius.showStudentStatus(student2.CNP);
}
```
