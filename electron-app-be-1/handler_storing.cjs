const Store = require('electron-store');

const store = new Store();

const keyListIndexes = [
    'keyProgListIndex',
    'keyDepaListIndex',
    'keyCourListIndex',
]

const keySelectedIndexes = [
    'selectedProgrammeId',
    'selectedDepartmentId',
    'selectedCourseId',
]

const keyUserData = 'userData';
const keySessionKey = 'sessionKey';
const keySessionStartTime = 'sessionStartTime';
const keyProgrammes = 'programmes';
const keyDepartments = 'departments';
const keyCourses = 'courses';
const keyExamInfos = 'exam_infos';
const keyQuestions = 'questions';

let preferences = {}

function hasKey(key){
    return store.has(key);
}

function getKey(key, def=undefined){
    if(key in preferences)
        return preferences[key];
    else if(store.has(key)){
        preferences[key] = store.get(key, undefined);
        return preferences[key];
    }
    return def;
}

function setKey(key, value){
    store.set('' + key, value);
    preferences[key] = value;
}

function clearKey(key){
    store.delete(key);
    delete preferences[key];
}

module.exports = {
    hasKey,
    getKey,
    setKey,
    clearKey,
    keyUserData,
    keySessionKey,
    keySessionStartTime,
    keyProgrammes,
    keyDepartments,
    keyCourses,
    keyExamInfos,
    keyQuestions,
    keyListIndexes,
    keySelectedIndexes,
};