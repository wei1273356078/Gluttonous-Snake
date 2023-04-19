type TOption = {
    maxLevel?: number,
    upScore?: number
}

const scorePanelOptions = {
    maxLevel: 10,
    upScore: 10
}

class ScorePanel{
    score = 0
    level = 1
    upScore: number  // 得分多少时，升级
    maxLevel: number  // 最大可升多少级

    scoreEl: HTMLElement
    levelEl: HTMLElement

    constructor(options: TOption = scorePanelOptions) {
        this.upScore = options.upScore || scorePanelOptions.upScore
        this.maxLevel = typeof options.maxLevel !== 'undefined' ? options.maxLevel : scorePanelOptions.maxLevel
        // if(typeof options.maxLevel !== 'undefined') {
        //     this.maxLevel = options.maxLevel
        // }else {
        //     this.maxLevel = scorePanelOptions.maxLevel
        // }

        this.scoreEl = document.getElementById('score')!
        this.levelEl = document.getElementById('level')!
    }

    // 得分
    addScore() {
        this.scoreEl.innerText = ++this.score + ''
        if(this.score % this.upScore === 0) {
            this.levelUp()
        }
    }

    // 等级增加
    levelUp() {
        if(this.level < this.maxLevel) {
            this.levelEl.innerText = ++this.level + ''
        }
    }

}

export { ScorePanel }