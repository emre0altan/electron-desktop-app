const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    refresh: () => ipcRenderer.send('refresh'),

    onProgrammes: (callback) => ipcRenderer.on('on-programmes', (_event, value) => callback(value)),
    putProgramme: (params) => ipcRenderer.send('put-programme', params),
    updateProgramme: (params) => ipcRenderer.send('update-programme', params),
    deleteProgramme: (params) => ipcRenderer.send('delete-programme', params),

    onDepartments: (callback) => ipcRenderer.on('on-departments', (_event, value, programme) => callback(value, programme)),
    getDepartments: (params) => ipcRenderer.send('get-departments', params),
    putDepartment: (params) => ipcRenderer.send('put-department', params),
    updateDepartment: (params) => ipcRenderer.send('update-department', params),
    deleteDepartment: (params) => ipcRenderer.send('delete-department', params),

    addCourseToDepartment: (params) => ipcRenderer.send('add-course-to-department', params),
    deleteCourseFromDepartment: (params) => ipcRenderer.send('delete-course-from-department', params),

    onAllCourses: (callback) => ipcRenderer.on('on-all-courses', (_event, value) => callback(value)),
    onCourses: (callback) => ipcRenderer.on('on-courses', (_event, value, department) => callback(value, department)),
    getCourses: (params) => ipcRenderer.send('get-courses', params),
    putCourse: (params) => ipcRenderer.send('put-course', params),
    updateCourse: (params) => ipcRenderer.send('update-course', params),
    deleteCourse: (params) => ipcRenderer.send('delete-course', params),

    onExamInfos: (callback) => ipcRenderer.on('on-exam-infos', (_event, value, course) => callback(value, course)),
    getExamInfos: (params) => ipcRenderer.send('get-exam-infos', params),
    putExamInfo: (params) => ipcRenderer.send('put-exam-info', params),
    updateExamInfo: (params) => ipcRenderer.send('update-exam-info', params),
    deleteExamInfo: (params) => ipcRenderer.send('delete-exam-info', params),

    openUpdateQuestions: (params) => ipcRenderer.send('open-update-questions', params),
    onQuestions: (callback) => ipcRenderer.on('on-questions', (_event, exam_info_id, questions) => callback(exam_info_id, questions)),
    getQuestions: (params) => ipcRenderer.send('get-questions', params),
    putQuestion: (params) => ipcRenderer.send('put-question', params),
    updateQuestion: (params) => ipcRenderer.send('update-question', params),
    deleteQuestion: (params) => ipcRenderer.send('delete-question', params),
    
    onPreferences: (callback) => ipcRenderer.on('on-preferences', (_event, pref_items, list_indexes) => callback(
        pref_items, list_indexes
    )),

    
    onUpdateName: (callback) => ipcRenderer.on('update-name', (_event, value) => callback(value)),
    onUpdateSessionTime: (callback) => ipcRenderer.on('update_session-time', (_event, value) => callback(value)),
    consoleLog: (value) => ipcRenderer.send('console-log', value),

    onLoadingStarted: (callback) => ipcRenderer.on('loading-started', (_event) => callback()),
    onLoadingEnded: (callback) => ipcRenderer.on('loading-ended', (_event) => callback()),
    logout: () => ipcRenderer.send('logout'),
})