import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardModule } from '~/app/core/components/dashboard/dashboard.module';
import { WidgetDatatableComponent } from '~/app/core/components/dashboard/widgets/widget-datatable/widget-datatable.component';

describe('WidgetDatatableComponent', () => {
  let component: WidgetDatatableComponent;
  let fixture: ComponentFixture<WidgetDatatableComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DashboardModule, HttpClientTestingModule, TranslateModule.forRoot()]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetDatatableComponent);
    component = fixture.componentInstance;
    component.config = {
      id: '288d9453-72f0-4aca-9d8f-e4582b6b07b4',
      type: 'datatable',
      title: 'xyz'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
