import { useState } from "react"
import { saveJsonToFile } from "@/utils/savejsontofile"

import {ID_DIALOG_ADD_PROPERTY, CATEGORIES_FILENAME} from '../../consts'
import Button from "@/components/Button/Button"
import Dialog, {handlerOpenDialogModal } from "@/components/Dialog/Dialog"

import styles from './Categories.module.css'

function Categories() {
    const [newCategory, setNewCategory] = useState('')
    
    return (<div className="tab-content">
        <p>Нет данных.</p>
        
        <Button text="Добавить категорию" clickHandler={() => handlerOpenDialogModal(ID_DIALOG_ADD_PROPERTY)}/>
            
        <Dialog id={ID_DIALOG_ADD_PROPERTY}
            okHandler={() => saveJsonToFile({newCategory}, CATEGORIES_FILENAME/*todo clear Input  // new Date().toString()*/)}
            text={'Сохранить'}>
            <p>Название категории:</p>
            <input type="text" className={styles.input} value={newCategory} onChange={(ev) => setNewCategory(ev.target.value)}/>
        </Dialog>
    </div>)
}

export default Categories