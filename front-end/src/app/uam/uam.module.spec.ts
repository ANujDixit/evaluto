import { UamModule } from './uam.module';

describe('UamModule', () => {
  let uamModule: UamModule;

  beforeEach(() => {
    uamModule = new UamModule();
  });

  it('should create an instance', () => {
    expect(uamModule).toBeTruthy();
  });
});
