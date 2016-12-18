var mockery = require('mockery');

describe('schedule', function() {
  var mockNodeSchedule,
      spyOnScheduleJob;

  beforeEach(function() {
    spyOnScheduleJob = jasmine.createSpy('nodeSchedule.scheduleJob');

    mockNodeSchedule = {scheduleJob: spyOnScheduleJob};

    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false
    });

    mockery.registerMock('node-schedule', mockNodeSchedule);

    require('./index.js');
  });

  afterEach(function() {
    mockery.disable();

    mockery.deregisterAll();
  });

  it('should fire a cron job every day', function() {
    expect(spyOnScheduleJob)
      .toHaveBeenCalledWith('asdf');
  });
});
