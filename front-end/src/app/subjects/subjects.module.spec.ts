import { SubjectsModule } from './subjects.module';

describe('SubjectsModule', () => {
  let subjectsModule: SubjectsModule;

  beforeEach(() => {
    subjectsModule = new SubjectsModule();
  });

  it('should create an instance', () => {
    expect(subjectsModule).toBeTruthy();
  });
});
