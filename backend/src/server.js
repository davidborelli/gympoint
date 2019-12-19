import app from './app';

app.listen(3333);

/* Reason for not havig instantiated in the App class, is
  in automated tests we will need the separate server.
*/
