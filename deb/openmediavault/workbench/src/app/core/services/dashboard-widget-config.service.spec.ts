import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DashboardWidgetConfigService } from '~/app/core/services/dashboard-widget-config.service';

describe('DashboardWidgetConfigService', () => {
  let service: DashboardWidgetConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DashboardWidgetConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
