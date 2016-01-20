/*eslint-disable*/
onmessage = function(event) {
  const url = `http://localhost:3000/api/social/twdata/${event.data}`;
  get(url).then((data) => {
    postMessage(data);
  }).catch((err) => {
    if (err) postMessage(err);
  });
};

function get(url) {
  return new Promise(function(resolve, reject) {
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.send();
    client.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(this.response));
      } else {
        reject(this.statusText);
      }
    };
    client.onerror = function() {
      reject(this.statusText);
    };
  });
}
