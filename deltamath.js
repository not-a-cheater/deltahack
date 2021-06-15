
chrome.storage.local.get(function(result){if (result.testmode != null) {
	localStorage["testmode"]=result.testmode
	console.log(result.testmode)
}
})
var myjs = "function getAssignment (teacher_id, sk) {\n  return fetch(\n    '/new3/scripts/get_problems_by_assignment.php',\n    {\n      method: 'POST',\n      body: JSON.stringify({\n        last_edit: (Date.now() / 1000) | 0,\n        teacher_id,\n        sk\n      }),\n      headers: {\n        Authorization: `Bearer ${window.localStorage.id_token}`\n      }\n    }\n  )\n    .then(r => r.json())\n}\nfunction getCurrentAssignment () {\n  const match = /\\/(\\d+)\\/(\\w+)/.exec(window.location.pathname)\n  if (!match) {\n    alert('not deltamath assignment')\n    return Promise.reject(new Error('Not a DeltaMath assignment'))\n  }\n  const [, teacher_id, sk] = match\n  return getAssignment(teacher_id, sk)\n}\nasync function main () {\n  const uniqueId = `happy-${Date.now()}-`\n  const {\n    history,    \n lines,\n    lines_encode,\n    _id,\n    inlineSolutionCode\n  } = await getCurrentAssignment()\n  const linesDecoded = lines_encode\n    ? JSON.parse(CryptoJS.AES.decrypt(\n      lines_encode,\n      _id + '',\n      { format: CryptoJSAesJson }\n    ).toString(CryptoJS.enc.Utf8))\n    : []\n  console.log(linesDecoded) \n  const solutions = [...lines, ...linesDecoded]\n  console.log(solutions)\n  console.log(lines_encode) \n  console.log(_id) \n  var yanuts = CryptoJS.AES.decrypt(\n    history,\n    _id + '', \n    { format: CryptoJSAesJson }\n    ).toString(CryptoJS.enc.Utf8) \n  console.log('ver 1 ' + yanuts)\n  if(typeof problem.givenOrder !== 'undefined') {\n     number = Number(yanuts) \n     console.log(problem.givenOrder.slice('-' + [number])[0]) \n  }\n yanuts = yanuts.substr(2).slice(0, -2); \n console.log(yanuts) \n if(yanuts.match(/^[0-9]+([.][0-9]+)?$/)) { \n    if(problem.ansType == 1) {\n        console.log('poop') \n        if (document.querySelector('#innerAnswerForm > answer-form-one > div > div > span.answer-block > span.mathquill-editable-outer.hasLeftOrRight.oneSolution') != null) {\n            document.querySelector('#innerAnswerForm > answer-form-one > div > div > span.answer-block > span.mathquill-editable-outer.hasLeftOrRight.oneSolution > span.mathquill-editable.mathquill-answer-form.needsclick.mq-editable-field.mq-math-mode').innerText = yanuts \n            document.querySelector('#innerAnswerForm > answer-form-one > div > div > span.nowrap > submit-button > button').click() \n            document.querySelector('body > modal-container > div > div > modal-content > div.modal-footer > button.btn.btn-primary').click() \n            function check() {  \n                if ($('#next-problem-student').attr('hidden')) { \n                    return setTimeout(check, 1000); \n            } \n                document.querySelector('#next-problem-student').click() \n        } \n            check()\n            var themode = localStorage['testmode']\n            if (themode == 'off') { \n                return;\n    }\n    } \n     } \n } else { \n    if(yanuts.includes('frac')) {\n        //document.querySelector('#innerAnswerForm > answer-form-one > div > div > span.answer-block > span.mathquill-editable-outer.oneSolution > span.mathquill-editable.mathquill-answer-form.needsclick.mq-editable-field.mq-math-mode').innerText = yanuts \n        //document.querySelector('#innerAnswerForm > answer-form-one > div > div > span.nowrap > submit-button > button').click() \n        //document.querySelector('body > modal-container > div > div > modal-content > div.modal-footer > button.btn.btn-primary').click() \n        //check() \n        } //return; } \n    if(yanuts.includes('\\/\')) { \n        let mynuts = yanuts.split('\\\/\') \n        let ballsya = mynuts[0].slice(0, -1) \n        let ballsya2 = ballsya.slice(0, -1) \n        let thenuts = String.raw`\\frac` + '{' + ballsya + '}{' + mynuts[1] + '}' \n        //document.querySelector('#innerAnswerForm > answer-form-one > div > div > span.answer-block > span.mathquill-editable-outer.oneSolution > span.mathquill-editable.mathquill-answer-form.needsclick.mq-editable-field.mq-math-mode').innerText = thenuts \n        //document.querySelector('#innerAnswerForm > answer-form-one > div > div > span.nowrap > submit-button > button').click() \n        //document.querySelector('body > modal-container > div > div > modal-content > div.modal-footer > button.btn.btn-primary').click() \n        //check() \n        //return; \n        console.log(thenuts) \n    } \n    console.log('pee')\n } \n const wrapper = document.createElement('div')\n  wrapper.className = 'display-problem problem-page paper-shadow'\n  wrapper.style = `\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    margin: 80px;\n    resize: both;\n  `\n  const removeBtn = document.createElement('button')\n  removeBtn.className = 'btn btn-default btn-sm'\n  const removeIcon = document.createElement('b')\n  removeIcon.className = 'glyphicon glyphicon-remove'\n  removeBtn.append(removeIcon, 'Close')\n  wrapper.appendChild(removeBtn)\n  removeBtn.addEventListener('click', () => {\n    wrapper.remove()\n  })\n  for (const { type, format, ...data } of solutions) {\n    const row = document.createElement('div')\n    row.className = 'row hasJax'\n    switch (type) {\n      case 'line': {\n        const span = document.createElement('div')\n        span.className = 'jax col-sm-9 col-xs-12'\n        katex.render(data.line + '', span, {\n          throwOnError: false,\n          displayMode: true\n        })\n        row.appendChild(span)\n        break\n      }\n      case 'html': {\n        const span = document.createElement('div')\n        span.className = 'problem-html col-xs-12'\n        span.style.textAlign = 'center'\n        span.innerHTML = data.html\n          // namespace IDs to avoid confusion with DeltaMath\n          .replace(/id=\"/g, '$&' + uniqueId)\n        renderMathInElement(span, getRenderMathSettings())\n        row.appendChild(span)\n        break\n      }\n      case 'eq': {\n        const left = document.createElement('div')\n        left.className = 'jax left-equation col-sm-4 col-xs-5'\n        katex.render(data.left + '=', left, {\n          throwOnError: false,\n          displayMode: true\n        })\n        row.appendChild(left)\n        const right = document.createElement('div')\n        right.className = 'jax right-equation col-sm-4 col-xs-5'\n        katex.render('\\\\,\\\\,' + data.right, right, {\n          throwOnError: false,\n          displayMode: true\n        })\n        row.appendChild(right)\n        break\n      }\n      default: {\n        console.warn('Interesting row type', type, data)\n      }\n    }\n    if (data.exp) {\n      const explanation = document.createElement('div')\n      explanation.className = 'col-sm-3 hidden-xs explanation'\n      explanation.textContent = data.exp\n      renderMathInElement(explanation, getRenderMathSettings())\n      row.appendChild(explanation)\n    }\n    //let space = 25\n    //const { space, size, ...other } = format\n    let format = {'sign':'','space':25} \n    let space = 25 \n    let size = 5 \n    console.log(JSON.stringify(format)) \n    if (space) row.style.marginTop = space + 'px'\n    if (size) row.style.fontSize = size\n    wrapper.appendChild(row)\n  }\n  document.body.appendChild(wrapper)\n  if (inlineSolutionCode) {\n    // eval >:(\n    eval(inlineSolutionCode\n      .replace(/new DeltaGraph\\(\"/g, '$&' + uniqueId))\n  }\n  for (const svg of wrapper.querySelectorAll('svg')) {\n    svg.style.width = '100vw'\n  }\n}\nmain()\n"
var scripttag = document.createElement("script");
scripttag.innerHTML = myjs
document.head.appendChild(scripttag)