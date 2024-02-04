import * as storage from './handler_storing.cjs'
import * as api from './handler_api_calls.mjs'

async function getProgrammeFromID(programme_id){
    if(!storage.hasKey(storage.keyProgrammes)){
        await api.getProgrammes();
    }
    
    const dictionary = storage.getKey(storage.keyProgrammes)
    for(var i in dictionary){
        if(dictionary[i].id == programme_id){
            return dictionary[i];
        }
    }
    return undefined;
}

async function getProgrammeDepartments(programme_id) {
    if(!storage.hasKey(storage.keyDepartments)){
        await api.getDepartments();
    }
    const allDepartments = storage.getKey(storage.keyDepartments);
    let sub = [];
    allDepartments.forEach(department => {
        if(department.programme_id == programme_id){
            sub.push(department);
        }
    });
    return sub;
}

async function getDepartmentFromID(department_id){
    if(!storage.hasKey(storage.keyDepartments)){
        await api.getDepartments();
    }
    const dictionary = storage.getKey(storage.keyDepartments)
    for(var i in dictionary){
        if(dictionary[i].id == department_id){
            return dictionary[i];
        }
    }
    return undefined;
}
async function getDepartmentCourses(department_id) {
    if(!storage.hasKey(storage.keyDepartments)){
        await api.getDepartments();
    }
    if(!storage.hasKey(storage.keyCourses)){
        await api.getCourses();
    }
    const department = await getDepartmentFromID(department_id);
    let sub = [];
    if(department != undefined && department.courses != undefined){
        department.courses.forEach(async (course) => {
            let _course = await getCourseFromID(course.course_id);
            if(_course != undefined){
                _course.term_id = course.term_id
                sub.push(_course);
            }
        });
    }
    return sub;
}

async function getCourseFromID(course_id){
    if(!storage.hasKey(storage.keyCourses)){
        await api.getCourses();
    }
    const dictionary = storage.getKey(storage.keyCourses)
    for(var i in dictionary){
        if(dictionary[i].id == course_id){
            return dictionary[i];
        }
    }
    return undefined;
}
async function getCourseExamInfos(course_id) {
    if(!storage.hasKey(storage.keyExamInfos)){
        await api.getExamInfos();
    }
    const allExamInfos = storage.getKey(storage.keyExamInfos);
    let sub = [];
    allExamInfos.forEach(exam_info => {
        if(exam_info.course_id == course_id){
            sub.push(exam_info);
        }
    });
    return sub;
}

export {
    getProgrammeFromID,
    getDepartmentFromID,
    getCourseFromID,
    getProgrammeDepartments,
    getDepartmentCourses,
    getCourseExamInfos
};