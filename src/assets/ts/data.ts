import { reactive } from "vue";
import { nanoid } from "nanoid";

export default function HTNData() {
    interface FormProps {
        sys: number
        dia: number
        pulse: number
        note: string
        status: string
        isEdit: boolean
        editInfo:() => void
        updateInfo:() => void
    }
    class Form implements FormProps{
        sys: number
        dia: number
        pulse: number
        note: string
        status: string
        isEdit: boolean
    
        constructor(sys: number,dia: number,pulse: number,note: string, status: string, isEdit: boolean) {
            this.sys = sys
            this.dia = dia
            this.pulse = pulse
            this.note = note
            this.status = status
            this.isEdit = isEdit
        }
    
        editInfo() {
            this.isEdit = true;
        }
        updateInfo() {
            this.isEdit = false;
        }
    }

    const test = Array.from({length: 31}, (_, i) => {
        return {
            id: nanoid(),
            day: i + 1,
            morning: reactive(new Form(0, 0, 0, '', '', false)),
            night: reactive(new Form(0, 0, 0, '', '', false)),
        }
    })

    return test
}
    

