'use client';
import { useState } from 'react';
import styles from './PressotherapyPage.module.css';
type Stage={number:string;title:string;text:string};
export function PressotherapyProcess({stages}:{stages:Stage[]}){const [active,setActive]=useState(0);return <div className={styles.interactiveProcess}><div className={styles.processControls} aria-label="Treatment stages">{stages.map((stage,i)=><button key={stage.title} type="button" aria-pressed={active===i} aria-controls="process-description" onClick={()=>setActive(i)}><span>{stage.number}</span>{stage.title}<b aria-hidden="true">{active===i?'−':'+'}</b></button>)}</div><div className={styles.processDescription} id="process-description" aria-live="polite" aria-atomic="true"><span className={styles.processNumber} aria-hidden="true">{stages[active].number}</span><h3>{stages[active].title}</h3><p>{stages[active].text}</p><small>Pressure and rhythm are selected around your comfort.</small></div></div>}
