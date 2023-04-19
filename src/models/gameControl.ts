// 引入蛇
import { Snake } from './snake'
// 引入食物类
import { Food } from './food'
// 引入积分等级类
import { ScorePanel } from './scorePanel'

class GameControl{
    snake: Snake
    food: Food
    scorePanel: ScorePanel
    
    direction: String = 'Right'  // 移动方向
    oldDirection: String = 'Right'  // 移动方向
    isLive: Boolean = false   // 是否活着
    
    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
    }

    // 初始化游戏
    init() {
        if(this.isLive) return
        this.isLive = true
        // 监听键盘按键按下时的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run()
    }

    // 键盘按键事件
    keydownHandler(event: KeyboardEvent) {
        /** 这里有个问题this指向问题
         * 如果不使用bind进行对this指定的话，这里的this指向的是document
         * 因为，我想赋值的是GameControl类中的direction
         * 所以，需要对this进行指向处理
         */
        // 处理别的按键问题
        if(
            event.key !== 'ArrowUp' &&
            event.key !== 'Up' &&
            event.key !== 'ArrowDown' &&
            event.key !== 'Down' &&
            event.key !== 'ArrowLeft' &&
            event.key !== 'Left' &&
            event.key !== 'ArrowRight' &&
            event.key !== 'Right'
        ) {
            this.direction = this.oldDirection
            return
        }
        this.oldDirection = event.key
        this.direction = event.key
    }

    // 蛇动起来
    run() {
        let X = this.snake.X
        let Y = this.snake.Y

        /**
         * ArrowUp 上
         * ArrowRight 右
         * ArrowDown 下
         * ArrowLeft 左
         */
        switch(this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10
                break
            case 'ArrowDown':
            case 'Down':
                Y += 10
                break
            case 'ArrowLeft':
            case 'Left':
                X -= 10
                break
            case 'ArrowRight':
            case 'Right':
                X += 10
                break
        }

        // 吃食物
        this.checkEatFood(X, Y)

        /**
         * 捕获错误
         */
        try{
            // 更新蛇的位置
            this.snake.X = X
            this.snake.Y = Y
        }catch(err) {
            this.isLive = false
            // alert(err)
            alert('Game Over!')
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - ((this.scorePanel.level - 1) * 30))
    }

    checkEatFood(x:number, y:number) {
        if(x === this.food.X && y === this.food.Y) {
            // 蛇身体增加
            this.snake.addBody()
            // 食物位置更新
            this.food.setPosition()
            // 分数增加
            this.scorePanel.addScore()
        }
    }

    resetHandler() {
        this.isLive =false
        // todo应该处理snake元素里面的div只有一个，并且left和top为0
    }
}

export default GameControl