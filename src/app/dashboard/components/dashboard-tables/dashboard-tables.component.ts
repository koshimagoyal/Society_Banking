import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'sb-dashboard-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-tables.component.html',
    styleUrls: ['dashboard-tables.component.scss'],
})
export class DashboardTablesComponent implements OnInit {
    p: any;
    constructor() {}
    ngOnInit(): void {}
}
