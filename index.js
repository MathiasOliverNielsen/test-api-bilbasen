import http from 'http';

http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hej verden!');
    console.log('Server responded with "Hej !"');
  })
  .listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
  });
