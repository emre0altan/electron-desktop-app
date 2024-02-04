import { setKey, getKey, clearKey, keyUserData, keyProgrammes, keyDepartments, keyCourses, keyExamInfos, keyQuestions } from './handler_storing.cjs'
import { keySessionKey, keySessionStartTime } from './handler_storing.cjs'

const httpAddress = "-"
const maxAttempts = 3;
const retryDelay = 1000;
const timeout = 3000;

async function get_call_wrapper(route, query, key, useCache){
    console.log("GET API CALL for " + key + ": ")
    if(getKey(key) == undefined || !useCache){
        const result = await postData(httpAddress + route, query, true);
        console.log("Fetched from cloud for " + key)
        if(result != undefined && !('error' in result)){
            setKey(key, result);
            return result;
        }else{
            setKey(key, []);
            return [];
        }
    }else{
        console.log("Cached for " + key);
        return getKey(key);
    }
}

async function getProgrammes(useCache=true){
    return await get_call_wrapper('/get_programmes', {}, keyProgrammes, useCache);
}

async function getDepartments(useCache=true){
    return await get_call_wrapper('/get_departments', {}, keyDepartments);
}

async function getCourses(useCache=true){
    return await get_call_wrapper('/get_courses', {}, keyCourses, useCache);
}

async function getExamInfos(useCache=true){
    return await get_call_wrapper('/get_exam_infos', {}, keyExamInfos, useCache);
}

async function getQuestions(exam_info_id, useCache=true){
    let a = await get_call_wrapper('/get_questions', {
        'exam_info_id': exam_info_id
    }, keyQuestions+exam_info_id, useCache);
    return a;
}

async function put_call_wrapper(route, query, key, useCache){
    console.log("PUT API CALL for " + key + ": ")
    const result = await postData(httpAddress + route, query, true);
    console.log(result);
    return result;
}

async function putProgramme(id, name, useCache=true){
    await put_call_wrapper('/put_programme', {
        'id': parseInt(id),
        'name': name,
    }, keyProgrammes, useCache);
    await getProgrammes(false);
}

async function putDepartment(id, programme_id, name, courses, useCache=true){
    await put_call_wrapper('/put_department', {
        'id': parseInt(id),
        'programme_id': parseInt(programme_id),
        'name': name,
        'courses': courses
    }, keyDepartments, useCache);
    await getDepartments(false);
}

async function putCourse(id, code, name, useCache=true){
    await put_call_wrapper('/put_course', {
        'id': parseInt(id),
        'code': code,
        'name': name,
    }, keyCourses, useCache);
    await getCourses(false);
}

async function putExamInfo(course_id, exam_type, exam_year, exam_term, exam_duration, useCache=true){
    await put_call_wrapper('/put_exam_info', {
        'course_id': parseInt(course_id),
        'exam_type': exam_type,
        'exam_year': exam_year,
        'exam_term': exam_term,
        'exam_duration': exam_duration
    }, keyExamInfos, useCache);
    await getExamInfos(false);
}

async function putQuestion(exam_info_id, question_index, question, question_type, image_data, answers, correct_answer, useCache=true){
    await put_call_wrapper('/put_question', {
        'exam_info_id': exam_info_id,
        'question_index': question_index,
        'question': question,
        'question_type': question_type,
        'image_data': image_data,
        'answers': answers,
        'correct_answer': correct_answer
    }, keyQuestions, useCache);
    await getQuestions(exam_info_id, false);
}

async function update_call_wrapper(route, query, key, useCache){
    console.log("UPDATE API CALL for " + key + ": ")
    const result = await postData(httpAddress + route, query, true);
    console.log(result);
    return result;
}

async function updateProgramme(id, name, useCache=true){
    await update_call_wrapper('/update_programme', {
        'id': parseInt(id),
        'name': name,
    }, keyProgrammes, useCache);
    await getProgrammes(false);
}

async function updateDepartment(id, programme_id, name, courses, useCache=true){
    await update_call_wrapper('/update_department', {
        'id': parseInt(id),
        'programme_id': parseInt(programme_id),
        'name': name,
        'courses': courses
    }, keyDepartments, useCache);
    await getDepartments(false);
}

async function updateCourse(id, code, name, useCache=true){
    await update_call_wrapper('/update_course', {
        'id': parseInt(id),
        'code': code,
        'name': name,
    }, keyCourses, useCache);
    await getCourses(false);
}

async function updateExamInfo(course_id, exam_type, exam_year, exam_term, exam_duration, useCache=true){
    await update_call_wrapper('/update_exam_info', {
        'course_id': course_id,
        'exam_type': exam_type,
        'exam_year': exam_year,
        'exam_term': exam_term,
        'exam_duration': exam_duration
    }, keyExamInfos, useCache);
    await getExamInfos(false);
}

async function updateQuestion(exam_info_id, question_index, question, question_type, image_data, answers, correct_answer, useCache=true){
    await update_call_wrapper('/update_question', {
        'exam_info_id': exam_info_id,
        'question_index': question_index,
        'question': question,
        'question_type': question_type,
        'image_data': image_data,
        'answers': answers,
        'correct_answer': correct_answer
    }, keyQuestions, useCache);
    await getQuestions(exam_info_id, false);
}

async function delete_call_wrapper(route, query, key, useCache){
    console.log("DELETE API CALL for " + key + ": ")
    const result = await postData(httpAddress + route, query, true);
    console.log(result);
    return result;
}

async function deleteProgramme(id, useCache=true){
    await delete_call_wrapper('/delete_programme', {
        'id': parseInt(id)
    }, keyProgrammes, useCache);
    await getProgrammes(false);
}

async function deleteDepartment(id, programme_id, useCache=true){
    await delete_call_wrapper('/delete_department', {
        'id': parseInt(id),
        'programme_id': parseInt(programme_id)
    }, keyDepartments, useCache);
    await getDepartments(false);
}

async function deleteCourse(id, useCache=true){
    await delete_call_wrapper('/delete_course', {
        'id': parseInt(id)
    }, keyCourses, useCache);
    await getCourses(false);
}

async function deleteExamInfo(course_id, exam_type, exam_year, exam_term, useCache=true){
    await delete_call_wrapper('/delete_exam_info', {
        'course_id': course_id,
        'exam_type': exam_type,
        'exam_year': exam_year,
        'exam_term': exam_term,
    }, keyExamInfos, useCache);
    await getExamInfos(false);
}

async function deleteQuestion(exam_info_id, question_index, useCache=true){
    await delete_call_wrapper('/delete_question', {
        'exam_info_id': exam_info_id,
        'question_index': question_index,
    }, keyQuestions, useCache);
    await getQuestions(exam_info_id, false);
}

async function get_session() {
    const user_data = getKey(keyUserData);
    if(user_data == undefined) return

    const user_id = user_data['id']
    let result = await getSessionKey()

    if('error' in result){
        const fname = user_data['_json']['name']
        const email = user_data['_json']['email']
        result = await putUser(user_id, fname, fname, email)
        result = await getSessionKey()
    }

    setKey(keySessionKey, result['session_key']);
    setKey(keySessionStartTime, new Date(result['start_time']));
}

async function getSessionKey() {
    return await postData(httpAddress + "/get_session",{
        
    }, false)
}

async function putUser(device_id, first_name, last_name, email) {
    return postData(httpAddress + "/put_user", {
        'device_id': device_id,
        'first_name': first_name,
        'last_name': last_name,
        'email': email
    }, false)
}

async function postData(url, body, put_session) {
    const user_data = getKey(keyUserData);
    if(user_data == undefined) return;
    body['user_id'] = user_data['id']

    if(put_session){
        if(getKey(keySessionKey) == undefined) await get_session()
        body['session_key'] = getKey(keySessionKey)
    }

    let attempt = 1;

    while (attempt <= maxAttempts) {
        try {
            console.log(`Attempt ${attempt}: Message sent - ${url}\n${JSON.stringify(body, null, 2)}`);
            const response = await fetchWithTimeout(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }, retryDelay);
            
            if(response != null){
                const data = await response.json();
                console.log(`Attempt ${attempt}: Received message - ${JSON.stringify(data, null, 2)}`);

                if ('session-error' in data) {
                    clearKey(keySessionKey);
                    return await postData(url, body, maxAttempts, retryDelay);
                }else{
                    return data;
                }
            }
        } catch (error) {
            console.error(`Attempt ${attempt}: Error posting data:`, error);

            if (attempt >= maxAttempts) {
                return null
            }

            console.log(`Attempt ${attempt}: Retrying after ${retryDelay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }

        attempt++;
        console.log("ATTEMPT: " + attempt)
    }
}

async function fetchWithTimeout(url, opts) {
    // Create the AbortController instance, get AbortSignal
    const abortController = new AbortController();
    const { signal } = abortController;
  
    // Make the fetch request
    const _fetchPromise = fetch(url, {
      ...opts,
      signal,
    });
  
    // Start the timer
    const timer = setTimeout(() => abortController.abort(), timeout);
  
    // Await the fetch with a catch in case it's aborted which signals an error
    try {
        const result = await _fetchPromise;
        clearTimeout(timer);
        return result;
    } catch (e) {
        clearTimeout(timer);
        console.log("Timeout error: " + e)
        return null
    }
};

export {
    getProgrammes,
    getDepartments,
    getCourses,
    getExamInfos,
    getQuestions,
    putProgramme,
    putDepartment,
    putCourse,
    putExamInfo,
    putQuestion,
    updateProgramme,
    updateDepartment,
    updateCourse,
    updateExamInfo,
    updateQuestion,
    deleteProgramme,
    deleteDepartment,
    deleteCourse,
    deleteExamInfo,
    deleteQuestion,
    get_session
};