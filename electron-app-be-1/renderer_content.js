const contentRoot = document.getElementById('contentRoot');

function addNewButtons(){
    const n1 = createElement('nav', contentRoot, ['navbar', 'navbar-expand-lg', 'navbar-dark', 'bg-secondary'])
    const d1 = createElement('div', n1, ['container-fluid'])

    const d2 = createElement('div', d1, ['collapse', 'navbar-collapse']);
    d2.id = 'navbarSupportedContent';

    const ul2 = createElement('ul', d2, ['navbar-nav', 'ms-auto', 'mb-2', 'mb-lg-0']);
    
    const b3 = createElement('button', ul2, ['btn', 'btn-success', 'mx-2']);
    b3.type = 'submit';
    b3.id = 'openNewProgramme';
    b3.innerText = 'Yeni Program Ekle';

    const b4 = createElement('button', ul2, ['btn', 'btn-success', 'mx-2']);
    b4.type = 'submit';
    b4.id = 'openNewDepartment';
    b4.innerText = 'Yeni Bolum Ekle';

    const b5 = createElement('button', ul2, ['btn', 'btn-success', 'mx-2']);
    b5.type = 'submit';
    b5.id = 'openNewCourse';
    b5.innerText = 'Yeni Ders Ekle';

    const b6 = createElement('button', ul2, ['btn', 'btn-success', 'mx-2']);
    b6.type = 'submit';
    b6.id = 'openNewExamInfo';
    b6.innerText = 'Yeni Sinav Ekle';

    const b2 = createElement('button', ul2, ['btn', 'btn-success', 'mx-2']);
    b2.type = 'submit';
    b2.id = 'refreshBtn';
    b2.innerText = 'Veritabanindan Cek';
}
addNewButtons();


const programmeLabels = [
    {
        'type': 'textInput',
        'label':'Program Id:',
        'id':'ProgrammeId'
    },
    {
        'type': 'textInput',
        'label':'Program:',
        'id':'Programme'
    }
];

const departmentLabels = [
    {
        'type': 'textInput',
        'label':'Bolum Id:',
        'id':'DepartmentId'
    },
    {
        'type': 'textInput',
        'label':'Program Id:',
        'id':'ProgrammeId'
    },
    {
        'type': 'textInput',
        'label':'Bolum:',
        'id':'Department'
    }
];

const courseLabels = [
    {
        'type': 'textInput',
        'label':'Ders Id:',
        'id':'CourseId'
    },
    {
        'type': 'textInput',
        'label':'Ders Kodu:',
        'id':'CourseCode'
    },
    {
        'type': 'textInput',
        'label':'Ders:',
        'id':'Course'
    },
];

const examInfoLabels = [
    {
        'type': 'textInput',
        'label':'Ders Id:',
        'id':'CourseId'
    },
    {
        'type': 'textInput',
        'label':'Ders:',
        'id':'Course'
    },
    {
        'type': 'textInput',
        'label':'Sinav Turu:',
        'id':'ExamType'
    },
    {
        'type': 'textInput',
        'label':'Sinav Yili:',
        'id':'ExamYear'
    },
    {
        'type': 'textInput',
        'label':'Sinav Donemi:',
        'id':'ExamTerm'
    },
    {
        'type': 'textInput',
        'label':'Sinav Suresi (s):',
        'id':'ExamDuration'
    },
    {
        'type': 'button',
        'label':'Sinav Sorularini Guncelle',
        'id':'UpdateQuestions'
    }
];

const newExamInfoLabels = [
    {
        'type': 'textInput',
        'label':'Ders Id:',
        'id':'CourseId'
    },
    {
        'type': 'textInput',
        'label':'Ders:',
        'id':'Course'
    },
    {
        'type': 'textInput',
        'label':'Sinav Turu:',
        'id':'ExamType'
    },
    {
        'type': 'textInput',
        'label':'Sinav Yili:',
        'id':'ExamYear'
    },
    {
        'type': 'textInput',
        'label':'Sinav Donemi:',
        'id':'ExamTerm'
    },
    {
        'type': 'textInput',
        'label':'Sinav Suresi (s):',
        'id':'ExamDuration'
    },
];

function createList(parent, title, titleId, listParentId){
    const d1 = createElement('div', parent, ['col']);
    const h1 = createElement('h5', d1, ['text-center'])
    h1.innerText = title;
    h1.id = titleId;
    const d2 = createElement('div', d1, ['d-grid', 'gap-1', 'm-2']);
    d2.id = listParentId;
    const h2 = createElement('h6', d2, ['text-center'])
    h2.innerText = '...'
}

function createUpdateForm(parent, formIdPrefix, headerTitle, formObj, isForNew){
    if(isForNew) formIdPrefix = formIdPrefix + 'New';
    let bg = isForNew ? 'bg-success' : 'bg-warning';

    const d1 = createElement('div', parent, ['card', bg, 'bg-gradient', 'my-2']);
    d1.id = formIdPrefix;
    d1.style = 'display: none;'

    const d2 = createElement('div', d1, ['card-body']);
    d2.id = formIdPrefix + 'CardBody';
    const b6 = createElement('button', d2, ['btn-close', 'btn-close-dark', 'ms-auto']);
    b6.setAttribute('aria-label', 'Close');
    b6.addEventListener('click', ()=>{
        d1.style = 'display: none;'
    })
    const h1 = createElement('h5', d2, ['card-title', 'text-dark']);
    h1.innerText = headerTitle;

    for(var key in formObj){
        if(formObj[key].type == 'textInput'){
            const d3 = createElement('div', d2, ['input-group', 'mb-3']);
            const s1 = createElement('span', d3, ['input-group-text', 'w-25']);
            s1.style = 'display: inline-block;'
            s1.innerText = formObj[key].label;

            const i1 = createElement('input', d3, ['form-control', 'fw-bold']);
            i1.type = 'text';
            i1.id = formIdPrefix + formObj[key].id;
            i1.placeholder = "Enter " + formObj[key].label
            i1.setAttribute('aria-label', formObj[key].label); 
            i1.setAttribute('aria-describedby', 'basic-addon1'); 
        }else if(formObj[key].type == 'button'){
            const b1 = createElement('button', d1, ['btn', 'btn-success', 'm-3']);
            b1.type = 'button';
            b1.innerText = formObj[key].label;
            b1.id = formIdPrefix + formObj[key].id;
        }
    }

    if(isForNew){
        const b1 = createElement('button', d2, ['btn', 'btn-primary']);
        b1.type = 'button';
        b1.innerText = 'Ekle';
        b1.id = formIdPrefix + 'ABtn';
    
    } else{
        const b1 = createElement('button', d2, ['btn', 'btn-primary']);
        b1.type = 'button';
        b1.innerText = 'Guncelle';
        b1.id = formIdPrefix + 'UBtn';

        const b2 = createElement('button', d2, ['btn', 'btn-danger']);
        b2.type = 'button';
        b2.innerText = 'Sil';
        b2.id = formIdPrefix + 'DBtn';
    }
}

function createFormGroup(parent){
    const d1 = createElement('div', parent, ['col-4', 'bg-secondary', 'bg-gradient']);
    createUpdateForm(d1, 'formExamInfo', 'Sinavi Guncelle', examInfoLabels, false);
    createUpdateForm(d1, 'formExamInfo', 'Yeni Sinav Ekle', newExamInfoLabels, true);

    createUpdateForm(d1, 'formCourse', 'Dersi Guncelle', courseLabels, false);
    createUpdateForm(d1, 'formCourse', 'Yeni Ders Ekle', courseLabels, true);

    createUpdateForm(d1, 'formDepartment', 'Bolumu Guncelle', departmentLabels, false);
    createUpdateForm(d1, 'formDepartment', 'Yeni Bolum Ekle', departmentLabels, true);

    createUpdateForm(d1, 'formProgramme', 'Programi Guncelle', programmeLabels, false);
    createUpdateForm(d1, 'formProgramme', 'Yeni Program Ekle', programmeLabels, true);
}

function addLists(){
    const d1 = createElement('div', contentRoot, ['container-fluid']);
    d1.id = 'listsParent';

    const d2 = createElement('div', d1, ['row']);
    createList(d2, '--Programlar--', 'programmeListTitle', 'programmeList');
    createList(d2, '--Bolumler--', 'departmentListTitle', 'departmentList');
    createList(d2, '--Dersler--', 'courseListTitle', 'courseList');
    createList(d2, '--Sinavlar--', 'examListTitle', 'examList');
    createFormGroup(d2);
}

addLists();
let all_courses = undefined;
function addCourseOptionDepartmentForm(){
    const formDepartmentCardBody = document.getElementById('formDepartmentCardBody');

    const formObj = [
        {
            'label':'Ders Id:',
            'id':'CourseId',
            'key': 'id'
        },
        {
            'label':'Ders:',
            'id':'Course',
            'key': 'name'
        },
        {
            'label':'Donem:',
            'id':'Term',
            'key': ''
        },
    ];

    const d4 = createElement('div', formDepartmentCardBody, ['input-group', 'm-3']);
    const s2 = createElement('span', d4, ['input-group-text', 'w-25']);
    s2.style = 'display: inline-block;'
    s2.innerText = 'Ders Ara:';

    const i2 = createElement('input', d4, ['form-control', 'fw-bold']);
    i2.type = 'text';
    i2.id = 'input';
    i2.placeholder = 'Ders ismi yaz...';
    const ul1 = createElement('ul', formDepartmentCardBody, ['list']);

    for(var key in formObj){
        const d3 = createElement('div', formDepartmentCardBody, ['input-group', 'm-3']);
        const s1 = createElement('span', d3, ['input-group-text', 'w-25']);
        s1.style = 'display: inline-block;'
        s1.innerText = formObj[key].label;

        const i1 = createElement('input', d3, ['form-control', 'fw-bold']);
        i1.type = 'text';
        i1.id = 'formDepartmentAddCourse' + formObj[key].id;
        i1.placeholder = "Enter " + formObj[key].label
        i1.setAttribute('aria-label', formObj[key].label); 
        i1.setAttribute('aria-describedby', 'basic-addon1'); 
    }

    autosuggestion(i2, ul1, all_courses);

    const b1 = createElement('button', formDepartmentCardBody, ['btn', 'btn-primary']);
    b1.type = 'button';
    b1.innerText = 'Dersi Bolume Ekle';
    b1.id = 'formDepartmentAddCourseAddBtn';

    const b2 = createElement('button', formDepartmentCardBody, ['btn', 'btn-danger']);
    b2.type = 'button';
    b2.innerText = 'Dersi Bolumden Sil';
    b2.id = 'formDepartmentAddCourseDeleteBtn';

    b1.addEventListener('click', () => { window.electronAPI.addCourseToDepartment({
        'id': formDepartmentDepartmentId.value, 
        'course_id': document.getElementById('formDepartmentAddCourseCourseId').value,
        'term_id': document.getElementById('formDepartmentAddCourseTerm').value
    }); });
    b2.addEventListener('click', () => { window.electronAPI.deleteCourseFromDepartment({
        'id': formDepartmentDepartmentId.value, 
        'course_id': document.getElementById('formDepartmentAddCourseCourseId').value,
        'term_id': document.getElementById('formDepartmentAddCourseTerm').value
    }); });
}

window.electronAPI.onAllCourses((items) => {
    if(all_courses == undefined){
        all_courses = items;
        addCourseOptionDepartmentForm();
    }
})

function autosuggestion(input, ulList, courses){
    input.addEventListener("keyup", (e) => {
        removeElements();
        for (let i of courses) {
            if (
                i.name.toLowerCase().includes(input.value.toLowerCase()) &&
                input.value != ""
            ) {
                //create li element
                let listItem = document.createElement("li");
                //One common class name
                listItem.classList.add("list-items");
                listItem.style.cursor = "pointer";
                listItem.addEventListener('click', ()=>{
                    displayNames(i.name);
                    document.getElementById('formDepartmentAddCourseCourseId').value = i.id;
                    document.getElementById('formDepartmentAddCourseCourse').value = i.name;
                })
                //Display matched part in bold
                let index = i.name.toLowerCase().indexOf(input.value.toLowerCase());
                let end = index + input.value.length;
                let word = i.name.substr(0, index);
                word += "<b>" + i.name.substr(index, input.value.length) + "</b>";
                word += i.name.substr(end);
                //display the value in array
                listItem.innerHTML = word;
                ulList.appendChild(listItem);
            }
        }
    });
}

function displayNames(value) {
    input.value = value;
    removeElements();
}
function removeElements() {
    //clear all the item
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
    item.remove();
    });
}