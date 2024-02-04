const questionEditRoot = document.getElementById('questionEditRoot')
addTopSection();
addEditSections();

var questionToolbar = [
    ['bold', 'italic', 'underline', 'image', 'clean'],        // toggled buttons
    ['code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
];

var answerToolbar = [
    ['bold', 'italic', 'underline', 'image', 'clean'], 
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
];


var questionEditor = new Quill('#questionEditor', { modules: { toolbar: questionToolbar }, theme: 'snow', });
var answerEditor1 = new Quill('#answerEditor1', { modules: { toolbar: answerToolbar }, theme: 'snow', });
var answerEditor2 = new Quill('#answerEditor2', { modules: { toolbar: answerToolbar }, theme: 'snow', });
var answerEditor3 = new Quill('#answerEditor3', { modules: { toolbar: answerToolbar }, theme: 'snow', });
var answerEditor4 = new Quill('#answerEditor4', { modules: { toolbar: answerToolbar }, theme: 'snow', });
var answerEditor5 = new Quill('#answerEditor5', { modules: { toolbar: answerToolbar }, theme: 'snow', });

function addTopSection(){
    const d1 = createElement('div', questionEditRoot, ['card', 'bg-warning', 'bg-gradient'])
    d1.innerHTML=`
    <h4 class="card-title text-dark text-center">Sinav Sorularini Guncelle</h5>
    <div class="row card-body" id="formExamInfoCardBody">
        <div class="col">
            <p id="oqcid">Ders Id: <b>--ders id--</b></p>
            <p id="oqccode">Ders Kodu: <b>--ders kodu--</b></p>
            <p id="oqc">Ders: <b>--ders--</b></p>
        </div>
        <div class="col">
            <p id="oqetype">Sinav Turu: <b>--sinav turu--</b></p>
            <p id="oqeyear">Sinav Yili: <b>--sinav yili--</b></p>
            <p id="oqeterm">Sinav Donemi: <b>--sinav donemi--</b></p>
            <p id="oqeduration">Sinav Suresi (s): <b>--sinav suresi (s)--</b></p>
        </div>
        <div class="col-8"></div>
    </div>`
}

function addEditSections(){
    const d1 = createElement('div', questionEditRoot, ['row'])
    addQuestionList(d1)
    addQuestionEdit(d1)
}

function addQuestionList(rowParent){
    const d1 = createElement('div', rowParent, ['col-2', 'text-center'])
    d1.innerHTML = `
    <div class="card">
        <div class="card-heading"><h3 class="card-title mt-2 p-0">Soru Listesi</h3>
        </div>
        <div class="card-body">
            <ul class="list-group" id="qLeftList"></ul>
            <button class="btn btn-success rounded-5 mt-3" id="qLeftListAdd"><i class="fa-solid fa-plus fa-beat fa-xl" style="color: #ffffff;"></i></button>
        </div>
    </div>`
}

function addQuestionEdit(rowParent){
    const d1 = createElement('div', rowParent, ['col'])
    d1.id = 'qEditParent'
    d1.style = 'display: none;'
    d1.innerHTML = `
    <div class="row"> 
        <div class="col text-center mt-1">
            <button class="btn btn-primary" type="button" id="qEditQSave">Soruyu Kaydet</button>
        </div>
        <div class="col-2 text-end mt-1">
            <button class="btn btn-danger" type="button" id="qEditQDelete">Soruyu Sil</button>
        </div>
    </div>
    <div class="row">
        <div class="col text-center" id="questionEdit">
            <h3 class="card-title">Soru</h3>
            <div id="questionEditor">
            </div>
        </div>
        <div class="col text-center" id="answerEdit">
            <h3>Cevaplar</h3>
            <div class="input-group mb-3 w-50">
                <span class="input-group-text">Dogru Cevap</span>
                <select class="form-select" id="correctAnswer">
                    <option value="1" selected>A</option>
                    <option value="2">B</option>
                    <option value="3">C</option>
                    <option value="4">D</option>
                    <option value="5">E</option>
                </select>
              </div>
            
            <h5 class="text-start">A)</h5>
            <div id="answerEditor1">
            </div>
            <h5 class="text-start">B)</h5>
            <div id="answerEditor2">
            </div>
            <h5 class="text-start">C)</h5>
            <div id="answerEditor3">
            </div>
            <h5 class="text-start">D)</h5>
            <div id="answerEditor4">
            </div>
            <h5 class="text-start">E)</h5>
            <div id="answerEditor5">
            </div>
        </div>
    </div>`
}


