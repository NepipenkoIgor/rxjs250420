import fs from 'fs';
import util from 'util';
import { bindNodeCallback, from } from "rxjs";
import {  map } from "rxjs/operators";
// const readFile$ = from(util.promisify(fs.readFile)(`${__dirname}/text`))
const readfile = bindNodeCallback(fs.readFile)
readfile(`${__dirname}/text`)
    .pipe(
        map((buffer) => {
            const str = buffer.toString();
            const regExp = />([^>]+)</;
            const matches = regExp.exec(str);
            return matches && matches[1]
        })
    )
    .subscribe((v) => {
        console.log(v);
    }, (_err)=>{}, ()=>{console.log('complete')})
