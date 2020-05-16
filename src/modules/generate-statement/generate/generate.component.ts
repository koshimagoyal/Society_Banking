import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';



@Component({
    selector: 'sb-generate',
    templateUrl: './generate.component.html',
    styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent implements OnInit {
    text: any;
    table = false;
    constructor() {}
    showTable() {
        this.table = true;
    }
    focusoutHandler($event: any){
        this.text = $event.target.value;
    }
    download() {
        const content = document.getElementById('content');
        const doc = new jsPDF();
        const _elementHandlers = {
            '#editor'() {
                return true;
            },
        };
        // @ts-ignore
        doc.fromHTML(content.innerHTML, 15, 15, {
            width: 190,
            elementHandlers: _elementHandlers,
        });

        doc.save('test.pdf');
    }
    ngOnInit(): void {}
}
