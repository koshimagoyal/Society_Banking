import { ChangeDetectorRef, Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutEmpDashboardComponent } from '@app/navigation/layouts';
import { NavigationService } from '@app/navigation/services';
import { NavigationServiceStub } from '@testing/stubs';

@Component({
    template: `
        <sb-layout-emp-dashboard
            [someInput]="someInput"
            (someFunction)="someFunction($event)"
        ></sb-layout-emp-dashboard>
    `,
})
class TestHostComponent {
    someInput = 1;
    someFunction(event: Event) {}
}

describe('LayoutEmpDashboardComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: LayoutEmpDashboardComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    let navigationService: NavigationService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutEmpDashboardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, LayoutEmpDashboardComponent],
            imports: [NoopAnimationsModule],
            providers: [
                { provide: NavigationService, useValue: NavigationServiceStub },
                ChangeDetectorRef,
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        hostComponentDE = fixture.debugElement;
        hostComponentNE = hostComponentDE.nativeElement;

        componentDE = hostComponentDE.children[0];
        component = componentDE.componentInstance;
        componentNE = componentDE.nativeElement;

        navigationService = TestBed.inject(NavigationService);

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(hostComponentNE.querySelector('sb-layout-emp-dashboard')).toEqual(
            jasmine.anything()
        );
    });
});
