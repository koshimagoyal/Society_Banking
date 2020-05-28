import { ChangeDetectorRef, Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutDashboardComponent } from '@app/navigation/layouts';
import { NavigationService } from '@app/navigation/services';
import { NavigationServiceStub } from '@testing/stubs';

@Component({
    template: `
        <sb-layout-dashboard
            [someInput]="someInput"
            (someFunction)="someFunction($event)"
        ></sb-layout-dashboard>
    `,
})
class TestHostComponent {
    someInput = 1;
    someFunction(event: Event) {}
}

describe('LayoutDashboardComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: LayoutDashboardComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    let navigationService: NavigationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, LayoutDashboardComponent],
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
        expect(hostComponentNE.querySelector('sb-layout-dashboard')).toEqual(jasmine.anything());
    });
});
