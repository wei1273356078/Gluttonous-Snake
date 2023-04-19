// 引入样式
import './less/reset.less'
// import './less/variable.less'
import './less/index.less'

// 引入游戏类
import GameControl from './models/gameControl'

let gameControl = new GameControl()
const startEl = document.getElementById('startBtn')!
const resetEl = document.getElementById('resetBtn')!

startEl.onclick = function() {
    gameControl.init()
}
resetEl.onclick = function() {
    // 先简单粗暴处理
    location.reload()
    // todo逻辑未处理
    // gameControl.resetHandler()
}
