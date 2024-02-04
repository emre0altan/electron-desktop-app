let programmeItem = undefined;
let departmentItem = undefined;
let courseItem = undefined;
let examInfoItem = undefined;
let questionArray = [];
let questionIndex = undefined;



const programmeList = document.getElementById('programmeList');
const departmentListTitle = document.getElementById('departmentListTitle');
const departmentList = document.getElementById('departmentList');
const courseListTitle = document.getElementById('courseListTitle');
const courseList = document.getElementById('courseList');
const examInfoListTitle = document.getElementById('examListTitle');
const examInfoList = document.getElementById('examList');

const formProgramme = document.getElementById('formProgramme');
const formProgrammeProgrammeId = document.getElementById('formProgrammeProgrammeId');
const formProgrammeProgramme = document.getElementById('formProgrammeProgramme');
const formProgrammeUBtn = document.getElementById('formProgrammeUBtn');
const formProgrammeDBtn = document.getElementById('formProgrammeDBtn');

const formProgrammeNew = document.getElementById('formProgrammeNew');
const formProgrammeNewProgrammeId = document.getElementById('formProgrammeNewProgrammeId');
const formProgrammeNewProgramme = document.getElementById('formProgrammeNewProgramme');
const formProgrammeNewABtn = document.getElementById('formProgrammeNewABtn');

const formDepartment = document.getElementById('formDepartment');
const formDepartmentDepartmentId = document.getElementById('formDepartmentDepartmentId');
const formDepartmentProgrammeId = document.getElementById('formDepartmentProgrammeId');
const formDepartmentDepartment = document.getElementById('formDepartmentDepartment');
const formDepartmentUBtn = document.getElementById('formDepartmentUBtn');
const formDepartmentDBtn = document.getElementById('formDepartmentDBtn');

const formDepartmentNew = document.getElementById('formDepartmentNew');
const formDepartmentNewDepartmentId = document.getElementById('formDepartmentNewDepartmentId');
const formDepartmentNewProgrammeId = document.getElementById('formDepartmentNewProgrammeId');
const formDepartmentNewDepartment = document.getElementById('formDepartmentNewDepartment');
const formDepartmentNewABtn = document.getElementById('formDepartmentNewABtn');

const formCourse = document.getElementById('formCourse');
const formCourseCourseId = document.getElementById('formCourseCourseId');
const formCourseCourseCode = document.getElementById('formCourseCourseCode');
const formCourseCourse = document.getElementById('formCourseCourse');
const formCourseUBtn = document.getElementById('formCourseUBtn');
const formCourseDBtn = document.getElementById('formCourseDBtn');

const formCourseNew = document.getElementById('formCourseNew');
const formCourseNewCourseId = document.getElementById('formCourseNewCourseId');
const formCourseNewCourseCode = document.getElementById('formCourseNewCourseCode');
const formCourseNewCourse = document.getElementById('formCourseNewCourse');
const formCourseNewABtn = document.getElementById('formCourseNewABtn');

const formExamInfo = document.getElementById('formExamInfo');
const formExamInfoCourseId = document.getElementById('formExamInfoCourseId');
const formExamInfoCourse = document.getElementById('formExamInfoCourse');
const formExamInfoExamType = document.getElementById('formExamInfoExamType');
const formExamInfoExamYear = document.getElementById('formExamInfoExamYear');
const formExamInfoExamTerm = document.getElementById('formExamInfoExamTerm');
const formExamInfoExamDuration = document.getElementById('formExamInfoExamDuration');
const formExamInfoUBtn = document.getElementById('formExamInfoUBtn');
const formExamInfoDBtn = document.getElementById('formExamInfoDBtn');

const formExamInfoNew = document.getElementById('formExamInfoNew');
const formExamInfoNewCourseId = document.getElementById('formExamInfoNewCourseId');
const formExamInfoNewCourse = document.getElementById('formExamInfoNewCourse');
const formExamInfoNewExamType = document.getElementById('formExamInfoNewExamType');
const formExamInfoNewExamYear = document.getElementById('formExamInfoNewExamYear');
const formExamInfoNewExamTerm = document.getElementById('formExamInfoNewExamTerm');
const formExamInfoNewExamDuration = document.getElementById('formExamInfoNewExamDuration');
const formExamInfoNewABtn = document.getElementById('formExamInfoNewABtn');

const formExamInfoUpdateQuestions = document.getElementById('formExamInfoUpdateQuestions');
const oqcid = document.getElementById('oqcid');
const oqccode = document.getElementById('oqccode');
const oqc = document.getElementById('oqc');
const oqetype = document.getElementById('oqetype');
const oqeyear = document.getElementById('oqeyear');
const oqeterm = document.getElementById('oqeterm');
const oqeduration = document.getElementById('oqeduration');

const qLeftList = document.getElementById('qLeftList');
const qLeftListAdd = document.getElementById('qLeftListAdd');
const qEditParent = document.getElementById('qEditParent');
const questionEdit = document.getElementById('questionEdit')
const answerEdit = document.getElementById('answerEdit')

const qEditor = document.getElementById('questionEditor');
const aEditor1 = document.getElementById('answerEditor1');
const aEditor2 = document.getElementById('answerEditor2');
const aEditor3 = document.getElementById('answerEditor3');
const aEditor4 = document.getElementById('answerEditor4');
const aEditor5 = document.getElementById('answerEditor5');
const correctAnswer = document.getElementById('correctAnswer');

const qEditQSave = document.getElementById('qEditQSave');
const qEditQDelete = document.getElementById('qEditQDelete');

const refreshBtn = document.getElementById('refreshBtn');
const logoutBtn = document.getElementById('logoutButton');
const loadingSpinner = document.getElementById('loadingSpinner')
const listsParent = document.getElementById('listsParent')


document.getElementById('openNewProgramme').addEventListener('click', ()=>{ hideAllForms(); formProgrammeNew.style.display = 'block'; })
document.getElementById('openNewDepartment').addEventListener('click', ()=>{ hideAllForms(); formDepartmentNew.style.display = 'block'; })
document.getElementById('openNewCourse').addEventListener('click', ()=>{ hideAllForms(); formCourseNew.style.display = 'block'; })
document.getElementById('openNewExamInfo').addEventListener('click', ()=>{ hideAllForms(); formExamInfoNew.style.display = 'block'; })

logoutBtn.addEventListener('click', () => { window.electronAPI.logout() });
refreshBtn.addEventListener('click', () => { window.electronAPI.refresh() });

formProgrammeUBtn.addEventListener('click', () => { window.electronAPI.updateProgramme({'id': formProgrammeProgrammeId.value, 'name': formProgrammeProgramme.value}) });
formProgrammeDBtn.addEventListener('click', () => { window.electronAPI.deleteProgramme({'id': formProgrammeProgrammeId.value}) });
formProgrammeNewABtn.addEventListener('click', () => { window.electronAPI.putProgramme({'id': formProgrammeNewProgrammeId.value, 'name': formProgrammeNewProgramme.value}); });

formDepartmentUBtn.addEventListener('click', () => { window.electronAPI.updateDepartment({'id': formDepartmentDepartmentId.value, 'programme_id': formDepartmentProgrammeId.value, 'name': formDepartmentDepartment.value, 'courses': formDepartmentDepartment.courses}) });
formDepartmentDBtn.addEventListener('click', () => { window.electronAPI.deleteDepartment({'id': formDepartmentDepartmentId.value, 'programme_id': formDepartmentProgrammeId.value}) });
formDepartmentNewABtn.addEventListener('click', () => { window.electronAPI.putDepartment({'id': formDepartmentNewDepartmentId.value, 'programme_id': formDepartmentNewProgrammeId.value, 'name': formDepartmentNewDepartment.value}); });

formCourseUBtn.addEventListener('click', () => { window.electronAPI.updateCourse({'id': formCourseCourseId.value, 'code': formCourseCourseCode.value, 'name': formCourseCourse.value}) });
formCourseDBtn.addEventListener('click', () => { window.electronAPI.deleteCourse({'id': formCourseCourseId.value}) });
formCourseNewABtn.addEventListener('click', () => { window.electronAPI.putCourse({'id': formCourseNewCourseId.value, 'code': formCourseNewCourseCode.value, 'name': formCourseNewCourse.value}); });

formExamInfoUBtn.addEventListener('click', () => { window.electronAPI.updateExamInfo({'course_id': formExamInfoCourseId.value, 'exam_type': formExamInfoExamType.value, 'exam_year': formExamInfoExamYear.value, 'exam_term': formExamInfoExamTerm.value, 'exam_duration': formExamInfoExamDuration.value}) });
formExamInfoDBtn.addEventListener('click', () => { window.electronAPI.deleteExamInfo({'course_id': formExamInfoCourseId.value, 'exam_type': formExamInfoExamType.value, 'exam_year': formExamInfoExamYear.value, 'exam_term': formExamInfoExamTerm.value}) });
formExamInfoNewABtn.addEventListener('click', () => { window.electronAPI.putExamInfo({'course_id': formExamInfoNewCourseId.value, 'exam_type': formExamInfoNewExamType.value, 'exam_year': formExamInfoNewExamYear.value, 'exam_term': formExamInfoNewExamTerm.value, 'exam_duration': formExamInfoNewExamDuration.value}); });

formExamInfoUpdateQuestions.addEventListener('click', openUpdateQuestions);

qLeftListAdd.addEventListener('click', addNewQuestionButtonToList);
qEditQSave.addEventListener('click', saveQuestion);
qEditQDelete.addEventListener('click', deleteQuestion);

const profileName = document.getElementById('profileName')
const profileEmail = document.getElementById('profileEmail')

window.electronAPI.onUpdateName((value) => {
    profileName.innerText = value['name'].toString()
    profileEmail.innerText = value['email'].toString()
})

window.electronAPI.onProgrammes((items) => {
    clearList(programmeList, items);
    items.forEach((item, index) => {
        btn = addNewBtnToList(item.id + "-" + item.name, programmeList, (event) => {
            programmeSelected(event.currentTarget.item, event.currentTarget.index);
            const params = {'programme_id': event.currentTarget.item.id, 'list_index': event.currentTarget.index};
            window.electronAPI.getDepartments(params);
        });
        btn.item = item;
        btn.index = index;
    });
})

window.electronAPI.onDepartments((items, programme) => {
    clearList(departmentList, items);
    if(items != undefined){
        items.forEach((item, index) => {
            btn = addNewBtnToList(item.id + "-" + item.programme_id + "-" + item.name, departmentList, (event) => {
                departmentSelected(event.currentTarget.item, event.currentTarget.index);
                const params = {'department_id': event.currentTarget.item.id, 'list_index': event.currentTarget.index};
                window.electronAPI.getCourses(params);
            });
            btn.item = item;
            btn.index = index;
        });
    }
})

window.electronAPI.onCourses((items, department) => {
    clearList(courseList, items);
    if(items != undefined){
        i = 0;
        items.forEach((item, index) => {
            term_id = parseInt(item.term_id)
            if(term_id > i){
                const termTitle = document.createElement('h6');
                termTitle.classList.add('text-center');
                termTitle.innerText = term_id + ". Yariyil";
                courseList.appendChild(termTitle);
                i++;
            }

            btn = addNewBtnToList(item.id + "-" + item.term_id + "-" + item.name, courseList, (event) => {
                courseSelected(event.currentTarget.item, event.currentTarget.index);
                const params = {'course_id': event.currentTarget.item.id, 'list_index': event.currentTarget.index};
                window.electronAPI.getExamInfos(params);
            });
            btn.item = item;
            btn.index = index;
        });
    }
})

window.electronAPI.onExamInfos((value, course) => {
    clearList(examList, undefined, course == undefined);
    
    if(course != undefined){
        if(value == undefined || value.length == 0){
            const listBtn = document.createElement('h5');
            listBtn.classList.add('text-center')
            listBtn.textContent = "Kayitli sinav yok!"
            examList.appendChild(listBtn);
        }
        else{
            examList.innerHTML = '';
            value.forEach((item, index) => {
                btn = addNewBtnToList(item.id, examList, (event) => {
                    examInfoSelected(event.currentTarget.item, event.currentTarget.course, event.currentTarget.index);
            });
            btn.index = index;
            btn.item = item;
            btn.course = course;
            });
        }
    }
})

window.electronAPI.onPreferences((pref_items, list_indexes) => {
    if(pref_items.length > 0) programmeSelected(pref_items[0], list_indexes[0]);
    if(pref_items.length > 1) departmentSelected(pref_items[1], list_indexes[1]);
    if(pref_items.length > 2) courseSelected(pref_items[2], list_indexes[2]);
})

window.electronAPI.onQuestions((exam_info_id, questions) => {
    qLeftList.innerHTML = '';
    questionArray = questions;
    questions.forEach((value, index)=>{
        const li = createElement('li', qLeftList, ['list-group-item', 'p-0', 'mt-1']);
        const btn = createElement('btn', li, ['btn', 'btn-secondary', 'p-0']);
        btn.type = 'button';
        btn.style = 'width: 100%;';
        btn.innerText = questionArray[index].question_index;
        btn.addEventListener('click', ()=>{
            questionClicked(questionArray[index].question_index, index);
        })
    })
})

function remove_active(parent){
    var childButtons = parent.querySelectorAll('button');
    childButtons.forEach((button) => {
        button.classList.remove('active');
    })
}

function openUpdateQuestions(){
    contentRoot.style = 'display: none;';
    questionEditRoot.style = 'display: block;'

    oqcid.innerHTML = 'Ders Id: <b>' + courseItem.id + '</b>';
    oqccode.innerHTML = 'Ders Kodu: <b>' + courseItem.code + '</b>';
    oqc.innerHTML = 'Ders: <b>' + courseItem.name + '</b>';

    oqetype.innerHTML = 'Sinav Turu: <b>' + examInfoItem.exam_type + '</b>';
    oqeyear.innerHTML = 'Sinav Yili: <b>' + examInfoItem.exam_year + '</b>';
    oqeterm.innerHTML = 'Sinav Donemi: <b>' + examInfoItem.exam_term + '</b>';
    oqeduration.innerHTML = 'Sinav Suresi (s): <b>' + examInfoItem.exam_duration + '</b>';

    window.electronAPI.getQuestions({'exam_info_id': examInfoItem.id});
}

function addNewQuestionButtonToList(){
    const li = createElement('li', qLeftList, ['list-group-item', 'p-0', 'mt-1']);
    const btn = createElement('btn', li, ['btn', 'btn-secondary', 'p-0']);
    btn.type = 'button';
    btn.style = 'width: 100%;';
    let index = 1;
    let list_index = 0;
    if(questionArray.length > 0){
        index = questionArray[questionArray.length-1].question_index+1;
        list_index = questionArray.length;
    }
    temp = getQuestionTemplate();
    temp['question_index'] = index;
    questionArray.push(temp);
    btn.innerText = index;
    
    btn.addEventListener('click', ()=>{
        questionClicked(index, list_index);
    })
}

function questionClicked(q_index, list_index){
    window.electronAPI.consoleLog('QUESTION CLICKED:' + q_index + "---" + list_index);
    var children = qLeftList.getElementsByTagName('li');
    for (var i = 0; i < children.length; i++) {
        var tableChild = children[i];
        tableChild.firstChild.classList.remove('active')
    }

    qLeftList.getElementsByTagName('li').item(list_index).firstChild.classList.add('active')
    questionIndex = q_index;
    qEditParent.style = 'display: block;'
    currQues = questionArray[list_index];
    images = currQues['image_data']
    window.electronAPI.consoleLog(images.length)
    for(var key in images){
        currQues.question = currQues.question.replace('@@', '<img src="' + images[key] + '">');
    }

    window.electronAPI.consoleLog(currQues.question)
    questionEditor.clipboard.dangerouslyPasteHTML(currQues.question);
    answerEditor1.clipboard.dangerouslyPasteHTML(currQues.answers[0]);
    answerEditor2.clipboard.dangerouslyPasteHTML(currQues.answers[1]);
    answerEditor3.clipboard.dangerouslyPasteHTML(currQues.answers[2]);
    answerEditor4.clipboard.dangerouslyPasteHTML(currQues.answers[3]);
    answerEditor5.clipboard.dangerouslyPasteHTML(currQues.answers[4]);
    switch (currQues.correct_answer) {
        case 'A':
            correctAnswer.value = 1;
            break;
        case 'B':
            correctAnswer.value = 2;
            break;
        case 'C':
            correctAnswer.value = 3;
            break;
        case 'D':
            correctAnswer.value = 4;
            break;
        case 'E':
            correctAnswer.value = 5;
            break;
        default:
            break;
    }
}

function saveQuestion(){
    console.log()
    if(questionIndex != undefined && examInfoItem != undefined){
        const question = qEditor.firstChild.innerHTML.replace(/<img[^>]*>/g,"@@");
        const questionType = "1";
        const imageData = extractImageData(qEditor.firstChild);
        const answers = [
            aEditor1.firstChild.innerHTML,
            aEditor2.firstChild.innerHTML,
            aEditor3.firstChild.innerHTML,
            aEditor4.firstChild.innerHTML,
            aEditor5.firstChild.innerHTML,
        ]
        var correct_answer = correctAnswer.options[correctAnswer.selectedIndex].text;
        const params = {'exam_info_id': examInfoItem.id, 'question_index': questionIndex, 'question': question, 'question_type': questionType,
                'image_data': imageData, 'answers': answers, 'correct_answer': correct_answer};
        window.electronAPI.updateQuestion(params);
    }
}

function extractImageData(questionHTMLParent){
    const images = questionHTMLParent.getElementsByTagName('img');
    var imageList = Array.prototype.slice.call(images);
    let data = []
    imageList.forEach((image, index)=>{
        data.push(image.src);
    })
    return data;
}

function deleteQuestion(){
    if(questionIndex != undefined && examInfoItem != undefined){
        const params = {'exam_info_id': examInfoItem.id, 'question_index': questionIndex};
        window.electronAPI.deleteQuestion(params);
        qEditParent.style = 'display: none;'
    }
}

function getQuestionTemplate(){
    question = `
        <ol>
            <li>Uretim Yaklasimi</li>
            <li>Pazarlama Yonetimi Yaklasimi</li>
            <li>Satis Yaklasimi</li>
            <li>Sosyal Pazarlama Yaklasimi</li>
            <li>Urun Yaklasimi</li>
        </ol>
        <p>Yukaridaki pazarlama &nbsp;yaklasimlarinin hangisi/hangileri modern pazarlama anlayisina aittir?</p>`
    answers = [
        "<p>Yalniz 1</p>",
        "<p>1 ve 2</p>",
        "<p>2 ve 3</p>",
        "<p>2 ve 4</p>",
        "<p>1,3 ve 4</p>"
    ]
    return {'question': question, 'answers': answers, 'image_data': '', 'question_type': '1', 'question_index': 1}
}