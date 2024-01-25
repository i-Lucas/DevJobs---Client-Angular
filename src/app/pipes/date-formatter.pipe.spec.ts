import { FromMSToMonthYearPipe } from './date-formatter.pipe';

describe('FromMillisecondsToMonthYearPipe', () => {
  it('create an instance', () => {
    const pipe = new FromMSToMonthYearPipe();
    expect(pipe).toBeTruthy();
  });
});
