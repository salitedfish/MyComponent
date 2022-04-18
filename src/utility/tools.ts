/**
 * 数组去重
 * @param array 
 * @returns 
 */
export const toRemoveDuplication = (array: any[]) => {
    return Array.from(new Set(array))
}

/**
 * 数组扁平化处理
 * @param array 
 * @returns 
 */
export const toOneDimensional = (array: any[]) => {
    const resArray = []
    const handler = (array: any[]) => {
        for(let item of array) {
            if(Array.isArray(item)) {
                handler(item)
            } else {
                resArray.push(item)
            }
        }
    }
    handler(array)
    return resArray
}

/**
 * 随便写的Ref和ref的实现
 */
class RefGen<T> {
    data: T
    readonly _is_ref: true
    constructor(data: T){
        this.data = data
        this._is_ref = true
    }

    get value(){
        // todo: track
        return this.data
    }

    set value(data: T){
        // todo: trigger
        this.data = data
    }
}
interface Ref<T> {
    value: T
}
const isRef = (data: any | Ref<any>): boolean => {
    if(data._is_ref) {
        return true
    } else {
        return false
    }
}
function ref<T>(data: Ref<T>): Ref<T>
function ref<T>(data: T): Ref<T>
function ref<T>(data: T | Ref<T>): any{
    if(isRef(data)) {
        return data
    } else {
        return new RefGen(data)
    }
}

const a: Ref<number> = ref(1)
const b = ref<number>(a)

a.value = 3
b.value = 2

function coo(a: number): string
function coo(a: string): number
function coo(a: number | string): number | string{
    if(typeof a == 'string') {
        return Number(a)
    }
}
const cpp = coo(09)
