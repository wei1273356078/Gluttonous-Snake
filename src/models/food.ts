class Food{
    // 食物所对应的元素
    element: HTMLElement

    constructor() {
        this.element = document.getElementById('food')!
    }

    // 获取食物的水平坐标
    get X() {
        return this.element.offsetLeft
    }

    // 获取食物的垂直坐标
    get Y() {
        return this.element.offsetTop
    }

    // 设置食物出现的位置
    setPosition() {
        // 定义的舞台是300*300
        /** 食物位置
         * 食物大小 10*10
         * 必须整十出现
         * 随机位置 0 - 290
         */
        // Math.random() * 29   不包含0和29
        const left = Math.round(Math.random() * 29) * 10
        const top = Math.round(Math.random() * 29) * 10

        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

export { Food }