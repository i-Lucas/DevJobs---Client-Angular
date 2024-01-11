import { FromMillisecondsToMonthYearPipe } from './date-formatter.pipe';

describe('FromMillisecondsToMonthYearPipe', () => {
  it('create an instance', () => {
    const pipe = new FromMillisecondsToMonthYearPipe();
    expect(pipe).toBeTruthy();
  });
});
