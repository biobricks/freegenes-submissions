
Under-development app for accepting FreeGenes submissions. Back-end is Flask (Python) in order to interface with FreeGenes codebase. Front-end is React.

This app is probably not very relevant to anyone outside of the BioBricks Foundation except as users.

```
pip3 install -r requirements.txt

```

If you get a bunch of errors that include the message `your setuptools is too old` then you can try `sudo pip3 install -U setuptools`.

```
cp config.py.example config.py # edit this to use a different database
npm install
npm run build
ln -s build/static
./server.py
firefox http://localhost:5000/
```

Every time you change the front-end (the code in `src/`) you must run:

```
npm run build
```