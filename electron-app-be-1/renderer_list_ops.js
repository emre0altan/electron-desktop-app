function createListButton(textContent, clickEvent, is_it_add = false){
    const newBtn = document.createElement('button');
    newBtn.type = 'button';
    if(is_it_add){
        newBtn.classList.add('btn', 'btn-success');
    }else{
        newBtn.classList.add('btn', 'btn-secondary');
    }
    newBtn.textContent = textContent;
    newBtn.addEventListener('click', clickEvent)
    return newBtn;
}

function hideAllForms(){
    formProgramme.style.display = 'none';
    formProgrammeNew.style.display = 'none';
    formDepartment.style.display = 'none';
    formDepartmentNew.style.display = 'none';
    formCourse.style.display = 'none';
    formCourseNew.style.display = 'none';
    formExamInfo.style.display = 'none';
    formExamInfoNew.style.display = 'none';
}

function clearList(list, items, dots=true){
    list.innerHTML = '';
    if(dots && (items == undefined || items.length == 0)){
        const newElement = document.createElement('h6');
        newElement.classList.add('text-center');
        newElement.innerText = "..."
        list.appendChild(newElement);
    }
}

function addNewBtnToList(text, list, clickEvent, is_it_add = false){
    const newBtn = createListButton(text, clickEvent, is_it_add);
    list.appendChild(newBtn);
    return newBtn;
}

function programmeSelected(programme, list_index){
    remove_active(programmeList);
    hideAllForms();
    if(programme != undefined){
        programmeItem = programme;
        programmeList.childNodes.item(list_index).classList.add('active');
        formProgramme.style.display = 'block';
        formProgrammeProgrammeId.value = programme.id;
        formProgrammeProgramme.value = programme.name;
        departmentListTitle.innerText = programme.name;
    }else{
        departmentListTitle.innerText = "--Bolumler--";
    }
    departmentSelected(undefined, undefined);
}

function departmentSelected(department, list_index){
    remove_active(departmentList);
    if(department != undefined){
        departmentItem = department;
        hideAllForms();
        departmentList.childNodes.item(list_index).classList.add('active')
        formDepartment.style.display = 'block';
        formDepartmentDepartment.value = department.name;
        formDepartmentDepartment.courses = department.courses;
        formDepartmentDepartmentId.value = department.id;
        formDepartmentProgrammeId.value = department.programme_id;
        courseListTitle.innerText = department.name;
    }else{
        courseListTitle.innerText = "--Dersler--";
    }
    courseSelected(undefined, undefined);
}

function courseSelected(course, list_index){
    remove_active(courseList);
    if(course != undefined){
        courseItem = course;
        hideAllForms();
        courseList.getElementsByTagName('button').item(list_index).classList.add('active')
        formCourse.style.display = 'block';
        formCourseCourse.value = course.name
        formCourseCourseCode.value = course.code;
        formCourseCourseId.value = course.id;
        examInfoListTitle.innerText = course.name;
    }else{
        examInfoListTitle.innerText = "--Sinavlar--";
    }
    examInfoSelected(undefined, undefined, undefined);
}

function examInfoSelected(exam_info, course, list_index){
    remove_active(examInfoList);
    if(exam_info != undefined){
        examInfoItem = exam_info;
        hideAllForms();
        examInfoList.getElementsByTagName('button').item(list_index).classList.add('active')
        formExamInfo.style.display = 'block';
        formExamInfoCourse.value = course.name;
        formExamInfoCourseId.value = course.id;
        formExamInfoExamType.value = exam_info.exam_type;
        formExamInfoExamYear.value = exam_info.exam_year;
        formExamInfoExamTerm.value = exam_info.exam_term;
        formExamInfoExamDuration.value = exam_info.exam_duration;
    }
}

function newExamInfoSelected(course){
    if(course != undefined){
        hideAllForms();
        formExamInfoNew.style.display = 'block';
        formExamInfoNewCourse.innerText = course.name;
        formExamInfoNewCourseId.innerText = course.id;
        examInfoSelected(undefined, undefined, undefined);
    }
}
