import { getKey, setKey, clearKey } from './handler_storing.cjs';
import { keyUserData, keyProgrammes, keyDepartments, keyCourses, keyExamInfos, keyListIndexes, keySelectedIndexes } from './handler_storing.cjs';
import { app, ipcMain } from 'electron';
import * as api from './handler_api_calls.mjs';
import * as api_helper from './handler_api_helper.mjs';

function print_preferences(){
    console.log("---------PREFERENCES-----------")
    for (let index = 0; index < keyListIndexes.length; index++) {
        console.log(index + ":: real: " + getKey(keySelectedIndexes[index]) + ", list: " + getKey(keyListIndexes[index]))
    }
    console.log("-------------------------------")
}

function update_preferences(index_of_index, real_index, list_index){
    for (let index = 0; index < keyListIndexes.length; index++) {
        if(index_of_index == index){
            setKey(keySelectedIndexes[index_of_index], real_index);
            setKey(keyListIndexes[index_of_index], list_index);
        }else if(index_of_index < index){
            clearKey(keySelectedIndexes[index]);
            clearKey(keyListIndexes[index]);
        }
    }
    print_preferences();
}


async function on_preferences(mainWindow){
    const pref_items = [];
    const list_indexes = [getKey(keyListIndexes[0]), getKey(keyListIndexes[1]), getKey(keyListIndexes[2])]
    if(list_indexes[0] != undefined) pref_items.push(await api_helper.getProgrammeFromID(getKey(keySelectedIndexes[0])));
    if(list_indexes[1] != undefined) pref_items.push(await api_helper.getDepartmentFromID(getKey(keySelectedIndexes[1])));
    if(list_indexes[2] != undefined) pref_items.push(await api_helper.getCourseFromID(getKey(keySelectedIndexes[2])));

    mainWindow.webContents.send('on-preferences', pref_items, list_indexes);
}

async function loadingWrapper(mainWindow, func, params){
    mainWindow.webContents.send('loading-started');
    await func(mainWindow, params);
    mainWindow.webContents.send('loading-ended');
}

async function hardRefresh(mainWindow, params){
    await api.getProgrammes(false);
    await api.getDepartments(false);
    await api.getCourses(false);
    await api.getExamInfos(false);
    await update_programmes(mainWindow);
}

async function onFinishLoad(mainWindow, params){
    const courses = await api.getCourses();
    mainWindow.webContents.send('on-all-courses', courses);
    await update_programmes(mainWindow);
    await on_preferences(mainWindow);
}
//PROGRAMME
async function putProgramme(mainWindow, params){
    console.log("Put programme: " + params['id'] + " -  " + params['name']);
    await api.putProgramme(params['id'], params['name']);
    await update_programmes(mainWindow);
}

async function updateProgramme(mainWindow, params){
    console.log("Update programme: " + params['id'] + " -  " + params['name']);
    await api.updateProgramme(params['id'], params['name']);
    await update_programmes(mainWindow);
}

async function deleteProgramme(mainWindow, params){
    console.log("Delete programme: " + params['id']);
    await api.deleteProgramme(params['id']);
    await update_programmes(mainWindow);
}
//DEPARTMENT
async function getDepartments(mainWindow, params){
    update_preferences(0, params['programme_id'], params['list_index']);
    await update_departments(mainWindow);
}

async function putDepartment(mainWindow, params){
    console.log("Put department: " + params['id'] + " - " + params['programme_id'] + " -  " + params['name']);
    await api.putDepartment(params['id'], params['programme_id'], params['name']);
    await update_departments(mainWindow);
}

async function updateDepartment(mainWindow, params){
    console.log("Update department: " + params['id'] + " - " + params['programme_id'] + " -  " + params['name']);
    await api.updateDepartment(params['id'], params['programme_id'], params['name'], params['courses']);
    await update_departments(mainWindow);
}

async function deleteDepartment(mainWindow, params){
    console.log("Delete department: " + params['id'] + " - " + params['programme_id']);
    await api.deleteDepartment(params['id'], params['programme_id']);
    await update_departments(mainWindow);
}
//COURSE
async function getCourses(mainWindow, params){
    update_preferences(1, params['department_id'], params['list_index']);
    await update_courses(mainWindow);
}

async function putCourse(mainWindow, params){
    console.log("Put course: " + params['id'] + " - " + params['code'] + " -  " + params['name']);
    await api.putCourse(params['id'], params['code'], params['name']);
    await update_departments(mainWindow);
}

async function updateCourse(mainWindow, params){
    console.log("Update course: " + params['id'] + " - " + params['code'] + " -  " + params['name']);
    await api.updateCourse(params['id'], params['code'], params['name']);
    await update_departments(mainWindow);
}

async function deleteCourse(mainWindow, params){
    console.log("Delete course: " + params['id']);
    await api.deleteCourse(params['id']);
    await update_departments(mainWindow);
}
//EXAM
async function getExamInfos(mainWindow, params){
    update_preferences(2, params['course_id'], params['list_index']);
    await update_exam_infos(mainWindow);
}

async function putExamInfo(mainWindow, params){
    console.log("Put exam info: " + params['course_id'] + " - " + params['exam_type'] + " - " + params['exam_year'] + " - " + params['exam_term'] + " - " + params['exam_duration']);
    await api.putExamInfo(params['course_id'], params['exam_type'], params['exam_year'], params['exam_term'], params['exam_duration']);
    await update_exam_infos(mainWindow);
}

async function updateExamInfo(mainWindow, params){
    console.log("Update exam info: " + params['course_id'] + " - " + params['exam_type'] + " - " + params['exam_year'] + " - " + params['exam_term'] + " - " + params['exam_duration']);
    await api.updateExamInfo(params['course_id'], params['exam_type'], params['exam_year'], params['exam_term'], params['exam_duration']);
    await update_exam_infos(mainWindow);
}

async function deleteExamInfo(mainWindow, params){
    console.log("Delete course: " + params['course_id'] + " - " + params['exam_type'] + " - " + params['exam_year'] + " - " + params['exam_term']);
    await api.deleteExamInfo(params['course_id'], params['exam_type'], params['exam_year'], params['exam_term']);
    await update_exam_infos(mainWindow);
}
//QUESTION
async function getQuestions(mainWindow, params){
    await update_question_list(mainWindow, params['exam_info_id']);
}

async function putQuestion(mainWindow, params){
    console.log("Put question: " + params['exam_info_id'] + " - " + params['question_index'] + " - " + 
        params['question'] + " - " + params['question_type'] + " - " + params['image_data'] + " - " + params['answers']);
    await api.putQuestion(params['exam_info_id'], params['question_index'], params['question'], 
        params['question_type'], params['image_data'], params['answers'], params['correct_answer']);
    await update_question_list(mainWindow, params['exam_info_id']);
}

async function updateQuestion(mainWindow, params){
    console.log("Update question: " + params['exam_info_id'] + " - " + params['question_index'] + " - " + 
        params['question'] + " - " + params['question_type'] + " - " + params['image_data'] + " - " + params['answers']);
    await api.updateQuestion(params['exam_info_id'], params['question_index'], params['question'], 
        params['question_type'], params['image_data'], params['answers'], params['correct_answer']);
    await update_question_list(mainWindow, params['exam_info_id']);
}

async function deleteQuestion(mainWindow, params){
    console.log("Delete question: " + params['exam_info_id'] + " - " + params['question_index']);
    await api.deleteQuestion(params['exam_info_id'], params['question_index']);
    await update_question_list(mainWindow, params['exam_info_id']);
}

async function addCourseToDepartment(mainWindow, params){
    let department = await api_helper.getDepartmentFromID(params['id']);
    let exist = false;
    if(department.courses != undefined){
        for(var key in department.courses){
            let course = department.courses[key];
            if(course.course_id == params['course_id'] && course.term_id == params['term_id']){
                exist = true;
                break;
            }
        }
    }else{
        department.courses = []
    }
    if(!exist){
        department.courses.push({
            'course_id': params['course_id'], 
            'term_id': params['term_id']
        });
        await updateDepartment(mainWindow, department);
    }
}

async function deleteCourseFromDepartment(mainWindow, params){
    let department = await api_helper.getDepartmentFromID(params['id']);
    let exist = false;
    let index = -1;
    if(department.courses != undefined){
        for(var key in department.courses){
            let course = department.courses[key];
            if(course.course_id == params['course_id'] && course.term_id == params['term_id']){
                exist = true;
                index = key;
                break;
            }
        }
    }else{
        department.courses = []
    }
    if(exist){
        department.courses.splice(index, 1);
        await updateDepartment(mainWindow, department);
    }
}

function add_ipc_main_listeners(mainWindow, params){
    print_preferences();
    mainWindow.webContents.on('did-finish-load', async ()=>{
        loadingWrapper(mainWindow, onFinishLoad, {});
    })

    ipcMain.on('console-log', (_event, value) => {
        console.log(value);
    })

    ipcMain.on('refresh', async (_event) => {
        loadingWrapper(mainWindow, hardRefresh, {});
    })

    ipcMain.on('put-programme', async (_event, params) => { loadingWrapper(mainWindow, putProgramme, params); })
    ipcMain.on('update-programme', async (_event, params) => { loadingWrapper(mainWindow, updateProgramme, params); })
    ipcMain.on('delete-programme', async (_event, params) => { loadingWrapper(mainWindow, deleteProgramme, params); })

    ipcMain.on('get-departments', async (_event, params) => {  loadingWrapper(mainWindow, getDepartments, params); })
    ipcMain.on('put-department', async (_event, params) => {  loadingWrapper(mainWindow, putDepartment, params); })
    ipcMain.on('update-department', async (_event, params) => {  loadingWrapper(mainWindow, updateDepartment, params); })
    ipcMain.on('delete-department', async (_event, params) => {  loadingWrapper(mainWindow, deleteDepartment, params); })

    ipcMain.on('get-courses', async (_event, params) => { loadingWrapper(mainWindow, getCourses, params); })
    ipcMain.on('put-course', async (_event, params) => { loadingWrapper(mainWindow, putCourse, params); })
    ipcMain.on('update-course', async (_event, params) => { loadingWrapper(mainWindow, updateCourse, params); })
    ipcMain.on('delete-course', async (_event, params) => { loadingWrapper(mainWindow, deleteCourse, params); })

    ipcMain.on('get-exam-infos', async (_event, params) => { loadingWrapper(mainWindow, getExamInfos, params); })
    ipcMain.on('put-exam-info', async (_event, params) => { loadingWrapper(mainWindow, putExamInfo, params); })
    ipcMain.on('update-exam-info', async (_event, params) => { loadingWrapper(mainWindow, updateExamInfo, params); })
    ipcMain.on('delete-exam-info', async (_event, params) => { loadingWrapper(mainWindow, deleteExamInfo, params); })

    ipcMain.on('add-course-to-department', async (_event, params) => { loadingWrapper(mainWindow, addCourseToDepartment, params); })
    ipcMain.on('delete-course-from-department', async (_event, params) => { loadingWrapper(mainWindow, deleteCourseFromDepartment, params); })

    ipcMain.on('get-questions', async (_event, params) => { loadingWrapper(mainWindow, getQuestions, params); })
    ipcMain.on('put-question', async (_event, params) => { loadingWrapper(mainWindow, putQuestion, params); })
    ipcMain.on('update-question', async (_event, params) => { loadingWrapper(mainWindow, updateQuestion, params); })
    ipcMain.on('delete-question', async (_event, params) => { loadingWrapper(mainWindow, deleteQuestion, params); })
    
    ipcMain.on('get-auth-status', (_event) => {
        const userData = getKey(keyUserData);
        const isAuthenticated = !!userData;
        event.reply('auth-status', { isAuthenticated });
    });
    
    ipcMain.on('logout', (event) => {
        clearKey(keyUserData);
        app.relaunch();
        app.exit();
    })
}

async function update_programmes(mainWindow) {
    const result = await api.getProgrammes();
    mainWindow.webContents.send('on-programmes', result);
    await update_departments(mainWindow);
}

async function update_departments(mainWindow) {
    const programmeId = getKey(keySelectedIndexes[0]);
    let departments = undefined;
    let programme = undefined
    if(programmeId != undefined){
        departments = await api_helper.getProgrammeDepartments(programmeId);
        programme = await api_helper.getProgrammeFromID(programmeId);
    }
    mainWindow.webContents.send('on-departments', departments, programme);
    await update_courses(mainWindow);
}

async function update_courses(mainWindow) {
    const departmentId = getKey(keySelectedIndexes[1]);
    let courses = undefined;
    let department = undefined
    if(departmentId != undefined){
        courses = await api_helper.getDepartmentCourses(departmentId);
        department = await api_helper.getDepartmentFromID(departmentId);
    }
    mainWindow.webContents.send('on-courses', courses, department);
    await update_exam_infos(mainWindow);
}

async function update_exam_infos(mainWindow) {
    const courseId = getKey(keySelectedIndexes[2]);
    let exam_infos = undefined;
    let course = undefined
    if(courseId != undefined){
        exam_infos = await api_helper.getCourseExamInfos(courseId);
        course = await api_helper.getCourseFromID(courseId);
    }
    mainWindow.webContents.send('on-exam-infos', exam_infos, course);
}

async function update_question_list(mainWindow, exam_info_id){
    let questions = await api.getQuestions(exam_info_id, false);
    if('error' in questions) questions = []
    mainWindow.webContents.send('on-questions', exam_info_id, questions);
}

export {
    add_ipc_main_listeners,
};