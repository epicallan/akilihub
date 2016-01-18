import twJob from './twJob';

// TODO put in a separate work thread

try {
  // initial run
  console.log('running job...');
  twJob();
  setInterval(() => {
    twJob();
  }, 60000 * 60);
} catch (e) {
  console.log(e);
}
