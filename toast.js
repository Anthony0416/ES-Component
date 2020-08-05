window.toast = (msg, time, position) => {
  time = isNaN(time) ? 3000 : time
  let toastRange = document.createRange()
  toastRange.setStartAfter(document.body.lastChild)
  toastRange.setEndAfter(document.body.lastChild)
  let node = document.createElement('div')
  node.style.cssText = 'background-color: rgba(0,0,0,0.6); position: fixed; left: 50%; z-index: 1000; transform: translate(-50%, 0);padding: 10px 20px;color: #fff;border-radius: 6px; transition: all 0.5s ease; opacity: 0; max-width: 80%; word-wrap: break-word; text-align: center;font-size: 14px; line-height: 25px;font-family: arial;'
  console.log(position, isNaN(position))
  if (!position || position == 'bottom') {
    node.style.bottom = '15%'
  } else if (position == 'middle') {
    node.style.bottom = '45%'
  } else {
    node.style.bottom = '15%'
  }
  node.innerText = msg
  toastRange.insertNode(node)
  setTimeout(() => {
    node.style.opacity = '1'
    node.style.transform = 'translate(-50%, -30px)'
  }, 100)
  setTimeout(() => {
    toastRange.deleteContents()
  }, time)
}

window.modal = (obj) => {
  // obj = {
  //   title: '这里是标题',
  //   showMask: true,
  //   maskClose: false,
  //   quitText: '取消',
  //   quitCallback: function () {console.log('do something')},
  //   quitColor: '#999',
  //   showSure: true,
  //   sureText: '确认',
  //   sureColor: 'rgba(255, 0, 0, 0.8)',
  //   sureCallback: function () {console.log('do something')}
  // }
  typeof obj == 'object' ? obj : obj = {}
  let modalRange = document.createRange()
  modalRange.setStartAfter(document.body.lastChild)
  modalRange.setEndAfter(document.body.lastChild)
  let node = document.createElement('div')
  node.style.cssText = 'background-color: rgba(0,0,0,0); position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 1000; font-family: arial;font-size: 0;'
  let cont = document.createElement('div')
  cont.style.cssText = 'max-width: 80%;min-width: 270px; overflow: hidden; border-radius: 6px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #fff; box-shadow: 0 0 5px #aaa;'
  let title = document.createElement('p')
  title.style.cssText = 'text-align: center; padding: 20px 0; margin: 0; font-size: 16px; color: #5A5C6D;'
  title.innerText = obj.title ? obj.title : '请设置标题'
  let btnGroup = document.createElement('div')
  btnGroup.style.cssText = 'height: 45px;border-top: 1px solid #E3E3E6;'
  let quitBtn = document.createElement('span')
  quitBtn.style.cssText = 'display: inline-block;font-size: 14px;text-align: center;height: 45px;line-height: 45px;width: 100%; text-align: center;'
  quitBtn.innerText = obj.quitText !== undefined ? obj.quitText : '关闭'
  quitBtn.style.color = obj.quitColor !== undefined ? obj.quitColor : '#5A5C6D'
  quitBtn.addEventListener('click', () => {
    modalRange.deleteContents()
    obj.quitCallback !== undefined ? obj.quitCallback() : null
  })
  btnGroup.appendChild(quitBtn)
  if (obj.showSure !== undefined && obj.showSure == true) {
    quitBtn.style.width = '50%'
    let sureBtn = document.createElement('span')
    sureBtn.style.cssText = 'width: 50%; display: inline-block;box-sizing: border-box;height: 45px;line-height: 45px;text-align: center;font-size: 14px;vertical-align: top;border-left: 1px solid #E3E3E6;'
    sureBtn.innerText = obj.sureText !== undefined ? obj.sureText : '确认',
    sureBtn.style.color = obj.sureColor !== undefined ? obj.sureColor : '#0092DB'
    sureBtn.addEventListener('click', () => {
      modalRange.deleteContents()
      obj.sureCallback !== undefined ? obj.sureCallback() : null
    })
    btnGroup.appendChild(sureBtn)
  }
  cont.appendChild(title)
  cont.appendChild(btnGroup)
  node.appendChild(cont)
  if (obj.showMask !== undefined || obj.showMask == true) {
    node.style.backgroundColor = 'rgba(0,0,0,0.5)'
  }
  if (obj.maskClose !== undefined && obj.maskClose == true) {
    node.addEventListener('click', () => {modalRange.deleteContents()})
  }
  modalRange.insertNode(node)
}