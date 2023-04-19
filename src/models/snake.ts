class Snake{
    snakeEl: HTMLElement
    headEl: HTMLElement
    bodiesEl: HTMLCollection
    constructor() {
        this.snakeEl = document.getElementById('snake')!
        // this.headEl = this.snakeEl.getElementsByTagName('div')[0]
        this.headEl = document.querySelector('#snake > div') as HTMLElement
        this.bodiesEl = this.snakeEl.getElementsByTagName('div')
    }

    get X() {
        return this.headEl.offsetLeft
    }
    set X(val) {
        if(this.X === val) return
        // 撞墙检查 0-290
        if(val < 0 || val > 290) {
            throw new Error('撞墙了')
        }
        // 有身体时，不允许反方向移动（蛇在向右走时，不能向左走，反之亦然）
        if(this.bodiesEl[1] && (this.bodiesEl[1] as HTMLElement).offsetLeft === val) {
            if(val > this.X) {
                val = this.X - 10
            }else {
                val = this.X + 10
            }
        }

        // 移动身体
        this.moveBody()
        this.headEl.style.left = val + 'px'
        // 检测碰撞身体
        this.checkHeadBody()
    }

    get Y() {
        return this.headEl.offsetTop
    }
    set Y(val) {
        if(this.Y === val) return
        // 撞墙检查 0-290
        if(val < 0 || val > 290) {
            throw new Error('撞墙了')
        }
        // 有身体时，不允许反方向移动（蛇在向右走时，不能向左走，反之亦然）
        if(this.bodiesEl[1] && (this.bodiesEl[1] as HTMLElement).offsetTop === val) {
            if(val > this.Y) {
                val = this.Y - 10
            }else {
                val = this.Y + 10
            }
        }
        
        // 移动身体
        this.moveBody()
        this.headEl.style.top = val + 'px'
        // 检测碰撞身体
        this.checkHeadBody()
    }

    // 增加身体
    addBody() {
        // 向snakeEl中添加一个div
        const divEl = document.createElement('div')
        this.snakeEl.insertAdjacentElement('beforeend', divEl)
    }

    // 移动身体
    moveBody() {
        /**
         * 身体要随着头进行变化
         * 要从后向前进行排位置
         *  - 身体的最后一节要移动到身体的倒数第二节位置（以此类推）
         */
        for(let i = this.bodiesEl.length - 1; i > 0; i--) {
            // 获取当前节前一个的位置
            const x = (this.bodiesEl[i - 1] as HTMLElement).offsetLeft;
            const y = (this.bodiesEl[i - 1] as HTMLElement).offsetTop;

            // 对当前节进行位置变化
            (this.bodiesEl[i] as HTMLElement).style.left = x + 'px';
            (this.bodiesEl[i] as HTMLElement).style.top = y + 'px';

        }
    }

    // 检测头撞身体
    checkHeadBody() {
        // 正常情况，头碰到身体，要从第五节才能碰到
        for(let i = 1; i < this.bodiesEl.length; i++) {
            const bodyEl = (this.bodiesEl[i] as HTMLElement);
            if(this.headEl.offsetLeft === bodyEl.offsetLeft && this.headEl.offsetTop === bodyEl.offsetTop) {
                throw new Error('碰撞到身体！')
            }
        }
    }
}

export { Snake }